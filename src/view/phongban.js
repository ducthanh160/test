import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { showToast } from "../utils/toast";
import { getDateCurrent } from "../utils/utils.js";
import {
    fetchGetCode,
    createCategoryWithToast,
    getDataCode,
    updateCategory,
} from "../api/service";
import { fetchCategoryList } from "../api/service";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
function PhongBan() {
    const [rowData, setRowData] = useState([]);

    const [columnDefs] = useState([
        { headerName: "Mã phòng ban", field: "MAPB", flex: 1 },
        {
            headerName: "Tên phòng ban",
            field: "TENPB",
            editable: true,
            flex: 1,
        },
        {
            headerName: "Ghi chú",
            field: "MOTA",
            editable: true,
            flex: 1,
        },
        {
            headerName: "Người tạo",
            field: "NGUOITAO",
            flex: 1,
        },
        {
            headerName: "Ngày tạo",
            field: "NGAYTAO",
            flex: 1,
        },
        {
            headerName: "Người sửa",
            field: "NGUOISUA",
            flex: 1,
        },
        {
            headerName: "Ngày sửa",
            field: "NGAYSUA",
            flex: 1,
        },
        {
            headerName: "Tác vụ",
            field: "TACVU",
            flex: 1,
            cellRenderer: (params) => (
                <div>
                    <button
                        onClick={() => handleDelete(params.data)} // Gọi hàm xóa
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            // marginLeft: "10px",
                        }}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            ),
        },
    ]);

    const handleDelete = (rowData) => {
        console.log("Xóa hàng:", rowData);
        // Thực hiện hành động xóa
    };
    // Đối tượng chứa các văn bản tiếng Việt
    const localeText = {
        page: "Trang",
        more: "Thêm",
        to: "đến",
        of: "của",
        next: "Tiếp theo",
        last: "Cuối cùng",
        first: "Đầu tiên",
        previous: "Trước đó",
        loadingOoo: "Đang tải...",
        noRowsToShow: "Không có hàng để hiển thị",
    };
    const [categoryList, setCategoryList] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [code, setCode] = useState("");
    const [tenPhongBan, setTenPhongBan] = useState("");
    const [MoTa, setMoTa] = useState("");
    const [nguoiTao, setNguoiTao] = useState("aaa");
    const [ngayTao, setNgayTao] = useState(getDateCurrent()); // State cho ngày tạo

    // Hàm xử lý khi giá trị của ô bị thay đổi
    const handleCellValueChanged = async (params) => {
        // Gọi API cập nhật
        try {
            const resource = "PhongBan"; // Giả sử đây là resource
            const identifier = "CapNhatPB"; // Giả sử ID của hàng là identifier
            const updatedData = params.data; // Dữ liệu sau khi chỉnh sửa

            // Gọi hàm cập nhật API
            const result = await updateCategory(
                resource,
                identifier,
                updatedData
            );
            if (result.success) {
                showToast("success", result.data);
                loadCategoryList();
            } else {
                showToast("error", result.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu:", error);
        }
    };

    // Hàm gọi API và cập nhật state
    const loadCategoryList = async () => {
        try {
            const response = await fetchCategoryList("PhongBan", "DanhSachPB");
            setCategoryList(response); // Giả sử dữ liệu API trả về ở response.data
        } catch (error) {
            console.error("Lỗi khi lấy danh sách phòng ban:", error);
        }
    };

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
                MOTA: MoTa,
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
                handleAddClick(); // Cập nhật mã mới
                setTenPhongBan("");
                setMoTa("");
            } else {
                console.error("Thêm thất bại:", result.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi thêm dữ liệu:", error);
        }
    };

    // Hàm xử lý sự kiện khi thay đổi lựa chọn
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value); // Lưu giá trị được chọn vào state
        console.log(event.target.value);
    };
    // Gọi API khi component được mount
    useEffect(() => {
        loadCategoryList(); // Chỉ gọi 1 lần khi component mount
    }, []); // [] đảm bảo chỉ chạy 1 lần khi component mount

    // Cập nhật rowData khi categoryList thay đổi
    useEffect(() => {
        if (categoryList && categoryList.length > 0) {
            const updatedRowData = categoryList.map((item) => ({
                MAPB: item.MAPB,
                TENPB: item.TENPB,
                MOTA: item.MOTA,
                NGUOITAO: item.NGUOITAO,
                NGAYTAO: item.NGAYTAO,
                NGUOISUA: item.NGUOISUA,
                NGAYSUA: item.NGAYSUA,
            }));
            setRowData(updatedRowData); // Cập nhật dữ liệu vào state rowData
        }
    }, [categoryList]); // Chỉ khi categoryList thay đổi mới cập nhật rowData
    return (
        <>
            <div className="pb-2 d-flex align-items-center justify-content-between">
                <label htmlFor="PHONGBAN" className="fw-bold text-dark">
                    Phòng ban
                </label>
                <div className="d-flex gap-2">
                    {/* <i
                        className="fa-solid fa-plus text-success"
                        data-bs-toggle="modal"
                        data-bs-target="#PhongBanModal"
                        onClick={() => {
                            handleAddClick();
                        }}
                    ></i> */}
                    <i
                        className="fa-solid fa-pen text-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#SuaPhongBanModal"
                    ></i>
                </div>
            </div>
            <select
                id="PHONGBAN"
                className="form-select"
                aria-label="Default select example"
                defaultValue=""
            >
                <option value="" disabled>
                    --- Chọn phòng ban ---
                </option>
                {categoryList.map((pb) => (
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
                                        htmlFor="MOTA"
                                    >
                                        Mô tả
                                    </label>
                                    <textarea
                                        id="MOTA"
                                        className="form-control"
                                        value={MoTa}
                                        onChange={(e) =>
                                            setMoTa(e.target.value)
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
                                    onClick={handleAddValue}
                                >
                                    <i
                                        className="fas fa-plus"
                                        style={{ paddingRight: "5px" }}
                                    ></i>
                                    Thêm mới
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
                            <i
                                style={{ paddingRight: "5px" }}
                                className="fa-solid fa-plus text-success"
                                data-bs-toggle="modal"
                                data-bs-target="#PhongBanModal"
                                onClick={() => {
                                    handleAddClick();
                                }}
                                title="Thêm mới"
                            ></i>
                            <h1
                                className="modal-title fs-5"
                                id="staticBackdropLabel"
                            >
                                Phòng ban
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div
                            className="modal-body ag-theme-alpine"
                            style={{ height: 400, width: "100%" }}
                        >
                            <AgGridReact
                                rowData={rowData}
                                columnDefs={columnDefs}
                                pagination={true}
                                paginationPageSize={6}
                                // paginationPageSizeSelector={[5, 10]}
                                localeText={localeText}
                                rowSelection="none"
                                onCellValueChanged={handleCellValueChanged}
                            />
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PhongBan;
