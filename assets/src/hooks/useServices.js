import { useState, useEffect } from 'react';
import { ApiService } from '../api/apiService';

// Cache pour les détails des services
const serviceDetailCache = new Map();

export default function useServices(page = 1, pageSize = 9, category = 'all') {
    const [services, setServices] = useState([]);
    const [totalServices, setTotalServices] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction existante pour récupérer un service par ID
    const getServiceById = async (id) => {
        if (serviceDetailCache.has(id)) {
            return serviceDetailCache.get(id);
        }

        try {
            const response = await ApiService.get(`/api/services/${id}`);
            serviceDetailCache.set(id, response.data);
            return response.data;
        } catch (err) {
            console.error(`Error fetching service ${id}:`, err);
            throw err;
        }
    };

    // Fonction pour précharger les services
    const prefetchServices = async () => {
        if (services.length === 0) {
            await fetchServices();
        }
    };

    // Fonction principale de récupération
    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await ApiService.get('/api/services', {
                params: {
                    page,
                    pageSize,
                    category: category === 'all' ? undefined : category
                }
            });
            console.log("service list: ", response.data);
            setServices(response.data?.services || []);
            setTotalServices(response.data?.total || 0);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to fetch services');
            setServices([]);
            setTotalServices(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, [page, pageSize, category]);

    // Fonction pour recharger les données
    const refetch = () => {
        serviceDetailCache.clear();
        fetchServices();
    };

    return {
        // Pagination
        services,
        totalServices,
        loading,
        error,

        // Fonctions existantes
        getServiceById,
        prefetchServices,
        refetch,

        // Métadonnées utiles
        currentPage: page,
        currentPageSize: pageSize,
        currentCategory: category
    };
}