import React, { useState } from 'react';
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
    Alert,
    Pagination,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { PlayCircleOutline } from '@mui/icons-material';
import useServices from '../../hooks/useServices';

export default function ServicesPage() {
    const [category, setCategory] = useState('all');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const { services, totalServices, loading, error } = useServices(page, pageSize, category);
    const navigate = useNavigate();
    const theme = useTheme();

    const handleCategoryChange = (event, newValue) => {
        setCategory(newValue);
        setPage(1);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    const handleServiceClick = (service) => {
        navigate(`/services/${service.id}`, {
            state: { service }
        });
    };

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
        { key: 'all', label: 'All' },
        { key: 'web', label: 'Web Development' },
        { key: 'mobile', label: 'Mobile Apps' },
        { key: 'design', label: 'Design' },
        { key: 'data_science', label: 'Data Science' },
        { key: 'video_editing', label: 'Video Editing' },
        { key: 'sketching', label: 'Sketching' }
    ];

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                flexDirection: 'column'
            }}>
                <CircularProgress size={60} />
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Loading services...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error" sx={{ mb: 3 }}>
                    Failed to load services: {error.message}
                </Alert>
                <Button
                    variant="contained"
                    onClick={() => window.location.reload()}
                    sx={{ width: '100%', maxWidth: 200 }}
                >
                    Refresh Page
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 8, px: { xs: 2, md: 8 } }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
                mb: 4
            }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        fontSize: { xs: '2rem', md: '2.5rem' }
                    }}
                >
                    Our Services
                </Typography>

                {totalServices > 0 && (
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Results per page</InputLabel>
                        <Select
                            value={pageSize}
                            label="Results per page"
                            onChange={handlePageSizeChange}
                        >
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                            <MenuItem value={24}>24</MenuItem>
                        </Select>
                    </FormControl>
                )}
            </Box>

            <Tabs
                value={category}
                onChange={handleCategoryChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    mb: 6,
                    '& .MuiTabs-flexContainer': {
                        justifyContent: 'center',
                        flexWrap: 'wrap',
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
                    }
                }}
                allowScrollButtonsMobile
            >
                {SERVICE_CATEGORIES.map(({ key, label }) => (
                    <Tab
                        key={key}
                        label={label}
                        value={key}
                    />
                ))}
            </Tabs>

            {services.length > 0 ? (
                <>
                    <Grid container spacing={4}>
                        {services.map((service) => (
                            <Grid item xs={12} sm={6} md={4} key={service.id}>
                                <Card sx={styles.card}>
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image={service.image || '/images/services/service-placeholder.png'}
                                        alt={service.name}
                                        sx={styles.cardMedia}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography
                                            variant="h5"
                                            gutterBottom
                                            sx={{
                                                fontWeight: 600,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                minHeight: '3em',
                                                lineHeight: 1.2
                                            }}
                                        >
                                            {service.name}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            paragraph
                                            sx={{
                                                mb: 2,
                                                minHeight: '4.5em',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical'
                                            }}
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
                                                onClick={() => handleServiceClick(service)}
                                                sx={{
                                                    textTransform: 'none',
                                                    fontWeight: 600
                                                }}
                                            >
                                                View Details
                                            </Button>
                                            <Box sx={styles.priceTag}>
                                                Starting at ${service.price}
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {totalServices > pageSize && (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 4,
                            pb: 4,
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2
                        }}>
                            <Pagination
                                count={Math.ceil(totalServices / pageSize)}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                shape="rounded"
                                size="large"
                                sx={{ ul: { justifyContent: 'center' } }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, totalServices)} of {totalServices} services
                            </Typography>
                        </Box>
                    )}
                </>
            ) : (
                <Box sx={{
                    textAlign: 'center',
                    py: 4,
                    border: `1px dashed ${theme.palette.divider}`,
                    borderRadius: 2
                }}>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                        No services found
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        {category === 'all'
                            ? 'There are currently no services available'
                            : `No services found in the ${category} category`}
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() => setCategory('all')}
                        sx={{ mr: 2 }}
                    >
                        View All Categories
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => window.location.reload()}
                    >
                        Refresh Page
                    </Button>
                </Box>
            )}
        </Box>
    );
}