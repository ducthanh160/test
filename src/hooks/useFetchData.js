// hooks/useFetchData.js
import { useState, useEffect } from "react";
import { fetchCategoryList } from "../api/service";

const useFetchData = (category, listType, shouldRefetch) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetchCategoryList(category, listType);
            setData(response);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // Gọi hàm fetchData mỗi khi category, listType, hoặc shouldRefetch thay đổi
    }, [category, listType, shouldRefetch]); // Thêm shouldRefetch vào dependency array

    return { data, error, loading };
};

export default useFetchData;
