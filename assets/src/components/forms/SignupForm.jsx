import { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    CircularProgress,
    Box,
    Grid
} from '@mui/material';
import { ApiService } from '../../api/apiService';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function SignupForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phone: '',
        birthDate: null
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsSubmitting(false);
            return;
        }

        try {
            const payload = {
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                phone: formData.phone,
                birthDate: formData.birthDate?.toISOString()
            };

            const response = await ApiService.post('/api/auth/register', payload);

            if (response.status === 201) {
                setRegistrationSuccess(true);
            }
        } catch (error) {
            const errData = error.response?.data;
            if (errData?.errors) {
                setError(Object.values(errData.errors).join(' | '));
            } else {
                setError(errData?.error || 'Registration failed');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (registrationSuccess) {
        return (
            <Box textAlign="center">
                <Typography variant="h5" gutterBottom>
                    Registration successful!
                </Typography>
                <Typography>
                    A confirmation email has been sent to {formData.email}
                </Typography>
                <Button
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={() => navigate('/login')}
                >
                    Back to login
                </Button>
            </Box>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Full name"
                            fullWidth
                            margin="normal"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Confirm password"
                            type="password"
                            fullWidth
                            margin="normal"
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Phone number"
                            fullWidth
                            margin="normal"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DatePicker
                            label="Date of birth"
                            value={formData.birthDate}
                            onChange={(newValue) => setFormData({ ...formData, birthDate: newValue })}
                            slotProps={{
                                textField: { fullWidth: true, margin: 'normal' }
                            }}
                        />
                    </Grid>
                </Grid>

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
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <CircularProgress size={24} /> : "Register"}
                </Button>
            </form>
        </LocalizationProvider>
    );
}