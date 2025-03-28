// assets/src/pages/public/LoginPage.jsx

import { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { ApiService } from '../../api/apiService';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export default function LoginPage() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.post('/api/login', {
                email: credentials.email,
                password: credentials.password
            });
            console.log('Réponse complète:', response); // Debug

            if (!response.data.token) {
                throw new Error('Token missing from response');
            }

            // Extraction des données du token
            const tokenPayload = JSON.parse(atob(response.data.token.split('.')[1]));
            console.log('Payload du token:', tokenPayload); // Debug

            const userData = {
                email: tokenPayload.username, // Lexik utilise 'username' par défaut
                roles: tokenPayload.roles || [],
                fullName: tokenPayload.fullName || ''
            };

            const redirectPath = await login(response.data.token, userData);
            navigate(redirectPath);
        } catch (err) {
            if (err.response?.data?.detail?.includes('confirm your email')) {
                setError(
                    <span>
                        Please confirm your email.
                        <a href="#" onClick={() => navigate('/resend-verification')}>
                            Resend confirmation email
                        </a>
                    </span>
                );
            } else {
                setError(err.response?.data?.detail || 'Connection failed');
            }

        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    LOGIN
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        required
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    />

                    <TextField
                        label="Mot de passe"
                        type="password"
                        fullWidth
                        margin="normal"
                        required
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />

                    {error && (
                        <Typography color="error" paragraph>
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                    >
                        sign in
                    </Button>

                    <Typography variant="body2" align="center">
                        Don't have an account?{' '}
                        <RouterLink
                            to="/signup"
                            style={{
                                color: theme.palette.primary.main,
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            Create one here
                        </RouterLink>
                    </Typography>
                </form>
            </Box>
        </Container>
    );
}