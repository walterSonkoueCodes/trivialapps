import { useEffect, useState } from 'react';
import {
    Box,
    Container, // Ajout de l'import manquant
    Grid,
    Typography,
    Button,
    Card,
    CardContent
} from '@mui/material';
import { motion } from 'framer-motion';
import { ApiService } from '../../api/apiService';
import ServiceCarousel from '../../components/services/ServiceCarousel';
import ErrorDialog from '../../components/ui/ErrorDialog';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../../components/sections/HeroSection';
import FeaturesSection from '../../components/sections/FeaturesSection';

export default function HomePage() {
    const [services, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiService.get('/services');
                setData(response.data);
            } catch (err) {
                setError(err);
                console.error('API Error:', err);

                if (err.response?.status === 404) {
                    navigate('/not-found');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    if (error) {
        return <ErrorDialog
            open={true}
            message="Erreur de chargement des données"
            details={error.message}
            onClose={() => setError(null)}
        />;
    }

    return (
        <Box sx={{ overflowX: 'hidden' }}>
            <HeroSection />
            <FeaturesSection />
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={6}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Grid container spacing={4} sx={{ py: 8 }}>
                            {/* Hero Section */}
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <Typography variant="h2" gutterBottom>
                                    Créez votre projet digital
                                </Typography>
                                <Typography variant="h5" color="textSecondary" paragraph>
                                    Des solutions sur mesure pour votre entreprise et vos projets personnels
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="large"
                                    component={motion.button}
                                    whileHover={{ scale: 1.05 }}
                                    href="/login"
                                >
                                    Commencer maintenant
                                </Button>
                            </Grid>

                            {/* Services Preview */}
                            <Grid item xs={12}>
                                <Typography variant="h4" gutterBottom align="center">
                                    Nos Services
                                </Typography>
                                <ServiceCarousel services={services} loading={loading} />
                            </Grid>

                            {/* Process Section */}
                            <Grid item xs={12} sx={{ mt: 8 }}>
                                <Typography variant="h4" gutterBottom align="center">
                                    Comment ça marche ?
                                </Typography>
                                <Grid container spacing={4}>
                                    {['Consultation', 'Développement', 'Livraison'].map((step, index) => (
                                        <Grid item xs={12} md={4} key={step}>
                                            <motion.div
                                                initial={{ y: 20 }}
                                                animate={{ y: 0 }}
                                                transition={{ delay: index * 0.2 }}
                                            >
                                                <Card>
                                                    <CardContent sx={{ textAlign: 'center' }}>
                                                        <Typography variant="h6" color="primary">
                                                            Étape {index + 1}
                                                        </Typography>
                                                        <Typography variant="h5">{step}</Typography>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </motion.div>
                </Grid>
            </Container>
        </Box>
    );
}