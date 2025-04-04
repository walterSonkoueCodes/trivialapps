import {
    Box,
    Typography,
    TextField,
    Grid,
    Button,
    Checkbox,
    FormControlLabel,
    Alert,
    Divider,
    Link
} from '@mui/material';
import { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import ApiService from '../../api/apiService';
import { useNavigate } from 'react-router-dom';
import FeaturePicker from './FeaturePicker';

export default function StartProjectForm({ service }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        address: '',
        selectedFeatures: [],
        phoneMeeting: false,
        termsAccepted: false
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFeatureSelection = (selectedFeatures) => {
        setFormData(prev => ({ ...prev, selectedFeatures }));
    };

    const totalPrice = useMemo(() => {
        if (!service || !service.feature_details) return service?.price || 0;

        const basePrice = parseFloat(service.price || 0);
        const selectedPrice = formData.selectedFeatures
            .map(name => {
                const feature = service.feature_details.find(f => f.name === name);
                return feature ? parseFloat(feature.price || 0) : 0;
            })
            .reduce((acc, val) => acc + val, 0);

        return (basePrice + selectedPrice).toFixed(2);
    }, [formData.selectedFeatures, service]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.termsAccepted) {
            return setError('You must accept the terms of the contract to proceed.');
        }

        setLoading(true);
        try {
            await ApiService.post('/api/project/start', {
                serviceId: service.id,
                address: formData.address,
                phoneMeeting: formData.phoneMeeting,
                selectedFeatures: formData.selectedFeatures
            });
            navigate('/client-dashboard');
        } catch (err) {
            setError('An error occurred while submitting your project.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>Start your project</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Full Name"
                        value={user.full_name}
                        disabled
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Email"
                        value={user.email}
                        disabled
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Phone"
                        value={user.phone || ''}
                        disabled
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Address"
                        name="address"
                        onChange={handleChange}
                        value={formData.address}
                        fullWidth
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <FeaturePicker
                        features={service.feature_details || []}
                        selected={formData.selectedFeatures}
                        onSelectionChange={handleFeatureSelection}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" color="primary">
                            Total: <strong>{totalPrice} €</strong>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox name="phoneMeeting" checked={formData.phoneMeeting} onChange={handleChange} />}
                        label="Request a phone call to better prepare the project"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <FormControlLabel
                        control={<Checkbox name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} required />}
                        label={<>
                            I have read and agree to the <strong>contract terms</strong>.
                            <Link href="/contract-terms" target="_blank" rel="noopener" sx={{ ml: 1 }}>
                                View Terms
                            </Link>
                        </>}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" size="large" type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Project'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}