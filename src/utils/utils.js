import React, { useState, useRef } from "react";

// Các hàm và cấu hình
export const useEditor = () => {
    const [editorData, setEditorData] = useState("");
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };
    return { editorData, handleEditorChange };
};

export const useInputRefs = () => {
    const inputCodeRef = useRef(null);
    const inputNameRef = useRef(null);
    const inputNguoiTaoRef = useRef(null);
    const inputNgayTaoRef = useRef(null);

    return {
        inputCodeRef,
        inputNameRef,
        inputNguoiTaoRef,
        inputNgayTaoRef,
    };
};

export const handleGetInputValue = (inputRefs, editorData) => {
    const { inputCodeRef, inputNameRef, inputNguoiTaoRef, inputNgayTaoRef } =
        inputRefs;
    const codeValue = inputCodeRef.current ? inputCodeRef.current.value : "";
    const nameValue = inputNameRef.current ? inputNameRef.current.value : "";
    const nguoiTaoValue = inputNguoiTaoRef.current
        ? inputNguoiTaoRef.current.value
        : "";
    const ngayTaoValue = inputNgayTaoRef.current
        ? inputNgayTaoRef.current.value
        : "";

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = editorData;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";

    // Trả về đối tượng dữ liệu để thêm vào cơ sở dữ liệu
    return {
        codeValue, // Hoặc tên trường khác tùy thuộc vào loại dữ liệu
        nameValue,
        plainText,
        nguoiTaoValue,
        ngayTaoValue,
    };
};

export const getDateCurrent = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

export const config = {
    phongban: {
        codeId: "MAPB",
        nameId: "TENPB",
        modalTitle: "Thêm phòng ban",
        modalTitleFix: "Sửa phòng ban",
        labelTitle: "Mã phòng ban",
        name: "Tên phòng ban",
        placeholderCode: "Nhập mã phòng ban...",
        placeholderName: "Nhập tên phòng ban...",
    },
    chucvu: {
        id: "MACV",
        nameId: "TENCV",
        modalTitle: "Thêm chức vụ",
        modalTitleFix: "Sửa chức vụ",
        labelTitle: "Mã chức vụ",
        name: "Tên chức vụ",
        placeholderCode: "Nhập mã chức vụ...",
        placeholderName: "Nhập tên chức vụ...",
    },
    trinhdo: {
        id: "MATD",
        nameId: "TENTD",
        modalTitle: "Thêm trình độ",
        labelTitle: "Mã trình độ",
        name: "Tên trình độ",
        placeholderCode: "Nhập mã trình độ...",
        placeholderName: "Nhập tên trình độ...",
    },
    chuyenmon: {
        id: "MACM",
        nameId: "TENCM",
        modalTitle: "Thêm chuyên môn",
        labelTitle: "Mã chuyên môn",
        name: "Tên chuyên môn",
        placeholderCode: "Nhập mã chuyên môn...",
        placeholderName: "Nhập tên chuyên môn...",
    },
    loainv: {
        id: "MALNV",
        nameId: "TENLNV",
        modalTitle: "Thêm loại nhân viên",
        labelTitle: "Mã loại nhân viên",
        name: "Tên loại nhân viên",
        placeholderCode: "Nhập mã loại nhân viên...",
        placeholderName: "Nhập tên loại nhân viên...",
    },
    bangcap: {
        id: "MABC",
        nameId: "TENBC",
        modalTitle: "Thêm bằng cấp",
        labelTitle: "Mã bằng cấp",
        name: "Tên bằng cấp",
        placeholderCode: "Nhập mã bằng cấp...",
        placeholderName: "Nhập tên bằng cấp...",
    },
    // Thêm cấu hình cho các loại khác nếu cần
};

// Hàm chuyển đổi dữ liệu cho phòng ban
export const transformPhongBanData = (newData) => ({
    MaPB: newData.codeValue,
    TenPB: newData.nameValue,
    MoTa: newData.plainText,
    NguoiTao: newData.nguoiTaoValue,
    NgayTao: newData.ngayTaoValue,
});

// Hàm chuyển đổi dữ liệu cho chức vụ
export const transformChucVuData = (newData) => ({
    MaCV: newData.codeValue,
    TenCV: newData.nameValue,
    MoTa: newData.plainText,
    NguoiTao: newData.nguoiTaoValue,
    NgayTao: newData.ngayTaoValue,
});
