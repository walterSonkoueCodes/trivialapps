// src/hooks/useExperts.js
import { useState, useEffect } from 'react';

const useExperts = (page = 1, pageSize = 9) => {
    const [experts, setExperts] = useState([]);
    const [totalExperts, setTotalExperts] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExperts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/experts?page=${page}&pageSize=${pageSize}`);

                if (!response.ok) {
                    throw new Error(`Erreur HTTP! statut: ${response.status}`);
                }

                const data = await response.json();
                setExperts(data.experts);
                setTotalExperts(data.total);
                setError(null);
            } catch (err) {
                setError(err.message);
                setExperts([]);
                setTotalExperts(0);
            } finally {
                setLoading(false);
            }
        };

        fetchExperts();
    }, [page, pageSize]);

    return { experts, totalExperts, loading, error };
};

export default useExperts;