import { useState, useEffect } from 'react';
import { ApiService } from '../api/apiService';

export default function useServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await ApiService.get('/api/services');
                console.log('API Response:', response.data); // Ajoutez ce log
                setServices(Array.isArray(response?.data) ? response.data : []);
            } catch (err) {
                console.error('API Error:', err); // Log des erreurs
                setError(err);
                setServices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return { services, loading, error };
}