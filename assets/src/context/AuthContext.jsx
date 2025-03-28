// src/context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import { ApiService } from '../api/apiService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// Fonction de validation du token
const isValidToken = (token) => {
    if (!token) return false;
    try {
        const [, payload] = token.split('.');
        const decoded = JSON.parse(atob(payload));
        return decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};

export function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState(() => {
        const token = localStorage.getItem('authToken');
        return isValidToken(token) ? token : null;
    });

    const [user, setUser] = useState(() => {
        try {
            const userData = localStorage.getItem('user');
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('user');
            return null;
        }
    });

    useEffect(() => {
        if (authToken) {
            ApiService.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        } else {
            delete ApiService.defaults.headers.common['Authorization'];
        }
    }, [authToken]);

    const login = async (token) => {
        try {
            if (!token) throw new Error('Token manquant');

            // Vérification du token
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (!payload.exp || payload.exp * 1000 < Date.now()) {
                throw new Error('Token expiré');
            }

            // Stockage du token
            localStorage.setItem('authToken', token);
            setAuthToken(token);
            ApiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Récupération de l'utilisateur complet via /api/me
            const meResponse = await ApiService.get('/api/me');
            const fullUser = meResponse.data;

            localStorage.setItem('user', JSON.stringify(fullUser));
            setUser(fullUser);

            return determineRedirectPath(fullUser.roles);
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            logout();
            throw error;
        }
    };

    const determineRedirectPath = (roles) => {
        if (roles?.includes('ROLE_OWNER')) return '/owner-dashboard';
        if (roles?.includes('ROLE_ADMIN')) return '/admin';
        if (roles?.includes('ROLE_EXPERT')) return '/expert-dashboard';
        if (roles?.includes('ROLE_CLIENT')) return '/client-dashboard';
        return '/';
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setAuthToken(null);
        setUser(null);
    };

    const value = {
        authToken,
        user,
        isAuthenticated: !!authToken,
        login,
        logout,
        hasRole: (role) => user?.roles?.includes(role)
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
