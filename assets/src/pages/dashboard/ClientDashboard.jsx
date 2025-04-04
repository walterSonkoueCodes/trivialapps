// assets/src/pages/dashboard/ClientDashboard.jsx

import { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import ClientStats from '../../components/dashboard/client/ClientStats';
import ProjectTimeline from '../../components/dashboard/client/ProjectTimeline';
import InvoiceList from '../../components/dashboard/client/InvoiceList';
import ApiService from '../../api/apiService';

export default function ClientDashboard() {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiService.get(`/api/clients/dashboard/${user.id}`);
                console.log("user data dashboard: ", response.data);
                setDashboardData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };
        fetchData();
    }, [user.id]);

    return (
        <Box sx={{ flexGrow: 1, p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Client Dashboard
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <ClientStats
                        projects={dashboardData?.projects}
                        invoices={dashboardData?.invoices}
                    />
                </Grid>

                <Grid item xs={12} md={8}>
                    <ProjectTimeline  projects={dashboardData?.projects} />
                </Grid>

                <Grid item xs={12}>
                    <InvoiceList invoices={dashboardData?.invoices} />
                </Grid>
            </Grid>
        </Box>
    );
}
