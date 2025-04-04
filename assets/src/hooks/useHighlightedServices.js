import { useState, useEffect } from 'react';
import ApiService from '../api/apiService';

export default function useHighlightedServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHighlighted = async () => {
            try {
                const response = await ApiService.get('api/services/highlighted');
                console.log(" some services hit: ", response.data);
                setServices(response.data);
            } catch (err) {
                console.error('Failed to fetch highlighted services:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHighlighted();
    }, []);

    return { services, loading, error };
}
