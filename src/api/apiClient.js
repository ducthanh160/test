// api/apiClient.js
const API_BASE_URL = "http://localhost:5077/api"; // URL gốc của API

const apiClient = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: { "Content-Type": "application/json" },
            ...options,
        });

        // Kiểm tra nếu phản hồi không OK
        if (!response.ok) {
            try {
                const errorData = await response.json(); // Đọc phản hồi dưới dạng JSON
                throw new Error(errorData.message || "Có lỗi xảy ra từ server"); // Lấy thông báo lỗi từ server
            } catch (e) {
                throw new Error(e.message); // Nếu không parse được JSON, sử dụng thông báo lỗi mặc định
            }
        }

        // Nếu phản hồi có nội dung, phân tích nó dưới dạng JSON
        const responseData = await response.text(); // Đọc phản hồi dưới dạng text
        return responseData ? JSON.parse(responseData) : {}; // Nếu có dữ liệu, phân tích nó; nếu không, trả về đối tượng rỗng
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        throw error;
    }
};

// Hàm `get` cho các yêu cầu `GET`
apiClient.get = (endpoint) => apiClient(endpoint, { method: "GET" });

// Hàm `post` cho các yêu cầu `POST`, bao gồm `body`
apiClient.post = (endpoint, body) =>
    apiClient(endpoint, { method: "POST", body: JSON.stringify(body) });

export default apiClient;
