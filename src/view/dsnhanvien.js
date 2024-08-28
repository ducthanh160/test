import "../css/dsnhanvien.css";

function DsNhanVien() {
    return (
        <>
            <div className="wrapper p-3">
                <div className="contact-form">
                    <div
                        className="row"
                        style={{ rowGap: "12px", columnGap: "0px" }}
                    >
                        <div className="col-md-6 col-lg-6 col-xl-4">
                            <div className="item d-flex">
                                <figure className="cover__avatar">
                                    <img
                                        src="https://smilemedia.vn/wp-content/uploads/2022/09/cach-chup-anh-the-dep-e1664379835782.jpg"
                                        alt="avatar"
                                        className="avatar"
                                    />
                                </figure>
                                <div className="info w-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h4 className="employee_name">
                                            Tên nhân viên
                                        </h4>
                                        <div className="icon-container">
                                            <i className="fa-solid fa-ellipsis-vertical"></i>

                                            <div className="dropdown-content">
                                                <div
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop"
                                                >
                                                    <i className="fa-solid fa-eye dropdown-content_icon"></i>
                                                    <span className="hover-text">
                                                        Thông tin
                                                    </span>
                                                </div>

                                                <div>
                                                    <i className="fa-solid fa-user-pen dropdown-content_icon"></i>
                                                    <span className="hover-text">
                                                        Sửa
                                                    </span>
                                                </div>

                                                <div>
                                                    <i className="fa-solid fa-trash-can dropdown-content_icon"></i>
                                                    <span className="hover-text">
                                                        Xóa
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="position">Chức vụ</p>
                                    <div className="desc">
                                        <i className="fa-solid fa-envelope icon"></i>
                                        <span className="email">Gmail</span>
                                    </div>
                                    <div className="desc">
                                        <i className="fa-solid fa-phone icon"></i>
                                        <span className="phone">Phone</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-6 col-xl-4">
                            <div className="item d-flex">
                                <figure className="cover__avatar">
                                    <img
                                        src="https://smilemedia.vn/wp-content/uploads/2022/09/cach-chup-anh-the-dep-e1664379835782.jpg"
                                        alt="avatar"
                                        className="avatar"
                                    />
                                </figure>
                                <div className="info w-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h4 className="employee_name">
                                            Tên nhân viên
                                        </h4>
                                        <div className="icon-container">
                                            <i className="fa-solid fa-ellipsis-vertical"></i>

                                            <div className="dropdown-content">
                                                <div
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop"
                                                >
                                                    <i className="fa-solid fa-eye dropdown-content_icon"></i>
                                                    <span className="hover-text">
                                                        Thông tin
                                                    </span>
                                                </div>

                                                <div>
                                                    <i className="fa-solid fa-user-pen dropdown-content_icon"></i>
                                                    <span className="hover-text">
                                                        Sửa
                                                    </span>
                                                </div>

                                                <div>
                                                    <i className="fa-solid fa-trash-can dropdown-content_icon"></i>
                                                    <span className="hover-text">
                                                        Xóa
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="position">Chức vụ</p>
                                    <div className="desc">
                                        <i className="fa-solid fa-envelope icon"></i>
                                        <span className="email">Gmail</span>
                                    </div>
                                    <div className="desc">
                                        <i className="fa-solid fa-phone icon"></i>
                                        <span className="phone">Phone</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-6 col-xl-4">
                            <div className="item d-flex">
                                <figure className="cover__avatar">
                                    <img
                                        src="https://smilemedia.vn/wp-content/uploads/2022/09/cach-chup-anh-the-dep-e1664379835782.jpg"
                                        alt="avatar"
                                        className="avatar"
                                    />
                                </figure>
                                <div className="info w-100">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h4 className="employee_name">
                                            Tên nhân viên
                                        </h4>
                                        <div className="icon-container">
                                            <i className="fa-solid fa-ellipsis-vertical"></i>

                                            <div className="dropdown-content">
                                                <div
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop"
                                                >
                                                    <i className="fa-solid fa-eye dropdown-content_icon"></i>
                                                    <span className="hover-text">
                                                        Thông tin
                                                    </span>
                                                </div>

                                                <div>
                                                    <i className="fa-solid fa-user-pen dropdown-content_icon"></i>
                                                    <span className="hover-text">
                                                        Sửa
                                                    </span>
                                                </div>

                                                <div>
                                                    <i className="fa-solid fa-trash-can dropdown-content_icon"></i>
                                                    <span className="hover-text">
                                                        Xóa
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="position">Chức vụ</p>
                                    <div className="desc">
                                        <i className="fa-solid fa-envelope icon"></i>
                                        <span className="email">Gmail</span>
                                    </div>
                                    <div className="desc">
                                        <i className="fa-solid fa-phone icon"></i>
                                        <span className="phone">Phone</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                Thông tin nhân viên
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>Mã nhân viên:</p>
                            <div
                                className="d-flex mt-3"
                                style={{ rowGap: "0px", columnGap: "30px" }}
                            >
                                <div className="">
                                    <img
                                        src="https://smilemedia.vn/wp-content/uploads/2022/09/cach-chup-anh-the-dep-e1664379835782.jpg"
                                        alt="avatar"
                                        className="staff-img"
                                    />
                                </div>

                                <div className="staff-info">
                                    <div className="staff-info_text">
                                        <p>Tên nhân viên: Le nguyen phi hong</p>
                                        <p>Giới tính:</p>
                                        <p>Ngày sinh:</p>
                                        <p>Nơi sinh:</p>
                                        <p>Tình trạng hôn nhân: Doc than</p>
                                        <p>Số CCCD:</p>
                                        <p>Ngày cấp:</p>
                                        <p>Nơi cấp:</p>
                                        <p>Nguyên quán:</p>
                                        <p>Quốc tịch:</p>
                                    </div>
                                    <div className="staff-info_text">
                                        <p>Dân tộc:</p>
                                        <p>Tôn giáo:</p>
                                        <p>Hộ khẩu:</p>
                                        <p>Tạm trú:</p>
                                        <p>Loại nhân viên:</p>
                                        <p>Trình độ:</p>
                                        <p>Chuyên môn:</p>
                                        <p>Bằng cấp:</p>
                                        <p>Phòng ban:</p>
                                        <p>Trạng thái:</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DsNhanVien;
