import { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Skeleton,
    Button
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorDialog from '../../components/ui/ErrorDialog';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../../components/sections/HeroSection';
import FeaturesSection from '../../components/sections/FeaturesSection';
import { useAuth } from '../../context/AuthContext';
import useTopExperts from '../../hooks/useTopExperts';
import useHighlightedServices from '../../hooks/useHighlightedServices';


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
    const { isAuthenticated } = useAuth();
    const { experts: topExperts, loading: expertsLoading, error: expertsError } = useTopExperts();
    const { services: highlightedServices, loading: servicesLoading, error: servicesError } = useHighlightedServices();
    const navigate = useNavigate();


    useEffect(() => {
        if (servicesError || expertsError) {
            setError(servicesError || expertsError);
        }
    }, [servicesError, expertsError]);

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
            <HeroSection isAuthenticated={isAuthenticated} />
            <FeaturesSection />

            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Our Featured Services
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {(servicesLoading ? Array(3).fill({}) : highlightedServices).map((service, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <motion.div variants={fadeIn} initial="hidden" animate="visible">
                                <Card
                                    onClick={() => !servicesLoading && navigate(`/services/${service.id}`, { state: { service } })}
                                    sx={{
                                        cursor: servicesLoading ? 'default' : 'pointer',
                                        '&:hover': !servicesLoading && {
                                            boxShadow: 6,
                                            transform: 'translateY(-3px)',
                                            transition: 'all 0.2s ease-in-out'
                                        }
                                    }}
                                >
                                    <CardContent>
                                        {servicesLoading ? (
                                            <Skeleton variant="rectangular" width="100%" height={140} />
                                        ) : (
                                            <>
                                                <Box sx={{ fontSize: '2rem', mb: 1 }}>
                                                    <i className={`fa ${service.icon}`} />
                                                </Box>
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    noWrap
                                                    sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                                                >
                                                    {service.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    noWrap
                                                    sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                                                >
                                                    {service.description}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle2"
                                                    noWrap
                                                    sx={{ mt: 1, color: 'primary.main', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                                                >
                                                    {service.category} • {service.price} €
                                                </Typography>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 10 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Our Top Experts
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {(expertsLoading ? Array(5).fill({}) : topExperts).map((expert, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <motion.div variants={fadeIn} initial="hidden" animate="visible">
                                    <Card
                                        onClick={() => !expertsLoading && navigate(`/experts/${expert.id}`)}
                                        sx={{
                                            textAlign: 'center',
                                            cursor: expertsLoading ? 'default' : 'pointer',
                                            '&:hover': !expertsLoading && {
                                                boxShadow: 6,
                                                transform: 'translateY(-3px)',
                                                transition: 'all 0.2s ease-in-out'
                                            }
                                        }}
                                    >
                                        {expertsLoading ? (
                                            <Skeleton variant="rectangular" height={200} />
                                        ) : (
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={expert.photo_url || '/images/experts/default-expert.png'}
                                                alt={expert.full_name}
                                                sx={{ objectFit: 'cover' }}
                                            />
                                        )}
                                        <CardContent>
                                            {expertsLoading ? (
                                                <Skeleton height={30} width="60%" />
                                            ) : (
                                                <>
                                                    <Typography variant="h6" noWrap>
                                                        {expert.full_name}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        noWrap
                                                        sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                                                    >
                                                        {expert.bio?.slice(0, 80)}...
                                                    </Typography>
                                                    <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
                                                        ⭐ {Number(expert.score).toFixed(1)}
                                                    </Typography>
                                                </>
                                            )}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ mt: 10 }}>
                    <Typography variant="h4" align="center" gutterBottom>
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
                                        <Card component={motion.div} whileHover={{ scale: 1.03 }}>
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
                </Box>
            </Container>
        </Box>
    );
}
