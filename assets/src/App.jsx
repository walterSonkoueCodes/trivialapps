import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider as MuiThemeProvider, LinearProgress } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import GlobalStyles from './components/ui/GlobalStyles';
import { getAppTheme as createAppTheme } from './theme';
import AppRouter from './AppRouter';

const LoadingFallback = () => (
    <div style={{ padding: '2rem' }}>
        <LinearProgress color="primary" />
    </div>
);

function AppContent() {
    const { isDark } = useTheme(); // Une seule destructuring
    const muiTheme = createAppTheme(isDark);

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            <GlobalStyles />
            <Suspense fallback={<LoadingFallback />}>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </Suspense>
        </MuiThemeProvider>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </ThemeProvider>
    );
}