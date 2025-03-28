import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Chip,
    Box,
    CircularProgress,
    Alert,
    Rating,
    Button,
    Pagination,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import useExperts from "../../hooks/useExperts";

export default function ExpertsPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const { experts, totalExperts, loading, error } = useExperts(page, pageSize);

    // Scroll vers le haut quand la page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page, pageSize]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1); // Reset à la première page quand on change le nombre d'items par page
    };

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh'
            }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    Error when loading experts : {error}
                </Alert>
                <Button
                    variant="contained"
                    onClick={() => window.location.reload()}
                >
                    Try again
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
                mb: 4
            }}>
                <Typography variant="h4" component="h1">
                    Our experts
                </Typography>

                {totalExperts > 0 && (
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Results/page</InputLabel>
                        <Select
                            value={pageSize}
                            label="Results/page"
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

            {experts?.length === 0 ? (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '40vh'
                }}>
                    <Typography variant="h6" color="text.secondary">
                        No experts found
                    </Typography>
                </Box>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {experts?.map((expert) => (
                            <Grid item xs={12} sm={6} md={4} key={expert.id}>
                                <Card sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 6
                                    }
                                }}>
                                    <CardMedia
                                        component="img"
                                        height="240"
                                        image={expert.photo_url || '/images/experts/default-expert.png'}
                                        alt={expert.full_name}
                                        sx={{
                                            objectFit: 'cover',
                                            width: '100%',               // s'assure que l'image ne dépasse pas
                                            maxHeight: 240,              // limite la hauteur visuelle
                                            borderBottom: '1px solid',
                                            borderColor: 'divider',
                                            aspectRatio: '4 / 3',        // garde un ratio cohérent
                                            backgroundColor: '#f5f5f5'   // fallback visuel
                                        }}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {expert.full_name}
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Rating
                                                value={Number(expert.score) || 0}
                                                precision={0.5}
                                                readOnly
                                                size="small"
                                                sx={{ mr: 1 }}
                                            />
                                            <Typography variant="body2" color="text.secondary">
                                                ({Number(expert.score)?.toFixed(1)})
                                            </Typography>
                                        </Box>

                                        <Box sx={{ mb: 2 }}>
                                            {expert.expertises?.slice(0, 3).map((skill, index) => (
                                                <Chip
                                                    key={index}
                                                    label={skill}
                                                    size="small"
                                                    sx={{
                                                        mr: 1,
                                                        mb: 1,
                                                        backgroundColor: 'primary.light',
                                                        color: 'white'
                                                    }}
                                                />
                                            ))}
                                        </Box>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            paragraph
                                            sx={{ mb: 2 }}
                                        >
                                            {expert.bio?.substring(0, 100)}{expert.bio?.length > 100 ? '...' : ''}
                                        </Typography>

                                        <Box sx={{ mt: 'auto', pt: 2 }}>
                                            <Button
                                                component={Link}
                                                to={`/experts/${expert.id}`}
                                                variant="contained"
                                                fullWidth
                                                sx={{
                                                    backgroundColor: 'primary.main',
                                                    '&:hover': {
                                                        backgroundColor: 'primary.dark'
                                                    }
                                                }}
                                            >
                                                See profile
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {totalExperts > 0 && (
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
                                count={Math.ceil(totalExperts / pageSize)}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                shape="rounded"
                                size="large"
                                sx={{ ul: { justifyContent: 'center' } }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                Affichage de {(page - 1) * pageSize + 1} à {Math.min(page * pageSize, totalExperts)} sur {totalExperts} experts
                            </Typography>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}