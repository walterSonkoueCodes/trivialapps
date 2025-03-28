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

    const login = async (token, userData) => {
        try {
            if (!token) throw new Error('Token manquant');

            // Vérification basique du token
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (!payload.exp || payload.exp * 1000 < Date.now()) {
                throw new Error('Token expiré');
            }

            // Structure minimale des données utilisateur
            const minimalUserData = {
                email: payload.username,
                roles: payload.roles || [],
                ...userData
            };

            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(minimalUserData));

            setAuthToken(token);
            setUser(minimalUserData);

            // Détermination du chemin de redirection
            if (minimalUserData.roles.includes('ROLE_ADMIN')) {
                return '/admin';
            }
            if (minimalUserData.roles.includes('ROLE_EXPERT')) {
                return '/expert-dashboard';
            }
            return '/dashboard';

        } catch (error) {
            console.error('Erreur de connexion:', {
                error: error.message,
                token,
                userData
            });
            logout();
            throw error;
        }
    };

// Fonction helper pour déterminer le chemin
    const determineRedirectPath = (roles) => {
        if (roles?.includes('ROLE_ADMIN')) return '/admin';
        if (roles?.includes('ROLE_EXPERT')) return '/expert-dashboard';
        return '/dashboard';
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