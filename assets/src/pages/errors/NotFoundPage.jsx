// src/pages/errors/NotFoundPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid } from '@mui/material';
import { Home as HomeIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import useTracking from '../../hooks/useTracking';

export default function NotFoundPage() {
    const navigate = useNavigate();
    const { trackPageView } = useTracking();

    useEffect(() => {
        trackPageView('404 Page');
    }, [trackPageView]);

    const variants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        },
        exit: { opacity: 0 }
    };

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
            >
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src="/images/404-illustration.svg"
                            alt="Page non trouvée"
                            sx={{
                                width: '100%',
                                height: 'auto',
                                maxWidth: 400
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h1"
                            component="h1"
                            sx={{
                                fontSize: { xs: '3rem', md: '4rem' },
                                fontWeight: 700,
                                mb: 2
                            }}
                        >
                            404
                        </Typography>

                        <Typography variant="h4" gutterBottom>
                            Oups ! Page introuvable
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 4 }}>
                            La page que vous cherchez a peut-être été déplacée ou n'existe plus.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<HomeIcon />}
                                onClick={() => navigate('/')}
                                sx={{ px: 4 }}
                            >
                                Page d'accueil
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<ArrowBackIcon />}
                                onClick={() => navigate(-1)}
                            >
                                Retour
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </motion.div>
        </Container>
    );
}