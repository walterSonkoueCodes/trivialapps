import axios from 'axios';

export const ApiService = axios.create({
    baseURL: window.location.origin.replace(/:\d+/, ':8000') + '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
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