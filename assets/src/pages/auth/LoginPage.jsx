import { useState } from 'react';
import { TextField, Button, Typography, Container, Box, CircularProgress } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { ApiService } from '../../api/apiService';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export default function LoginPage() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await ApiService.post('/api/login', credentials, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (!response.data.token) {
                throw new Error('Token manquant dans la réponse');
            }

            const redirectPath = response.data.redirect || '/dashboard';
            login(response.data.token, response.data.user);
            navigate(redirectPath);

        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                err.message ||
                'Erreur de connexion';
            setError(errorMessage);

            // Debug détaillé
            console.group('Login Error');
            console.error('Full error:', err);
            console.log('Response:', err.response);
            console.groupEnd();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{
                mt: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                    Connexion
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        required
                        autoComplete="email"
                        autoFocus
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    />

                    <TextField
                        label="Mot de passe"
                        type="password"
                        fullWidth
                        margin="normal"
                        required
                        autoComplete="current-password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />

                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Se connecter'}
                    </Button>

                    <Typography variant="body2" align="center">
                        Vous n'avez pas de compte ?{' '}
                        <RouterLink
                            to="/signup"
                            style={{
                                color: theme.palette.primary.main,
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            Créez-en un ici
                        </RouterLink>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}