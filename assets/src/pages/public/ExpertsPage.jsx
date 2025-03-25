import { Grid, Typography, Card, CardMedia, CardContent, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useExperts from '../../hooks/useExperts';

export default function ExpertsPage() {
    const { experts, loading, error } = useExperts();
    const theme = useTheme();

    return (
        <div style={{ padding: theme.spacing(4) }}>
            <Typography variant="h2" gutterBottom align="center">
                Notre Équipe d'Experts
            </Typography>

            <Grid container spacing={4}>
                {experts.map((expert) => (
                    <Grid item xs={12} sm={6} md={4} key={expert.id}>
                        <Card sx={{ height: '100%' }}>
                            <CardMedia
                                component="img"
                                height="240"
                                image={expert.photoUrl}
                                alt={expert.fullName}
                            />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {expert.fullName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {expert.bio}
                                </Typography>
                                <div>
                                    {expert.expertise.map((skill) => (
                                        <Chip
                                            key={skill}
                                            label={skill}
                                            size="small"
                                            sx={{ m: 0.5 }}
                                            color="primary"
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}