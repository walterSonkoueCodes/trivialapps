// assets/src/hooks/useExperts.js
import { useState, useEffect } from 'react';
import apiService from '../api/apiService';

export default function useExperts() {
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExperts = async () => {
            try {
                const response = await apiService.get('/experts');
                setExperts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExperts();
    }, []);

    return { experts, loading, error };
}