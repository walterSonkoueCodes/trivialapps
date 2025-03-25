import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

export default function NavBar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <Button component={Link} to="/" color="inherit">
                    Accueil
                </Button>

                {isAuthenticated ? (
                    <>
                        <Button component={Link} to="/dashboard" color="inherit">
                            Dashboard
                        </Button>
                        <Button onClick={() => { logout(); navigate('/'); }} color="inherit">
                            Déconnexion
                        </Button>
                    </>
                ) : (
                    <Button component={Link} to="/login" color="inherit">
                        Connexion
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}