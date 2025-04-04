// assets/src/components/dashboard/owner/FinancialOverview.jsx

import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    LinearProgress,
    useTheme,
} from '@mui/material';
import {
    TrendingUp,
    TrendingDown,
    Equalizer
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StatBox = ({ title, value, trend }) => {
    const theme = useTheme();

    const TrendIcon =
        trend === 'up' ? TrendingUp :
            trend === 'down' ? TrendingDown :
                Equalizer;

    const color =
        trend === 'up' ? theme.palette.success.main :
            trend === 'down' ? theme.palette.error.main :
                theme.palette.text.secondary;

    return (
        <Box
            sx={{
                p: 2,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: theme.shadows[3]
                }
            }}
        >
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendIcon sx={{ color, mr: 1 }} />
                <Typography variant="h5" sx={{ color, fontWeight: 600 }}>
                    {value}
                </Typography>
            </Box>
        </Box>
    );
};

export default function FinancialOverview({ finances = {} }) {
    const theme = useTheme();

    const distribution = finances.paymentDistribution || [];
    const chartData = finances.monthlyStats || [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card sx={{ borderRadius: 4, boxShadow: theme.shadows[2] }}>
                <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                        Financial Overview
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6}>
                            <StatBox
                                title="Total Revenue"
                                value={`€${(finances.totalRevenue || 0).toLocaleString()}`}
                                trend="up"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StatBox
                                title="Expenses"
                                value={`€${(finances.expenses || 0).toLocaleString()}`}
                                trend="down"
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ p: 2, bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100', borderRadius: 3, mb: 3 }}>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                            Payment Distribution
                        </Typography>
                        {distribution.map((item) => (
                            <Box key={item.name} sx={{ mb: 2 }}>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
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

                    <Box>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                            Revenue & Expenses Over Time
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => `€${value}`} />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#4caf50" name="Revenue" />
                                <Line type="monotone" dataKey="expenses" stroke="#f44336" name="Expenses" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
}