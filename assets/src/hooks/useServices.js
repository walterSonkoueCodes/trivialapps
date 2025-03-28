import { useState, useEffect } from 'react';
import { ApiService } from '../api/apiService';

// Cache simple en mémoire
const serviceCache = new Map();

export default function useServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            if (serviceCache.has('all')) {
                setServices(serviceCache.get('all'));
                setLoading(false);
                return;
            }

            try {
                const response = await ApiService.get('/api/services');
                const data = Array.isArray(response?.data) ? response.data : [];
                serviceCache.set('all', data);
                setServices(data);
            } catch (err) {
                setError(err);
                setServices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const getServiceById = async (id) => {
        if (serviceCache.has(id)) {
            return serviceCache.get(id);
        }

        try {
            const response = await ApiService.get(`/api/services/${id}`);
            serviceCache.set(id, response.data);
            return response.data;
        } catch (error) {
            console.error(`Error fetching service ${id}:`, error);
            throw error;
        }
    };

    const prefetchServices = async () => {
        if (!serviceCache.has('all')) {
            await fetchServices();
        }
    };

    return { services, loading, error, getServiceById, prefetchServices };
}