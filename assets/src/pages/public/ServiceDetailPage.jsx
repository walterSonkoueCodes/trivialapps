import { useState } from 'react';
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
    Skeleton
} from '@mui/material';
import { PlayCircleOutline } from '@mui/icons-material';
import useServices from '../../hooks/useServices';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const cardVariants = {
    offscreen: { y: 20, opacity: 0 },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", bounce: 0.4, duration: 0.8 }
    }
};

export default function ServicesPage() {
    const [category, setCategory] = useState('all');
    const { services, loading } = useServices();
    const navigate = useNavigate();
    const theme = useTheme();
    const { t } = useTranslation();

    const filteredServices = category === 'all'
        ? services
        : services.filter(service => service.category === category);

    const handleServiceClick = (serviceId) => {
        navigate(`/services/${serviceId}`);
    };

    return (
        <Box sx={{
            py: 8,
            px: { xs: 2, md: 8 },
            minHeight: '100vh',
            background: theme.palette.background.default
        }}>
            <Typography
                variant="h2"
                align="center"
                gutterBottom
                sx={{
                    fontWeight: 700,
                    mb: 6,
                    color: theme.palette.text.primary,
                    fontSize: { xs: '2.5rem', md: '3rem' }
                }}
            >
                {t('services.title')}
            </Typography>

            <Tabs
                value={category}
                onChange={(e, newValue) => setCategory(newValue)}
                centered
                sx={{
                    mb: 6,
                    '& .MuiTabs-indicator': {
                        height: 4,
                        backgroundColor: theme.palette.primary.main
                    }
                }}
                variant="scrollable"
                scrollButtons="auto"
            >
                <Tab label={t('services.all')} value="all" />
                <Tab label={t('services.web')} value="web" />
                <Tab label={t('services.mobile')} value="mobile" />
                <Tab label={t('services.design')} value="design" />
            </Tabs>

            <Grid container spacing={4}>
                {(loading ? Array.from(new Array(6)) : filteredServices).map((service, index) => (
                    <Grid item xs={12} sm={6} md={4} key={service?.id || index}>
                        <motion.div
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={cardVariants}
                        >
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: theme.shadows[6]
                                    }
                                }}
                            >
                                {service ? (
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image={service.image || '/default-service.jpg'}
                                        alt={service.name}
                                        sx={{
                                            objectFit: 'cover',
                                            borderBottom: `4px solid ${theme.palette.primary.main}`
                                        }}
                                    />
                                ) : (
                                    <Skeleton variant="rectangular" height={240} />
                                )}

                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        sx={{ fontWeight: 600, minHeight: '64px' }}
                                    >
                                        {service?.name || <Skeleton />}
                                    </Typography>

                                    {service ? (
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            paragraph
                                            sx={{ mb: 2, minHeight: '80px' }}
                                        >
                                            {service.description}
                                        </Typography>
                                    ) : (
                                        <Box sx={{ mb: 2 }}>
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton width="60%" />
                                        </Box>
                                    )}

                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mt: 'auto'
                                    }}>
                                        {service ? (
                                            <>
                                                <Button
                                                    startIcon={<PlayCircleOutline />}
                                                    onClick={() => handleServiceClick(service.id)}
                                                    sx={{
                                                        textTransform: 'none',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {t('services.see_details')}
                                                </Button>

                                                <Typography
                                                    variant="h6"
                                                    color="primary"
                                                    sx={{ fontWeight: 700 }}
                                                >
                                                    {t('services.from_price', { price: service.price })}
                                                </Typography>
                                            </>
                                        ) : (
                                            <Skeleton width={180} height={40} />
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}