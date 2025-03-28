// src/AppRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import AuthGuard from './components/auth/AuthGuard';
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
const HomePage = lazy(() => import('./pages/public/HomePage'));
const ExpertsPage = lazy(() => import('./pages/public/ExpertsPage'));
const LegalPage = lazy(() => import('./pages/public/LegalPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/auth/SignupPage'));
const ServicesPage = lazy(() => import('./pages/public/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/public/ServiceDetailPage'));
const ClientDashboard = lazy(() => import('./pages/dashboard/ClientDashboard'));
const ExpertDashboard = lazy(() => import('./pages/dashboard/ExpertDashboard'));
const OwnerDashboard = lazy(() => import('./pages/dashboard/OwnerDashboard'));
const ExpertDetailPage = lazy(() => import('./pages/public/ExpertDetailPage'));
const NotFoundPage = lazy(() => import('./pages/errors/NotFoundPage'));

export default function AppRouter() {
    return (
        <Routes>
            {/* Routes Publiques */}
            <Route element={<PublicLayout />}>
                <Route index path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:id" element={<ServiceDetailPage />} />
                <Route path="/experts" element={<ExpertsPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/experts/:id" element={<ExpertDetailPage />} />
            </Route>

            {/* Routes Protégées */}
            <Route element={<AuthGuard allowedRoles={['ROLE_CLIENT']} />}>
                <Route path="/client-dashboard" element={<ClientDashboard />} />
            </Route>

            <Route element={<AuthGuard allowedRoles={['ROLE_EXPERT']} />}>
                <Route path="/expert-dashboard" element={<ExpertDashboard />} />
            </Route>

            <Route element={<AuthGuard allowedRoles={['ROLE_OWNER']} />}>
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            </Route>

            {/* Gestion des erreurs */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
}