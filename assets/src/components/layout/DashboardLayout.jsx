import { AppBar, Toolbar, IconButton, Switch } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from "../ui/ThemeToggle";
import LogoutButton from '../auth/LogoutButton';

export default function DashboardLayout({ children }) {
    const { darkMode, toggleTheme } = useTheme();
    const { user } = useAuth();

    // Vérification des rôles
    if (!user) return <Navigate to="/login" replace />;

    const isAuthorized = () => {
        const path = window.location.pathname;
        if (path.includes('/owner-dashboard') && !user.roles.includes('ROLE_OWNER')) return false;
        if (path.includes('/expert-dashboard') && !user.roles.includes('ROLE_EXPERT')) return false;
        if (path.includes('/client-dashboard') && !user.roles.includes('ROLE_CLIENT')) return false;
        return true;
    };

    if (!isAuthorized()) return <Navigate to="/" replace />;

    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton onClick={toggleTheme}>
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                    <Switch checked={darkMode} onChange={toggleTheme} />
                    <ThemeToggle />
                </Toolbar>
                <Toolbar>
                    <LogoutButton />
                </Toolbar>
            </AppBar>
            <main>{children}</main>
        </div>
    );
}