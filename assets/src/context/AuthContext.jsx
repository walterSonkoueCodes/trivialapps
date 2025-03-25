import { createContext, useContext, useState } from 'react';
import ApiService from '../api/apiService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    const login = async (email, password) => {
        const response = await ApiService.login({ email, password });
        localStorage.setItem('authToken', response.token);
        setAuthToken(response.token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated: !!authToken,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);