// src/pages/public/ServiceDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Chip,
    Grid,
    Container,
    useTheme,
    Skeleton,
    IconButton
} from '@mui/material';
import { ArrowBack, PlayCircleOutline, CheckCircle } from '@mui/icons-material';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import useServices from '../../hooks/useServices';
import { useTranslation } from 'react-i18next';

const motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

export default function ServiceDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const { t } = useTranslation();
    const { getServiceById, prefetchServices } = useServices();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        prefetchServices();

        if (!service) {
            const loadService = async () => {
                try {
                    const data = await getServiceById(id);
                    setService(data);
                } catch (error) {
                    console.error('Error loading service:', error);
                    navigate('/not-found', { replace: true });
                } finally {
                    setLoading(false);
                }
            };
            loadService();
        }
    }, [id, service, getServiceById, navigate, prefetchServices]);

    if (!service && !loading) {
        return null;
    }

    return (
        <Container maxWidth="xl" sx={{ py: 8 }}>
            <Box sx={{ mb: 4 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ color: 'text.primary' }}>
                    <ArrowBack />
                </IconButton>
            </Box>

            <Grid container spacing={6} component={motion.div} {...motionProps}>
                {/* Section Vidéo */}
                <Grid item xs={12} md={7}>
                    <Box sx={{
                        position: 'relative',
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: theme.shadows[8],
                        '&:hover .video-overlay': {
                            opacity: 1
                        }
                    }}>
                        {loading ? (
                            <Skeleton variant="rectangular" height={600} />
                        ) : (
                            <>
                                <ReactPlayer
                                    url={service.videoUrl}
                                    width="100%"
                                    height="600px"
                                    controls
                                    playing
                                    light={service.image}
                                />
                                <Box className="video-overlay" sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)',
                                    opacity: 0,
                                    transition: 'opacity 0.3s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <PlayCircleOutline sx={{
                                        fontSize: 80,
                                        color: 'white',
                                        opacity: 0.8
                                    }} />
                                </Box>
                            </>
                        )}
                    </Box>
                </Grid>

                {/* Détails du Service */}
                <Grid item xs={12} md={5}>
                    <Box sx={{
                        position: 'sticky',
                        top: theme.spacing(8),
                        backgroundColor: 'background.paper',
                        borderRadius: 4,
                        p: 4,
                        boxShadow: theme.shadows[4]
                    }}>
                        {/* En-tête */}
                        {loading ? (
                            <Skeleton variant="text" width="60%" height={60} />
                        ) : (
                            <Chip
                                label={t(`services.categories.${service.category}`)}
                                color="primary"
                                sx={{ mb: 3, fontWeight: 600 }}
                            />
                        )}

                        {/* Titre */}
                        {loading ? (
                            <Skeleton variant="text" width="80%" height={60} sx={{ mb: 3 }} />
                        ) : (
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '2rem', md: '2.5rem' }, // Réduit de 2.5/3.5 à 2/2.5
                                    fontWeight: 800,
                                    lineHeight: 1.2,
                                    mb: 3
                                }}
                            >
                                {service.name}
                            </Typography>
                        )}

                        {/* Description complète */}
                        {loading ? (
                            <>
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />
                                <Skeleton variant="text" width="60%" />
                            </>
                        ) : (
                            <Typography
                                variant="body1"
                                paragraph
                                sx={{
                                    fontSize: '1.1rem',
                                    lineHeight: 1.8,
                                    mb: 4,
                                    color: 'text.secondary'
                                }}
                            >
                                {service.fullDescription}
                            </Typography>
                        )}

                        {/* Caractéristiques */}
                        <Box sx={{
                            backgroundColor: 'background.default',
                            borderRadius: 3,
                            p: 4,
                            mb: 4
                        }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    mb: 3
                                }}
                            >
                                {t('services features')}
                            </Typography>

                            <Grid container spacing={2}>
                                {(loading ? Array.from(new Array(4)) : (service?.features || [])).map((feature, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                            <CheckCircle
                                                sx={{
                                                    color: 'primary.main',
                                                    mr: 2,
                                                    fontSize: '1.2rem'
                                                }}
                                            />
                                            {loading ? (
                                                <Skeleton variant="text" width="70%" />
                                            ) : (
                                                <Typography variant="body1">{feature}</Typography>
                                            )}
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                        {/* Prix et CTA */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mt: 4
                        }}>
                            {loading ? (
                                <Skeleton variant="text" width="40%" height={40} />
                            ) : (
                                <Box>
                                    <Typography
                                        variant="overline"
                                        sx={{
                                            display: 'block',
                                            color: 'text.secondary',
                                            mb: 0.5
                                        }}
                                    >
                                        {t('start price')}
                                    </Typography>
                                    <Typography
                                        variant="h3" // Changé de h2 à h3
                                        sx={{
                                            color: 'primary.main',
                                            fontWeight: 800,
                                            fontSize: '2rem' // Taille fixe pour plus de cohérence
                                        }}
                                    >
                                        {service.price}€
                                    </Typography>
                                </Box>
                            )}

                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    px: 4,
                                    py: 2,
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    whiteSpace: 'nowrap'
                                }}
                                disabled={loading}
                            >
                                {t('start project')}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}