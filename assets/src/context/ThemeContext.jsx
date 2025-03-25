// src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// Création du contexte
const ThemeContext = createContext();

// Provider du thème
export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        try {
            const saved = localStorage.getItem('theme');
            return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
        } catch {
            return false;
        }
    });

    useEffect(() => {
        // Mise à jour du DOM et du localStorage
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        localStorage.setItem('theme', JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(prev => !prev);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Hook personnalisé avec vérification de contexte
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme doit être utilisé à l\'intérieur d\'un ThemeProvider');
    }
    return context;
}