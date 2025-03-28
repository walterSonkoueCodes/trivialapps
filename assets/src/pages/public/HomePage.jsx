import { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    Card,
    CardContent,
    Skeleton
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ApiService } from '../../api/apiService';
import ErrorDialog from '../../components/ui/ErrorDialog';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../../components/sections/HeroSection';
import FeaturesSection from '../../components/sections/FeaturesSection';
import { useAuth } from '../../context/AuthContext';
import useServices from "../../hooks/useServices";

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function HomePage() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { services, loading: servicesLoading, error: servicesError } = useServices();

    useEffect(() => {
        if (servicesError) {
            setError(servicesError);
        }
    }, [servicesError]);

    if (error) {
        return <ErrorDialog
            open={true}
            message="Data loading error"
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
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                        >
                            <Typography variant="h2" gutterBottom>
                                {isAuthenticated ? 'Welcome to TrivialApps' : 'Create your digital project'}
                            </Typography>
                            <Typography variant="h5" color="textSecondary" paragraph>
                                {isAuthenticated
                                    ? 'Manage your projects and invoices with ease'
                                    : 'Tailor-made solutions for your business'}
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                component={motion.button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href={isAuthenticated ? "/dashboard" : "/login"}
                                sx={{
                                    mr: isAuthenticated ? 2 : 0,
                                    mb: { xs: 2, sm: 0 }
                                }}
                            >
                                {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                            </Button>
                        </motion.div>
                    </Grid>

                    {/* Services Section with Loading State */}
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
                            Our Services
                        </Typography>

                        <AnimatePresence>
                            {servicesLoading ? (
                                <Grid container spacing={4} justifyContent="center">
                                    {[0, 1, 2].map((item) => (
                                        <Grid item xs={12} sm={6} md={4} key={item}>
                                            <motion.div variants={fadeIn}>
                                                <Card>
                                                    <CardContent>
                                                        <Skeleton variant="rectangular" width="100%" height={140} />
                                                        <Skeleton width="60%" sx={{ mt: 2 }} />
                                                        <Skeleton width="80%" />
                                                        <Skeleton width="40%" />
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <motion.div
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <Grid container spacing={4} justifyContent="center">
                                        {services.slice(0, 3).map((service, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={service.id}>
                                                <motion.div
                                                    variants={fadeIn}
                                                    custom={index}
                                                >
                                                    <Card
                                                        component={motion.div}
                                                        whileHover={{ y: -5 }}
                                                        sx={{ height: '100%' }}
                                                    >
                                                        <CardContent sx={{ textAlign: 'center' }}>
                                                            <Box sx={{
                                                                mb: 2,
                                                                fontSize: '2.5rem',
                                                                color: 'primary.main'
                                                            }}>
                                                                <i className={`fa ${service.icon}`} />
                                                            </Box>
                                                            <Typography variant="h5" gutterBottom>
                                                                {service.name}
                                                            </Typography>
                                                            <Typography variant="body1" sx={{ mb: 2 }}>
                                                                {service.description}
                                                            </Typography>
                                                            <Typography variant="h6" color="primary">
                                                                From {service.price}€
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Grid>

                    {/* Process Section */}
                    <Grid item xs={12} sx={{ mt: 8 }}>
                        <Typography variant="h4" gutterBottom align="center">
                            How It Works
                        </Typography>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            <Grid container spacing={4}>
                                {[
                                    { title: 'Consultation', desc: 'Initial needs analysis' },
                                    { title: 'Development', desc: 'Agile implementation' },
                                    { title: 'Delivery', desc: 'Final deployment' }
                                ].map((step, index) => (
                                    <Grid item xs={12} md={4} key={step.title}>
                                        <motion.div variants={fadeIn}>
                                            <Card
                                                component={motion.div}
                                                whileHover={{ scale: 1.03 }}
                                            >
                                                <CardContent sx={{ textAlign: 'center' }}>
                                                    <Typography variant="h6" color="primary">
                                                        Step {index + 1}
                                                    </Typography>
                                                    <Typography variant="h5" gutterBottom>
                                                        {step.title}
                                                    </Typography>
                                                    <Typography color="text.secondary">
                                                        {step.desc}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </Grid>
                                ))}
                            </Grid>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}