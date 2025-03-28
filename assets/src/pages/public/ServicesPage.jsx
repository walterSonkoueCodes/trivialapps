// src/pages/public/ServicesPage.jsx
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Tabs,
    Tab,
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Box,
    useTheme,
    CircularProgress,
    Alert
} from '@mui/material';
import { PlayCircleOutline } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import useServices from '../../hooks/useServices';

export default function ServicesPage() {
    const [category, setCategory] = React.useState('all');
    const { services, loading, error } = useServices();
    const navigate = useNavigate();
    const theme = useTheme();
    const { t } = useTranslation();

    const filteredServices = useMemo(() => {
        if (!services || !Array.isArray(services)) return [];
        return category === 'all'
            ? services
            : services.filter(service =>
                service.category?.toLowerCase() === category.toLowerCase()
            );
    }, [services, category]);

    const handleServiceClick = (serviceId) => {
        navigate(`/services/${serviceId}`);
    };

    // Styles réutilisables
    const styles = {
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.shadows[6]
            }
        },
        cardMedia: {
            objectFit: 'cover',
            borderBottom: `4px solid ${theme.palette.primary.main}`,
            aspectRatio: '16/9'
        },
        priceTag: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontWeight: 700
        }
    };

    const SERVICE_CATEGORIES = [
        { key: 'all', labelKey: 'all' },
        { key: 'web', labelKey: 'web' },
        { key: 'mobile', labelKey: 'mobile' },
        { key: 'design', labelKey: 'design' },
        { key: 'data science', labelKey: 'data_science' }, // Clé doit correspondre exactement à la catégorie
        { key: 'video editing', labelKey: 'video_editing' },
        { key: 'sketching', labelKey: 'sketching' } // Uniformisez la casse
    ];

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh'
            }}>
                <CircularProgress size={60} />
                <Typography variant="body1" sx={{ ml: 2 }}>
                    {t('common.loading')}
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error" sx={{ mb: 3 }}>
                    {t('services.load_error')}
                </Alert>
                <Button
                    variant="contained"
                    onClick={() => window.location.reload()}
                    sx={{ width: '100%', maxWidth: 200 }}
                >
                    {t('common.refresh')}
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 8, px: { xs: 2, md: 8 } }}>
            <Typography
                variant="h2"
                align="center"
                gutterBottom
                sx={{
                    fontWeight: 700,
                    mb: 6,
                    color: theme.palette.text.primary,
                    fontSize: { xs: '2rem', md: '2.5rem' }
                }}
            >
                {t('services')}
            </Typography>

            <Tabs
                value={category}
                onChange={(e, newValue) => setCategory(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    mb: 6,
                    '& .MuiTabs-flexContainer': {
                        justifyContent: 'center',
                        flexWrap: 'nowrap',
                    },
                    '& .MuiTabs-indicator': {
                        height: 4,
                    },
                    '& .MuiTab-root': {
                        fontSize: '1rem',
                        fontWeight: 600,
                        minWidth: 'unset',
                        px: 2,
                        mx: 1,
                        flexShrink: 0
                    },
                    '& .MuiTabScrollButton-root': {
                        position: 'absolute',
                        '&:first-of-type': {
                            left: 0,
                            background: `linear-gradient(90deg, ${theme.palette.background.default} 50%, transparent)`
                        },
                        '&:last-of-type': {
                            right: 0,
                            background: `linear-gradient(270deg, ${theme.palette.background.default} 50%, transparent)`
                        }
                    }
                }}
                allowScrollButtonsMobile
            >
                {SERVICE_CATEGORIES.map(({ key, labelKey }) => (
                    <Tab
                        key={key}
                        label={t(`${key}`)} // Assurez-vous que les clés de traduction existent
                        value={key} // Utilisez la clé réelle comme valeur
                    />
                ))}
            </Tabs>

            {filteredServices.length > 0 ? (
                <Grid container spacing={4}>
                    {filteredServices.map((service) => (
                        <Grid item xs={12} sm={6} md={4} key={service.id}>
                            <Card sx={styles.card}>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={service.image || '/images/service-placeholder.jpg'}
                                    alt={service.name}
                                    sx={styles.cardMedia}
                                />

                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                                        {service.name}
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        paragraph
                                        sx={{ mb: 2, minHeight: 60 }}
                                    >
                                        {service.description}
                                    </Typography>

                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mt: 'auto'
                                    }}>
                                        <Button
                                            startIcon={<PlayCircleOutline />}
                                            onClick={() => handleServiceClick(service.id)}
                                            sx={{
                                                textTransform: 'none',
                                                fontWeight: 600
                                            }}
                                        >
                                            {t('see details')}
                                        </Button>

                                        <Box sx={styles.priceTag}>
                                            {t('starting price', { price: service.price })}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{
                    textAlign: 'center',
                    py: 4,
                    border: `1px dashed ${theme.palette.divider}`,
                    borderRadius: 2
                }}>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                        {t('services.no_services_found')}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        {category === 'all'
                            ? t('services.no_services_available')
                            : t('services.no_services_in_category')}
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() => setCategory('all')}
                        sx={{ mr: 2 }}
                    >
                        {t('services.view_all')}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => window.location.reload()}
                    >
                        {t('common.refresh')}
                    </Button>
                </Box>
            )}
        </Box>
    );
}