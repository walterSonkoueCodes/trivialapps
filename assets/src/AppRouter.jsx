import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AuthGuard from './components/auth/AuthGuard';
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import HomePage from './pages/public/HomePage';
import ExpertsPage from './pages/public/ExpertsPage';
import LegalPage from './pages/public/LegalPage';
import LoginPage from './pages/public/LoginPage';
import DashboardHome from './pages/dashboard/DashboardHome';
import ProjectsPage from './pages/dashboard/ProjectsPage';
import InvoicesPage from './pages/dashboard/InvoicesPage';
import OrderWizardPage from './pages/dashboard/OrderWizardPage';
const NotFoundPage = lazy(() => import('../pages/errors/NotFoundPage'));

export default function AppRouter() {
    return (
        <Routes>
            {/* Routes Publiques */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/experts" element={<ExpertsPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="*" element={<NotFoundPage />} />
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

            {/* Gestion des erreurs */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
}