import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Alert
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

export default function ResendVerificationPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const theme = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);

        try {
            const response = await axios.post('/api/auth/resend-verification', { email });
            setStatus({ success: true, message: response.data.message });
        } catch (error) {
            const message = error.response?.data?.error || 'Something went wrong.';
            setStatus({ success: false, message });
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box sx={{ textAlign: 'center', width: '100%' }}>
                    <Typography variant="h4" gutterBottom>
                        Resend Email
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            required
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {status && (
                            <Alert severity={status.success ? 'success' : 'error'} sx={{ my: 2 }}>
                                {status.message}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2 }}
                        >
                            Resend
                        </Button>
                    </form>
                </Box>
            </Box>
        </Container>
    );
}
