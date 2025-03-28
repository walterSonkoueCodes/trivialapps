import React, { useEffect, useState } from 'react';
import ExpertEarnings from '../../components/dashboard/expert/ExpertEarnings';
import TaskProgress from '../../components/dashboard/expert/TaskProgress';
import { Box, Grid, Typography } from '@mui/material';
import ProjectsGrid from '../../components/dashboard/expert/ProjectsGrid';
import { useAuth } from '../../context/AuthContext';
import ApiService from '../../api/apiService';

export default function ExpertDashboard() {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiService.get(`/expert-dashboard/${user.id}`);
                setDashboardData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };
        fetchData();
    }, [user.id]);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Dashboard Expert
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <ExpertEarnings
                        earnings={dashboardData?.earnings}
                        pendingPayments={dashboardData?.pendingPayments}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TaskProgress
                        tasks={dashboardData?.currentTasks}
                    />
                </Grid>

                <Grid item xs={12}>
                    <ProjectsGrid
                        projects={dashboardData?.assignedProjects}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
