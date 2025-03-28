import { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    Card,
    CardContent
} from '@mui/material';
import { motion } from 'framer-motion';
import { ApiService } from '../../api/apiService';
import ServiceCarousel from '../../components/sections/ServiceCarousel';
import ErrorDialog from '../../components/ui/ErrorDialog';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../../components/sections/HeroSection';
import FeaturesSection from '../../components/sections/FeaturesSection';
import { useAuth } from '../../context/AuthContext';
import useServices from "../../hooks/useServices"; // Import du contexte d'authentification

export default function HomePage() {
    const [services, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); // Récupération de l'état d'authentification
    const { getServices } = useServices();
    const [featuredServices, setFeaturedServices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const services = await getServices();
                if(services.length !== 0){ setFeaturedServices(services.slice(0, 3)); } // Prend les 3 premiers services
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
    }, [navigate, getServices]);

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
                                    {isAuthenticated ? 'Bienvenue sur TrivialApps' : 'Créez votre projet digital'}
                                </Typography>
                                <Typography variant="h5" color="textSecondary" paragraph>
                                    {isAuthenticated
                                        ? 'Gérez vos projets et factures en toute simplicité'
                                        : 'Des solutions sur mesure pour votre entreprise et vos projets personnels'}
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="large"
                                    component={motion.button}
                                    whileHover={{ scale: 1.05 }}
                                    href={isAuthenticated ? "/dashboard" : "/login"}
                                    sx={{
                                        mr: isAuthenticated ? 2 : 0,
                                        mb: { xs: 2, sm: 0 }
                                    }}
                                >
                                    {isAuthenticated ? 'Accéder au dashboard' : 'Commencer maintenant'}
                                </Button>
                                {isAuthenticated && (
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        component={motion.button}
                                        whileHover={{ scale: 1.05 }}
                                        href="/services"
                                    >
                                        Voir nos services
                                    </Button>
                                )}
                            </Grid>

                            {/* Services Preview */}
                            {!isAuthenticated && (
                                <Grid item xs={12}>
                                    <Typography variant="h4" gutterBottom align="center">
                                        Nos Services
                                    </Typography>
                                    {services.map(service => (
                                        <div key={service.id}>{service.name}</div>
                                    ))}
                                </Grid>
                            )}

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