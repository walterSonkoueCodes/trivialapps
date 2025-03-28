import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { TrendingUp, TrendingDown, Equalizer } from '@mui/icons-material';

const StatBox = ({ title, value, trend, icon }) => {
    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Equalizer;
    const color = trend === 'up' ? 'success.main' : trend === 'down' ? 'error.main' : 'text.secondary';

    return (
        <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
                {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendIcon sx={{ color, mr: 1 }} />
                <Typography variant="h5" sx={{ color }}>
                    {value}
                </Typography>
            </Box>
        </Box>
    );
};

export default function FinancialOverview({ finances }) {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Aperçu Financier
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6}>
                        <StatBox
                            title="Revenus Totaux"
                            value={`€${(finances?.totalRevenue || 0).toLocaleString()}`}
                            trend="up"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <StatBox
                            title="Dépenses"
                            value={`€${(finances?.expenses || 0).toLocaleString()}`}
                            trend="down"
                        />
                    </Grid>
                </Grid>

                <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Répartition des Paiements
                    </Typography>

                    {(finances?.paymentDistribution || []).map((item) => (
                        <Box key={item.name} sx={{ mb: 1 }}>
                            <Typography variant="body2">
                                {item.name}: {item.value}%
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={item.value}
                                sx={{ height: 8, borderRadius: 4 }}
                            />
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}