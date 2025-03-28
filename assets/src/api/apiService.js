import axios from 'axios';

export const ApiService = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? 'https://localhost:8000'
        : '/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    timeout: 10000, // 10 second timeout
});

// Intercepteur pour les requêtes
ApiService.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

ApiService.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 404) {
            console.error('Endpoint non trouvé :', error.config.url);
            // Rediriger vers la page 404 ou afficher un message
        }
        return Promise.reject(error);
    }
);


export const setAuthToken = (token) => {
    ApiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default ApiService;