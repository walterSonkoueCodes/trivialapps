import { useState } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import SignupForm from '../../components/auth/SignupForm';
import { ApiService } from '../../api/apiService';

export default function SignupPage() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (formData) => {
        try {
            await ApiService.post('/signup/register', formData);
            setSuccess(true);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Créer un compte
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
                {success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        Inscription réussie ! Vous pouvez maintenant vous connecter.
                    </Alert>
                )}

                <SignupForm onSubmit={handleSubmit} />
            </Box>
        </Container>
    );
}