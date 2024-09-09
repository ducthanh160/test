import apiClient from "./apiClient";
import { showToast } from "../utils/toast";

export const fetchGetCode = async (resource, identifier) => {
    try {
        // Tạo URL động dựa trên các tham số đầu vào
        const response = await apiClient.get(`/${resource}/${identifier}`);
        // Trả về response trực tiếp nếu không có thuộc tính data
        return response;
    } catch (error) {
        console.error("Lỗi khi lấy mã:", error);
        throw error;
    }
};

// Hàm thêm vào database
export const createCategory = async (resource, identifier, newPhongBan) => {
    try {
        // Xây dựng URL
        const url = `/${resource}/${identifier}`;

        // In URL và dữ liệu để kiểm tra
        console.log(`Gửi yêu cầu POST đến: ${url}`);
        console.log("Dữ liệu:", newPhongBan);

        // Gọi API để thêm mới
        const response = await apiClient.post(url, newPhongBan);

        // Trả về kết quả thành công
        return { success: true, data: response };
    } catch (error) {
        // Xử lý lỗi và trả về kết quả thất bại
        console.error(
            "Lỗi khi thêm mới:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : error.message,
        };
    }
};

// Hàm lấy danh sách từ API
export const fetchCategoryList = async (resource, identifier) => {
    try {
        // Gọi API để lấy danh sách
        const response = await apiClient.get(`/${resource}/${identifier}`);
        return response; // Trả về dữ liệu lấy được từ API
    } catch (error) {
        console.error("Lỗi khi lấy danh sách:", error);
        throw error;
    }
};

export const createCategoryWithToast = async (
    resource,
    identifier,
    newPhongBan
) => {
    const result = await createCategory(resource, identifier, newPhongBan);

    if (result.success) {
        showToast("success", "Thêm thành công!");
    } else {
        showToast("error", "Thêm thất bại");
    }
    return result;
};

// hàm lấy dữ liệu theo mã
export const getDataCode = async (category, type, param, val) => {
    const apiUrl = `/${category}/${type}?${param}`; // Xây dựng URL API
    try {
        const response = await apiClient.post(apiUrl, val); // Gọi hàm post từ apiClient
        // Kiểm tra phản hồi từ API
        if (!response || response.error) {
            // Kiểm tra nếu phản hồi không hợp lệ hoặc có lỗi từ phía server
            throw new Error(`HTTP error! ${response.error || "Unknown error"}`);
        }

        return response;
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
};
