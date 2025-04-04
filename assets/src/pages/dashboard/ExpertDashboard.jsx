import React, { useEffect, useState } from 'react';
import ExpertEarnings from '../../components/dashboard/expert/ExpertEarnings';
import ProjectsProgress from '../../components/dashboard/expert/ProjectsProgress';
import { Box, Grid, Typography } from '@mui/material';
import ProjectsGrid from '../../components/dashboard/expert/ProjectsGrid';
import { useAuth } from '../../context/AuthContext';
import TaskList from '../../components/dashboard/expert/ProjectsList';
import ExpertCharts from '../../components/dashboard/expert/ExpertCharts';
import ApiService from '../../api/apiService';
import ProjectList from "../../components/dashboard/expert/ProjectsList";
import ProjectsList from "../../components/dashboard/expert/ProjectsList";

export default function ExpertDashboard() {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiService.get(`api/experts/dashboard/${user.id}`);
                console.log("expert dashboardData: ", response.data);
                setDashboardData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };
        fetchData();
    }, [user.id]);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <ExpertEarnings
                    earnings={dashboardData?.earnings}
                    pendingPayments={dashboardData?.pendingPayments}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <ProjectsProgress projects={dashboardData?.assignedProjects} />
            </Grid>

            <Grid item xs={12}>
                <ProjectsList projects={dashboardData?.currentProjects} />
            </Grid>

            <Grid item xs={12}>
                <ProjectsGrid projects={dashboardData?.assignedProjects} />
            </Grid>

            <Grid item xs={12}>
                <ExpertCharts
                    projectStats={dashboardData?.assignedProjects || []}
                    expertises={dashboardData?.expertises || []}
                />
            </Grid>
        </Grid>

    );
}
