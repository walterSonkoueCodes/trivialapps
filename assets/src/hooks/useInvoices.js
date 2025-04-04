import { useState, useEffect } from 'react';
import api from '../api/apiService';

export default function useInvoices() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await api.get('/invoices');
                setInvoices(response.data);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    return { invoices, loading };
}