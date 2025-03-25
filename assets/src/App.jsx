// src/App.jsx

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, LinearProgress } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider as AppThemeProvider, useTheme } from './context/ThemeContext';
import { createAppTheme } from './theme';
import GlobalStyles from './components/ui/GlobalStyles';
import AuthGuard from "./components/auth/AuthGuard";
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import createTheme from './theme';

// Layouts
const PublicLayout = React.lazy(() => import('./components/layout/PublicLayout'));
const DashboardLayout = React.lazy(() => import('./components/layout/DashboardLayout'));

// Pages
const HomePage = React.lazy(() => import('./pages/public/HomePage'));
const LoginPage = React.lazy(() => import('./pages/public/LoginPage'));
const ServicesPage = React.lazy(() => import('./pages/public/ServicesPage'));
const ExpertsPage = React.lazy(() => import('./pages/public/ExpertsPage'));
const LegalPage = React.lazy(() => import('./pages/public/LegalPage'));
const NotFoundPage = React.lazy(() => import('./pages/errors/NotFoundPage'));
const DashboardHome = React.lazy(() => import('./pages/dashboard/DashboardHome'));
const ProjectsPage = React.lazy(() => import('./pages/dashboard/ProjectsPage'));
const InvoicesPage = React.lazy(() => import('./pages/dashboard/InvoicesPage'));
const OrderWizardPage = React.lazy(() => import('./pages/dashboard/OrderWizardPage'));

// Composant de chargement personnalisé
const LoadingFallback = () => (
    <div style={{ padding: '2rem' }}>
        <LinearProgress color="primary" />
    </div>
);

if (process.env.NODE_ENV === 'development') {
    import('./mocks/server').then(({ makeServer }) => makeServer());
}

function AppContent() {
    const { darkMode } = useTheme();
    const theme = createTheme(darkMode);

    return (
        <ThemeProvider theme={theme}>
            <MuiThemeProvider theme={createTheme}>
                <CssBaseline />
                <GlobalStyles />
                <Suspense fallback={<LoadingFallback />}>
                    <BrowserRouter>
                        <Routes>
                            {/* Routes Publiques */}
                            <Route element={<PublicLayout />}>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/services" element={<ServicesPage />} />
                                <Route path="/experts" element={<ExpertsPage />} />
                                <Route path="/legal" element={<LegalPage />} />
                            </Route>

                            {/* Routes Protégées */}
                            <Route element={<AuthGuard />}>
                                <Route element={<DashboardLayout />}>
                                    <Route path="/dashboard" element={<DashboardHome />} />
                                    <Route path="/dashboard/projects" element={<ProjectsPage />} />
                                    <Route path="/dashboard/invoices" element={<InvoicesPage />} />
                                    <Route path="/dashboard/orders/new" element={<OrderWizardPage />} />
                                </Route>
                            </Route>

                            {/* Gestion des erreurs 404 */}
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </BrowserRouter>
                </Suspense>
            </MuiThemeProvider>
        </ThemeProvider>
    );
}

export default function App() {
    return (
        <AppThemeProvider>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </AppThemeProvider>
    );
}