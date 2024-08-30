function ThemNV() {
    return (
        <div className="wrapper p-3">
            <div className="contact-form ">
                <h3 className="fs-3">Thêm mới nhân viên</h3>
                <div className="row">
                    <div className="form-group col-md-6 mt-3">
                        <label for="MANV" className="fw-bold text-dark pb-2">
                            Mã nhân viên
                        </label>
                        <input
                            id="MANV"
                            className="form-control"
                            placeholder="Mã nhân viên"
                        />
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label className="fw-bold text-dark pb-2" for="image">
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
                        <label for="TENNV" className="fw-bold text-dark pb-2">
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
                            for="GIOITINH"
                            className="fw-bold text-dark pb-2"
                        >
                            Giới tính:
                        </label>
                        <select
                            id="GIOITINH"
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="" disabled selected>
                                --- Chọn giới tính ---
                            </option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label for="HONNHAN" className="fw-bold text-dark pb-2">
                            Hôn nhân
                        </label>
                        <select
                            id="HONNHAN"
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="" disabled selected>
                                --- Chọn tình trạng hôn nhân ---
                            </option>
                            <option value="">Độc thân</option>
                            <option value="">Đã kết hôn</option>
                        </select>
                    </div>

                    {/* Ngay sinh */}
                    <div className="form-group mt-3 col-md-6">
                        <label class="fw-bold text-dark pb-2" for="NGAYSINH">
                            Ngày sinh <span class="text-danger">*</span>
                        </label>
                        <input
                            type="date"
                            id="NGAYSINH"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group col-md-6 mt-3">
                        <label for="CCCD" className="fw-bold text-dark pb-2">
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
                            for="DIENTHOAI"
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
                        <label className="fw-bold text-dark pb-2" for="NGAYCAP">
                            Ngày cấp <span class="text-danger">*</span>
                        </label>
                        <input
                            type="date"
                            id="NGAYCAP"
                            className="form-control"
                        />
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label className="fw-bold text-dark pb-2" for="NOISINH">
                            Nơi sinh
                        </label>
                        <textarea
                            id="NOISINH"
                            className="form-control"
                        ></textarea>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label className="fw-bold text-dark pb-2" for="NOICAP">
                            Nơi cấp
                        </label>
                        <textarea
                            id="NOICAP"
                            className="form-control"
                            formControlName="NOICAP"
                        ></textarea>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label
                            className="fw-bold text-dark pb-2"
                            for="NGUYENQUAN"
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
                            for="QUOCTICH"
                            className="fw-bold text-dark pb-2"
                        >
                            Quốc tịch
                        </label>
                        <select
                            id="QUOCTICH"
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="" disabled selected>
                                --- Chọn quốc tịch ---
                            </option>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label className="fw-bold text-dark pb-2" for="HOKHAU">
                            Hộ khẩu
                        </label>
                        <textarea
                            id="HOKHAU"
                            className="form-control"
                        ></textarea>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label className="fw-bold text-dark pb-2" for="TONGIAO">
                            Tôn giáo
                        </label>
                        <select
                            id="TONGIAO"
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="">--- Chọn tôn giáo ---</option>
                            <option value="Phật giáo">Phật giáo</option>
                            <option value="Thiên chúa giáo">
                                Thiên chúa giáo
                            </option>
                            <option value="Không">Không</option>
                        </select>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label className="fw-bold text-dark pb-2" for="TAMTRU">
                            Tạm trú:
                        </label>
                        <textarea
                            id="TAMTRU"
                            className="form-control"
                            formControlName="TAMTRU"
                        ></textarea>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label
                            for="PHONGBAN"
                            className="fw-bold text-dark pb-2"
                        >
                            Phòng ban
                        </label>
                        <select
                            id="PHONGBAN"
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="" disabled selected>
                                --- Chọn phòng ban ---
                            </option>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label for="DANTOC" className="fw-bold text-dark pb-2">
                            Dân tộc
                        </label>
                        <select
                            id="DANTOC"
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="" disabled selected>
                                --- Chọn dân tộc ---
                            </option>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label for="CHUCVU" className="fw-bold text-dark pb-2">
                            Chức vụ
                        </label>
                        <select
                            id="CHUCVU"
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="" disabled selected>
                                --- Chọn chức vụ ---
                            </option>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label
                            for="LOAINHANVIEN"
                            className="fw-bold text-dark pb-2"
                        >
                            Loại nhân viên
                        </label>
                        <select
                            id="LOAINHANVIEN"
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="" disabled selected>
                                --- Chọn loại nhân viên ---
                            </option>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label for="TRINHDO" className="fw-bold text-dark pb-2">
                            Trình độ
                        </label>
                        <select
                            id="TRINHDO"
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="" disabled selected>
                                --- Chọn trình độ ---
                            </option>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label for="BANGCAP" className="fw-bold text-dark pb-2">
                            Bằng cấp
                        </label>
                        <select
                            id="BANGCAP"
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="" disabled selected>
                                --- Chọn bằng cấp ---
                            </option>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label
                            for="CHUYENMON"
                            className="fw-bold text-dark pb-2"
                        >
                            Chuyên môn
                        </label>
                        <select
                            id="CHUYENMON"
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="" disabled selected>
                                --- Chọn chuyên môn ---
                            </option>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="mt-3 form-group col-md-6">
                        <label
                            for="TRANGTHAI"
                            className="fw-bold text-dark pb-2"
                        >
                            Trạng thái
                        </label>
                        <select
                            id="TRANGTHAI"
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="" disabled selected>
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
            </div>
        </div>
    );
}

export default ThemNV;
