function BangCap() {
    return (
        <>
            <div className="pb-2 d-flex align-items-center justify-content-between">
                <label htmlFor="BANGCAP" className="fw-bold text-dark">
                    Bằng cấp
                </label>
                <div className="d-flex gap-2">
                    <i
                        className="fa-solid fa-plus text-success"
                        data-bs-toggle="modal"
                        data-bs-target="#BangCapModal"
                    ></i>
                    <i
                        className="fa-solid fa-pen text-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#BangCapModal"
                    ></i>
                </div>
            </div>
            <select
                id="BANGCAP"
                className="form-select"
                aria-label="Default select example"
                // value={selectedPhongBan}
                defaultValue=""
            >
                <option value="" disabled>
                    --- Chọn bằng cấp ---
                </option>
                <option value="1">Two</option>
            </select>
            <div
                className="modal fade"
                id="BangCapModal"
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
                                Thêm bằng cấp{/* {modalTitle} */}
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
                                        htmlFor="MABC"
                                        className="fw-bold text-dark pb-2"
                                    >
                                        Mã bằng cấp
                                    </label>
                                    <input
                                        id="MABC"
                                        // ref={inputRefs.inputCodeRef}
                                        className="form-control"
                                        placeholder="Mã phòng ban"
                                        // value={code} // Gán giá trị từ state
                                        // onChange={(e) =>
                                        //     setCode(e.target.value)
                                        // } // Cập nhật state khi giá trị input thay đổi
                                        disabled
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label
                                        htmlFor="TENBC"
                                        className="fw-bold text-dark pb-2"
                                    >
                                        Tên bằng cấp
                                    </label>
                                    <input
                                        id="TENBC"
                                        //ref={inputRefs.inputNameRef}
                                        className="form-control"
                                        placeholder="Nhập tên bằng cấp"
                                        // value={nameInput}
                                        // onChange={(e) =>
                                        //     setNameInput(e.target.value)
                                        // }
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
                                        //ref={inputRefs.inputNguoiTaoRef}
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
                                        //ref={inputRefs.inputNgayTaoRef}
                                        //value={getDateCurrent()}
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
                                >
                                    <i
                                        className="fas fa-plus"
                                        style={{ paddingRight: "5px" }}
                                    ></i>
                                    {/* {isEditing ? "Cập nhật" : "Thêm mới"} */}
                                </button>
                                {/* <ToastContainer /> */}
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
        </>
    );
}

export default BangCap;
