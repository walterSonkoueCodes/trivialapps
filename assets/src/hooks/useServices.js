// assets/src/hooks/useServices.js
import { useState, useEffect } from 'react';
import apiService from '../api/apiService';

export default function useServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await apiService.get('/services');
                setServices(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return { services, loading, error };
}