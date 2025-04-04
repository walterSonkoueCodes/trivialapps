// assets/src/components/dashboard/owner/GlobalStats.jsx

import React from 'react';
import { Card, CardContent, Grid, Typography, useTheme, Box } from '@mui/material';
import {
    People,
    MonetizationOn,
    AssignmentTurnedIn,
    PendingActions
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StatCard = ({ icon, title, value, color }) => {
    const theme = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card
                sx={{
                    height: '100%',
                    borderRadius: 4,
                    boxShadow: theme.shadows[3],
                    transition: 'transform 0.2s',
                    '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: theme.shadows[6],
                    },
                }}
            >
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            {icon && React.cloneElement(icon, {
                                sx: { fontSize: 40, color }
                            })}
                        </Grid>
                        <Grid item xs>
                            <Typography variant="subtitle2" color="text.secondary">
                                {title}
                            </Typography>
                            <Typography variant="h4" fontWeight={600}>
                                {value}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default function GlobalStats({ stats = {} }) {
    const theme = useTheme();
    const chartData = stats.monthlyStats || [];

    return (
        <>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        icon={<People />}
                        title="Users"
                        value={stats.users ?? 0}
                        color="#3f51b5"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        icon={<MonetizationOn />}
                        title="Revenue"
                        value={`€${(stats.revenue ?? 0).toLocaleString()}`}
                        color="#4caf50"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        icon={<AssignmentTurnedIn />}
                        title="Projects"
                        value={stats.projects ?? 0}
                        color="#ff9800"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        icon={<PendingActions />}
                        title="Pending"
                        value={stats.pending ?? 0}
                        color="#f44336"
                    />
                </Grid>
            </Grid>

            {chartData.length > 0 && (
                <Card sx={{ borderRadius: 4, boxShadow: theme.shadows[2] }}>
                    <CardContent>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                            Monthly Revenue & Projects
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={chartData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => `€${value}`} />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#4caf50" name="Revenue" />
                                <Line type="monotone" dataKey="projects" stroke="#2196f3" name="Projects" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            )}
        </>
    );
}
