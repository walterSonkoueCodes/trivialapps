import { useState, useEffect } from 'react';
import ApiService from '../api/apiService';

export default function useTopExperts(limit = 5) {
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExperts = async () => {
            try {
                const response = await ApiService.get(`api/experts/top?limit=${limit}`);
                console.log("top Expert: ", response.data)
                setExperts(response.data);
            } catch (err) {
                console.error('Failed to fetch top experts:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchExperts();
    }, [limit]);

    return { experts, loading, error };
}
