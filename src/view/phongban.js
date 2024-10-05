import React, { useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import useFetchData from "../hooks/useFetchData.js";
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
    updateCategoryWithToast,
} from "../api/service";
import DataTable from "react-data-table-component";
const columns = [
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Year", selector: (row) => row.year, sortable: true },
];

const data = [
    { id: 1, title: "Conan the Barbarian", year: "1982" },
    { id: 2, title: "Die Hard", year: "1988" },
    { id: 3, title: "Die Hard", year: "1988" },
    { id: 4, title: "Die Hard", year: "1988" },
    { id: 5, title: "Die Hard", year: "1988" },
    { id: 6, title: "Die Hard", year: "1988" },
    { id: 7, title: "Die Hard", year: "1988" },
    { id: 8, title: "Die Hard", year: "1988" },
    { id: 9, title: "Die Hard", year: "1988" },
    { id: 10, title: "Die Hard", year: "1988" },
    { id: 11, title: "Die Hard", year: "1988" },
    { id: 12, title: "Die Hard", year: "1988" },
];
function PhongBan() {
    // Tạo một state để lưu trữ giá trị được chọn
    const [selectedValue, setSelectedValue] = useState("");
    const [code, setCode] = useState("");
    const [tenPhongBan, setTenPhongBan] = useState("");
    const [ghiChu, setGhiChu] = useState("");
    const [nguoiTao, setNguoiTao] = useState("aaa");
    const [ngayTao, setNgayTao] = useState(getDateCurrent()); // State cho ngày tạo
    const [shouldRefetch, setShouldRefetch] = useState(false); // Trạng thái để quyết định khi nào cần tải lại dữ liệu
    const [selectedPhongBan, setSelectedPhongBan] = useState("");
    const [isEditing, setIsEditing] = useState(false); // Trạng thái để kiểm tra đang trong chế độ chỉnh sửa hay thêm mới
    const [modalTitle, setModalTitle] = useState(false); // Trạng thái để kiểm tra đang trong chế độ chỉnh sửa hay thêm mới

    // Sử dụng shouldRefetch trong useFetchData
    const { data: phongBanList } = useFetchData(
        "PhongBan",
        "DanhSachPB",
        shouldRefetch
    );

    const handleAddClick = async () => {
        try {
            let data;
            data = await fetchGetCode("PhongBan", "MaPB");
            if (data && data.code) {
                setCode(data.code);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu từ API:", error);
        }
    };

    // hàm thêm
    const handleAddValue = async () => {
        try {
            // Tạo đối tượng dữ liệu từ các state
            const modifiedData = {
                MAPB: code,
                TENPB: tenPhongBan,
                MOTA: ghiChu,
                NGUOITAO: nguoiTao,
                NGAYTAO: ngayTao,
                NGUOISUA: null,
                NGAYSUA: null,
            };
            //Gọi hàm thêm mới
            let result;
            result = await createCategoryWithToast(
                "PhongBan",
                "TaoPB",
                modifiedData
            );
            // Kiểm tra kết quả và thông báo cho người dùng
            if (result.success) {
                setShouldRefetch((prev) => !prev);
                handleAddClick(); // Cập nhật mã mới
                setTenPhongBan("");
                setGhiChu("");
            } else {
                console.error("Thêm thất bại:", result.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi thêm dữ liệu:", error);
        }
    };

    // Hàm gọi API để lấy dữ liệu dựa vào mã
    const fetchDataByCode = async (category, selectedCode) => {
        try {
            const resource = category;
            const param = `MAPB=${selectedCode}`; // Tham số query với mã đã chọn
            const val = {}; // Dữ liệu bổ sung (nếu cần)

            // Gọi API để lấy dữ liệu theo mã
            const data = await getDataCode(category, resource, param, val);
            console.log("Dữ liệu nhận được từ API:", data);

            if (data && data.length > 0) {
                const item = data[0];
                setCode(item.MAPB || "");
                setTenPhongBan(item.TENPB || "");
                setNguoiTao(item.NGUOITAO || "");
                setNgayTao(item.NGAYTAO || "");
            } else {
                console.warn("Không có dữ liệu để cập nhật.");
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    // Hàm xử lý sự kiện khi thay đổi lựa chọn
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value); // Lưu giá trị được chọn vào state
        console.log(event.target.value);
    };
    return (
        <>
            <div className="pb-2 d-flex align-items-center justify-content-between">
                <label htmlFor="PHONGBAN" className="fw-bold text-dark">
                    Phòng ban
                </label>
                <div className="d-flex gap-2">
                    <i
                        className="fa-solid fa-plus text-success"
                        data-bs-toggle="modal"
                        data-bs-target="#PhongBanModal"
                        onClick={() => {
                            handleAddClick();
                        }}
                    ></i>
                    <i
                        className="fa-solid fa-pen text-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#SuaPhongBanModal"
                        onClick={() => {
                            const selectedCode = selectedPhongBan; // Mã được chọn hiện tại
                            fetchDataByCode("PhongBan", selectedCode); // Gọi hàm fetchDataByCode với mã được chọn
                        }}
                    ></i>
                </div>
            </div>
            <select
                id="PHONGBAN"
                className="form-select"
                aria-label="Default select example"
                // defaultValue=""
                value={selectedValue} // Gán giá trị từ state
                onChange={(e) => {
                    const selectedCode = e.target.value; // Lấy mã được chọn
                    setSelectedPhongBan(selectedCode); // Cập nhật state cho mã phòng ban
                    fetchDataByCode("PhongBan", selectedCode, "edit"); // Gọi hàm fetchDataByCode với mã được chọn
                }}
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

            {/* Thêm phòng ban */}
            <div
                className="modal fade"
                id="PhongBanModal"
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
                                Thêm phòng ban
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
                                <div className="form-group col-md-6">
                                    <label
                                        htmlFor="MAPB"
                                        className="fw-bold text-dark pb-2"
                                    >
                                        Mã phòng ban
                                    </label>
                                    <input
                                        id="MAPB"
                                        className="form-control"
                                        placeholder="Mã phòng ban"
                                        value={code} // Gán giá trị từ state
                                        onChange={(e) =>
                                            setCode(e.target.value)
                                        } // Cập nhật state khi giá trị input thay đổi
                                        disabled
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label
                                        htmlFor="TENPB"
                                        className="fw-bold text-dark pb-2"
                                    >
                                        Tên phòng ban
                                    </label>
                                    <input
                                        id="TENPB"
                                        className="form-control"
                                        placeholder="Nhập tên phòng ban"
                                        value={tenPhongBan}
                                        onChange={(e) =>
                                            setTenPhongBan(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mt-3 form-group col-md-12">
                                    <label
                                        className="fw-bold text-dark pb-2"
                                        htmlFor="GHICHU"
                                    >
                                        Ghi chú
                                    </label>
                                    <textarea
                                        id="GHICHU"
                                        className="form-control"
                                        value={ghiChu}
                                        onChange={(e) =>
                                            setGhiChu(e.target.value)
                                        }
                                    ></textarea>
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
                                        value={nguoiTao}
                                        onChange={(e) =>
                                            setNguoiTao(e.target.value)
                                        }
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
                                        value={ngayTao}
                                        onChange={(e) =>
                                            setNgayTao(e.target.value)
                                        }
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer justify-content-start justify-content-between">
                            <div className="">
                                <button
                                    className="btn btn-success"
                                    // onClick={handleSubmit}
                                    onClick={handleAddValue}
                                >
                                    <i
                                        className="fas fa-plus"
                                        style={{ paddingRight: "5px" }}
                                    ></i>
                                    {/* {isEditing ? "Cập nhật" : "Thêm mới"} */}
                                </button>
                                <ToastContainer />
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

            <div
                className="modal fade"
                id="SuaPhongBanModal"
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
                                Sửa phòng ban
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <DataTable
                                columns={columns}
                                data={data}
                                pagination
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PhongBan;
