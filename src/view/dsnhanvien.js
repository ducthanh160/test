function DsNhanVien() {
    return (
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
                                                data-bs-target="#exampleModal"
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

                <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-xl">
                        <div className="contact-form">
                            <div className="modal-header d-flex justify-content-between align-items-center">
                                <h3 id="exampleModalLabel">
                                    Thông tin nhân viên
                                </h3>
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <h5>Mã nhân viên:</h5>
                                <div className="row">
                                    <div className="col col-lg-3">
                                        <img
                                            src="https://smilemedia.vn/wp-content/uploads/2022/09/cach-chup-anh-the-dep-e1664379835782.jpg"
                                            alt="avatar"
                                            className="staff-img"
                                        />
                                    </div>

                                    <div className="col col-xxl-9">
                                        <div className="row">
                                            <div className="col">
                                                <p>Ten nhan vien:</p>
                                                <p>Giới tính:</p>
                                                <p>Ten nhan vien:</p>
                                                <p>Ten nhan vien:</p>
                                                <p>Ten nhan vien:</p>
                                                <p>Ten nhan vien:</p>
                                                <p>Ten nhan vien:</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DsNhanVien;
