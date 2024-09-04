// hooks/useFetchData.js
import { useState, useEffect } from "react";
import { fetchCategoryList } from "../api/service";

const useFetchData = (category, listType, shouldFetch, setShouldFetch) => {
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
            setShouldFetch(false); // Đặt lại shouldFetch về false sau khi hoàn tất
        }
    };

    useEffect(() => {
        if (shouldFetch) {
            fetchData();
        }
    }, [category, listType, shouldFetch]);

    return { data, error, loading };
};

export default useFetchData;
