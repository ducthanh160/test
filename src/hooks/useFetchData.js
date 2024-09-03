// hooks/useFetchData.js
import { useState, useEffect } from "react";
import { fetchCategoryList } from "../api/service";

const useFetchData = (category, listType) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetchCategoryList(category, listType);
                setData(response);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category, listType]);

    return { data, error, loading };
};

export default useFetchData;
