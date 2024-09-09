import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "react-toastify/dist/ReactToastify.css";
import useMyComponentState from "../hooks/useMyComponentState.js";
import {
    handleGetInputValue,
    getDateCurrent,
    config,
    transformPhongBanData,
    transformChucVuData,
} from "../utils/utils.js";
import {
    fetchGetCode,
    createCategoryWithToast,
    getDataCode,
} from "../api/service";
import useFetchData from "../hooks/useFetchData";

function ThemNV() {
    const [shouldRefetch, setShouldRefetch] = useState(false); // Trạng thái để quyết định khi nào cần tải lại dữ liệu
    const [selectedPhongBan, setSelectedPhongBan] = useState("");
    const [selectedChucVu, setSelectedChucVu] = useState("");

    const [nguoiTao, setNguoiTao] = useState(""); // State cho người tạo (giá trị giả sử)
    const [ngayTao, setNgayTao] = useState(getDateCurrent()); // State cho ngày tạo

    // Sử dụng shouldRefetch trong useFetchData
    const { data: phongBanList } = useFetchData(
        "PhongBan",
        "DanhSachPB",
        shouldRefetch
    );
    const { data: chucVuList } = useFetchData(
        "ChucVu",
        "DanhSachCV",
        shouldRefetch
    );
    const {
        type,
        setType,
        code,
        setCode,
        error,
        setError,
        inputRefs,
        editorData,
        handleEditorChange,
        codeId,
        setCodeId,
        nameId,
        setNameId,
        modalTitle,
        setModalTitle,
        labelTitle,
        setLabelTitle,
        placeholderCode,
        setPlaceholderCode,
        placeholderName,
        setPlaceholderName,
        name,
        setName,
        nameInput,
        setNameInput,
    } = useMyComponentState();

    const queryParams = {
        PhongBan: "MAPB",
        ChucVu: "MACV",
        TrinhDo: "MATD",
        ChuyenMon: "MACM",
    };

    // Hàm gọi API để lấy dữ liệu dựa vào mã
    const fetchDataByCode = async (category, selectedCode) => {
        try {
            // Lấy tham số query từ đối tượng ánh xạ
            const paramKey = queryParams[category];
            if (!paramKey) {
                throw new Error(`Danh mục không hợp lệ: ${category}`);
            }
            const type = category;
            const param = `${paramKey}=${selectedCode}`; // Tham số query với mã đã chọn
            const val = {}; // Dữ liệu bổ sung (nếu cần)

            const data = await getDataCode(category, type, param, val);

            console.log("Dữ liệu nhận được từ API:", data);

            if (data && data.length > 0) {
                const item = data[0];
                switch (category) {
                    case "PhongBan":
                        setCode(item.MAPB || "");
                        setNameInput(item.TENPB || "");
                        if (item.MOTA !== undefined) {
                            handleEditorChange(null, {
                                getData: () => item.MOTA,
                            }); // Cập nhật dữ liệu cho CKEditor
                        }
                        setNguoiTao(item.NGUOITAO || "");
                        setNgayTao(item.NGAYTAO || "");
                        break;
                    case "ChucVu":
                        setCode(item.code || "");
                        setNameInput(item.name || "");
                        if (item.description !== undefined) {
                            handleEditorChange(null, {
                                getData: () => item.description,
                            }); // Cập nhật dữ liệu cho CKEditor
                        }
                        break;
                    case "TrinhDo":
                        setCode(item.code || "");
                        setNameInput(item.name || "");
                        if (item.description !== undefined) {
                            handleEditorChange(null, {
                                getData: () => item.description,
                            }); // Cập nhật dữ liệu cho CKEditor
                        }
                        break;
                    case "ChuyenMon":
                        setCode(item.code || "");
                        setNameInput(item.name || "");
                        if (item.description !== undefined) {
                            handleEditorChange(null, {
                                getData: () => item.description,
                            }); // Cập nhật dữ liệu cho CKEditor
                        }
                        break;
                    default:
                        console.error("Danh mục không hợp lệ");
                }
            } else {
                console.warn("Không có dữ liệu để cập nhật.");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    // hàm lấy mã
    const handleAddClick = async (type) => {
        setType(type);

        // Lấy config dựa trên loại
        const configData = config[type] || {};
        setCodeId(configData.codeId || "");
        setNameId(configData.nameId || "");
        setModalTitle(configData.modalTitle || "");
        setLabelTitle(configData.labelTitle || "");
        setName(configData.name || "");
        setPlaceholderCode(configData.placeholderCode || "");
        setPlaceholderName(configData.placeholderName || "");

        try {
            let data;
            if (type === "phongban") {
                data = await fetchGetCode("PhongBan", "MaPB");
            } else if (type === "chucvu") {
                data = await fetchGetCode("ChucVu", "MaCV");
            }

            if (data && data.code) {
                setCode(data.code);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ API:", error);
            setError(error.message);
        }
    };

    // hàm thêm
    const handleGetValue = async () => {
        try {
            // Lấy dữ liệu từ các input và editor
            const newData = handleGetInputValue(inputRefs, editorData);

            // Kiểm tra xem loại dữ liệu đã được xác định chưa
            if (!type) {
                console.error("Loại dữ liệu không xác định.");
                return;
            }

            // Chỉnh sửa dữ liệu dựa trên loại
            let modifiedData;
            if (type === "phongban") {
                modifiedData = transformPhongBanData(newData);
            } else if (type === "chucvu") {
                modifiedData = transformChucVuData(newData);
            }

            // Gọi hàm thêm dữ liệu vào database dựa trên loại đã chọn
            let result;
            if (type === "phongban") {
                result = await createCategoryWithToast(
                    "PhongBan",
                    "TaoPB",
                    modifiedData
                );
            } else if (type === "chucvu") {
                result = await createCategoryWithToast(
                    "ChucVu",
                    "TaoCV",
                    modifiedData
                );
            }

            // Kiểm tra kết quả và thông báo cho người dùng
            if (result.success) {
                setShouldRefetch((prev) => !prev);
                // Cập nhật mã mới và làm trống tên và mô tả
                handleAddClick(type); // Cập nhật mã mới
                setNameInput(""); // Làm trống tên
                handleEditorChange(null, { getData: () => "" }); // Làm trống mô tả
            } else {
                console.error("Thêm thất bại:", result.message);
            }
        } catch (error) {
            console.error("Lỗi khi thêm dữ liệu:", error);
        }
    };

    const handleSelectChange = (label, setter) => (e) => {
        const selectedValue = e.target.value;
        setter(selectedValue); // Cập nhật state tương ứng
        fetchDataByCode(label, selectedValue); // Gọi hàm lấy dữ liệu dựa vào giá trị được chọn
    };
    return (
        <div className="wrapper p-3">
            <div className="contact-form ">
                <h3 className="fs-3">Thêm mới nhân viên</h3>
                <div className="row">
                    {/* MANV */}
                    <div className="form-group col-md-6 mt-3">
                        <label
                            htmlFor="MANV"
                            className="fw-bold text-dark pb-2"
                        >
                            Mã nhân viên
                        </label>
                        <input
                            id="MANV"
                            className="form-control"
                            placeholder="Mã nhân viên"
                        />
                    </div>

                    {/* anh */}
                    <div className="mt-3 form-group col-md-6">
                        <label
                            className="fw-bold text-dark pb-2"
                            htmlFor="image"
                        >
                            Ảnh 3x4 (nếu có):
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            placeholder="Chọn ảnh..."
                        />
                    </div>

                    <div className="form-group col-md-6 mt-3">
                        <label
                            htmlFor="TENNV"
                            className="fw-bold text-dark pb-2"
                        >
                            Tên nhân viên:
                        </label>
                        <input
                            id="TENNV"
                            className="form-control"
                            placeholder="Tên nhân viên"
                        />
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label
                            htmlFor="GIOITINH"
                            className="fw-bold text-dark pb-2"
                        >
                            Giới tính:
                        </label>
                        <select
                            id="GIOITINH"
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                --- Chọn giới tính ---
                            </option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                    {/* hon nhan */}
                    <div className="mt-3 form-group col-md-6">
                        <label
                            htmlFor="HONNHAN"
                            className="fw-bold text-dark pb-2"
                        >
                            Hôn nhân
                        </label>
                        <select
                            id="HONNHAN"
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                --- Tình trạng hôn nhân ---
                            </option>
                            <option value="">Độc thân</option>
                            <option value="">Đã kết hôn</option>
                        </select>
                    </div>

                    {/* Ngay sinh */}
                    <div className="form-group mt-3 col-md-6">
                        <label
                            className="fw-bold text-dark pb-2"
                            htmlFor="NGAYSINH"
                        >
                            Ngày sinh
                        </label>
                        <input
                            type="date"
                            id="NGAYSINH"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group col-md-6 mt-3">
                        <label
                            htmlFor="CCCD"
                            className="fw-bold text-dark pb-2"
                        >
                            Số CCCD
                        </label>
                        <input
                            id="CCCD"
                            className="form-control"
                            placeholder="Nhập căn cước công dân..."
                        />
                    </div>

                    <div className="form-group col-md-6 mt-3">
                        <label
                            htmlFor="DIENTHOAI"
                            className="fw-bold text-dark pb-2"
                        >
                            Số điện thoại
                        </label>
                        <input
                            id="DIENTHOAI"
                            className="form-control"
                            placeholder="Nhập số điện thoại..."
                        />
                    </div>

                    {/* Ngay cap */}
                    <div className="form-group mt-3 col-md-6">
                        <label
                            className="fw-bold text-dark pb-2"
                            htmlFor="NGAYCAP"
                        >
                            Ngày cấp
                        </label>
                        <input
                            type="date"
                            id="NGAYCAP"
                            className="form-control"
                        />
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label
                            className="fw-bold text-dark pb-2"
                            htmlFor="NOISINH"
                        >
                            Nơi sinh
                        </label>
                        <textarea
                            id="NOISINH"
                            className="form-control"
                        ></textarea>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label
                            className="fw-bold text-dark pb-2"
                            htmlFor="NOICAP"
                        >
                            Nơi cấp
                        </label>
                        <textarea
                            id="NOICAP"
                            className="form-control"
                        ></textarea>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label
                            className="fw-bold text-dark pb-2"
                            htmlFor="NGUYENQUAN"
                        >
                            Nguyên quán
                        </label>
                        <textarea
                            id="NGUYENQUAN"
                            className="form-control"
                        ></textarea>
                    </div>

                    {/* quoc tich */}
                    <div className="mt-3 form-group col-md-6">
                        <label
                            htmlFor="QUOCTICH"
                            className="fw-bold text-dark pb-2"
                        >
                            Quốc tịch
                        </label>
                        <select
                            id="QUOCTICH"
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="" disabled>
                                --- Chọn quốc tịch ---
                            </option>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label
                            className="fw-bold text-dark pb-2"
                            htmlFor="HOKHAU"
                        >
                            Hộ khẩu
                        </label>
                        <textarea
                            id="HOKHAU"
                            className="form-control"
                        ></textarea>
                    </div>
                    {/* ton giao */}
                    <div className="mt-3 form-group col-md-6">
                        <label
                            className="fw-bold text-dark pb-2"
                            htmlFor="TONGIAO"
                        >
                            Tôn giáo
                        </label>
                        <select
                            id="TONGIAO"
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                --- Chọn tôn giáo ---
                            </option>
                            <option value="Phật giáo">Phật giáo</option>
                            <option value="Thiên chúa giáo">
                                Thiên chúa giáo
                            </option>
                            <option value="Không">Không</option>
                        </select>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label
                            className="fw-bold text-dark pb-2"
                            htmlFor="TAMTRU"
                        >
                            Tạm trú:
                        </label>
                        <textarea
                            id="TAMTRU"
                            className="form-control"
                        ></textarea>
                    </div>

                    {/* phong ban */}
                    <div className="mt-3 form-group col-md-6">
                        <div className="pb-2 d-flex align-items-center justify-content-between">
                            <label
                                htmlFor="PHONGBAN"
                                className="fw-bold text-dark"
                            >
                                Phòng ban
                            </label>
                            <div className="d-flex gap-2">
                                <i
                                    className="fa-solid fa-plus text-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    onClick={() => {
                                        setSelectedPhongBan(""); // Đặt giá trị để tránh ảnh hưởng khi thêm
                                        handleAddClick("phongban");
                                    }}
                                ></i>
                                <i
                                    className="fa-solid fa-pen text-warning"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    onClick={() =>
                                        handleSelectChange(
                                            "PhongBan",
                                            setSelectedPhongBan
                                        )
                                    }
                                ></i>
                            </div>
                        </div>
                        <select
                            id="PHONGBAN"
                            className="form-select"
                            aria-label="Default select example"
                            value={selectedPhongBan}
                            onChange={handleSelectChange(
                                "PhongBan",
                                setSelectedPhongBan
                            )}
                        >
                            <option value="" disabled>
                                --- Chọn phòng ban ---
                            </option>
                            {phongBanList.map((pb) => (
                                <option key={pb.MAPB} value={pb.MAPB}>
                                    {pb.TENPB}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* dan toc */}
                    <div className="mt-3 form-group col-md-6">
                        <label
                            htmlFor="DANTOC"
                            className="fw-bold text-dark pb-2"
                        >
                            Dân tộc
                        </label>
                        <select
                            id="DANTOC"
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                --- Chọn dân tộc ---
                            </option>
                            <option value=""></option>
                        </select>
                    </div>

                    {/* chuc vu */}
                    <div className="mt-3 form-group col-md-6">
                        <div className="pb-2 d-flex align-items-center justify-content-between">
                            <label
                                htmlFor="CHUCVU"
                                className="fw-bold text-dark"
                            >
                                Chức vụ
                            </label>
                            <div className="d-flex gap-2">
                                <i
                                    className="fa-solid fa-plus text-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    onClick={() => handleAddClick("chucvu")}
                                ></i>
                                <i className="fa-solid fa-pen text-warning"></i>
                            </div>
                        </div>
                        <select
                            id="CHUCVU"
                            className="form-select"
                            aria-label="Default select example"
                            value={selectedChucVu}
                            onChange={handleSelectChange(
                                "ChucVu",
                                setSelectedChucVu
                            )}
                        >
                            <option value="" disabled>
                                --- Chọn chức vụ ---
                            </option>
                            {chucVuList.map((cv) => (
                                <option key={cv.MACV} value={cv.MACV}>
                                    {cv.TENCV}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* loai nv */}
                    <div className="mt-3 form-group col-md-6">
                        <div className="pb-2 d-flex align-items-center justify-content-between">
                            <label
                                htmlFor="LOAINV"
                                className="fw-bold text-dark"
                            >
                                Loại nhân viên
                            </label>
                            <div className="d-flex gap-2">
                                <i
                                    className="fa-solid fa-plus text-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    onClick={() => handleAddClick("loainv")}
                                ></i>
                                <i className="fa-solid fa-pen text-warning"></i>
                            </div>
                        </div>
                        <select
                            id="LOAINHANVIEN"
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                --- Chọn loại nhân viên ---
                            </option>
                            <option value=""></option>
                        </select>
                    </div>
                    {/* trinh do */}
                    <div className="mt-3 form-group col-md-6">
                        <div className="pb-2 d-flex align-items-center justify-content-between">
                            <label
                                htmlFor="TRINHDO"
                                className="fw-bold text-dark"
                            >
                                Trình độ
                            </label>
                            <div className="d-flex gap-2">
                                <i
                                    className="fa-solid fa-plus text-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    onClick={() => handleAddClick("trinhdo")}
                                ></i>
                                <i className="fa-solid fa-pen text-warning"></i>
                            </div>
                        </div>
                        <select
                            id="TRINHDO"
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                --- Chọn trình độ ---
                            </option>
                            <option value=""></option>
                        </select>
                    </div>
                    {/* bang cap */}
                    <div className="mt-3 form-group col-md-6">
                        <div className="pb-2 d-flex align-items-center justify-content-between">
                            <label
                                htmlFor="BANGCAP"
                                className="fw-bold text-dark"
                            >
                                Bằng cấp
                            </label>
                            <div className="d-flex gap-2">
                                <i
                                    className="fa-solid fa-plus text-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    onClick={() => handleAddClick("bangcap")}
                                ></i>
                                <i className="fa-solid fa-pen text-warning"></i>
                            </div>
                        </div>
                        <select
                            id="BANGCAP"
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                --- Chọn bằng cấp ---
                            </option>
                            <option value=""></option>
                        </select>
                    </div>
                    {/* chuyen mon */}
                    <div className="mt-3 form-group col-md-6">
                        <div className="pb-2 d-flex align-items-center justify-content-between">
                            <label
                                htmlFor="CHUYENMON"
                                className="fw-bold text-dark"
                            >
                                Chuyên môn
                            </label>
                            <div className="d-flex gap-2">
                                <i
                                    className="fa-solid fa-plus text-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    onClick={() => handleAddClick("chuyenmon")}
                                ></i>
                                <i className="fa-solid fa-pen text-warning"></i>
                            </div>
                        </div>
                        <select
                            id="CHUYENMON"
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                --- Chọn chuyên môn ---
                            </option>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label
                            htmlFor="TRANGTHAI"
                            className="fw-bold text-dark pb-2"
                        >
                            Trạng thái
                        </label>
                        <select
                            id="TRANGTHAI"
                            className="form-select"
                            aria-label="Default select example"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                --- Chọn trạng thái ---
                            </option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>

                <div className="mt-3 col-md-4">
                    <button className="btn btn-success">
                        <i
                            className="fas fa-plus"
                            style={{ paddingRight: "5px" }}
                        ></i>
                        Thêm mới nhân viên
                    </button>
                </div>

                <div
                    className="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="staticBackdropLabel"
                                >
                                    {modalTitle}
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    {/* Mã */}
                                    <div className="form-group col-md-6">
                                        <label
                                            htmlFor={codeId}
                                            className="fw-bold text-dark pb-2"
                                        >
                                            {labelTitle}
                                        </label>
                                        <input
                                            id={codeId}
                                            ref={inputRefs.inputCodeRef}
                                            className="form-control"
                                            placeholder={placeholderCode}
                                            value={code} // Gán giá trị từ state
                                            onChange={(e) =>
                                                setCode(e.target.value)
                                            } // Cập nhật state khi giá trị input thay đổi
                                            disabled
                                        />
                                    </div>
                                    {/* Tên */}
                                    <div className="form-group col-md-6">
                                        <label
                                            htmlFor={nameId}
                                            className="fw-bold text-dark pb-2"
                                        >
                                            {name}
                                        </label>
                                        <input
                                            id={nameId}
                                            ref={inputRefs.inputNameRef}
                                            className="form-control"
                                            placeholder={placeholderName}
                                            value={nameInput}
                                            onChange={(e) =>
                                                setNameInput(e.target.value)
                                            }
                                        />
                                    </div>

                                    {/* Mô tả */}
                                    <div className="form-group col-md-12 mt-3">
                                        <label
                                            htmlFor="MOTA"
                                            className="fw-bold text-dark pb-2"
                                        >
                                            Mô tả
                                        </label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={editorData}
                                            id="MOTA"
                                            onChange={(event, editor) =>
                                                handleEditorChange(
                                                    event,
                                                    editor
                                                )
                                            }
                                        />
                                    </div>

                                    {/* Người tạo */}
                                    <div className="mt-3 form-group col-md-6">
                                        <label
                                            className="fw-bold text-dark pb-2"
                                            htmlFor="NGUOITAO"
                                        >
                                            Người tạo:
                                        </label>
                                        <input
                                            className="form-control"
                                            id="NGUOITAO"
                                            ref={inputRefs.inputNguoiTaoRef}
                                            value="aaaa"
                                            disabled
                                        />
                                    </div>

                                    {/* Ngày tạo */}
                                    <div className="mt-3 form-group col-md-6">
                                        <label
                                            className="fw-bold text-dark pb-2"
                                            htmlFor="NGAYTAO"
                                        >
                                            Ngày tạo:
                                        </label>
                                        <input
                                            className="form-control"
                                            id="NGAYTAO"
                                            ref={inputRefs.inputNgayTaoRef}
                                            value={getDateCurrent()}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-start justify-content-between">
                                <div className="">
                                    <button
                                        className="btn btn-success"
                                        onClick={handleGetValue}
                                    >
                                        <i
                                            className="fas fa-plus"
                                            style={{ paddingRight: "5px" }}
                                        ></i>
                                        Thêm mới
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-dark"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThemNV;
