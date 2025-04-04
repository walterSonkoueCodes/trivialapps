// src/components/auth/LogoutButton.jsx
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function LogoutButton() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Button onClick={handleLogout} color="inherit">
            Déconnexion
        </Button>
    );
}