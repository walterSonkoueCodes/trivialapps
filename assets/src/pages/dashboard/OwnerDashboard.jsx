// assets/src/pages/dashboard/OwnerDashboard.jsx

import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import ApiService from '../../api/apiService';
import { motion } from 'framer-motion';

import FinancialOverview from '../../components/dashboard/owner/FinancialOverview';
import UsersManagement from '../../components/dashboard/owner/UsersManagement';
import GlobalStats from '../../components/dashboard/owner/GlobalStats';
import AllProjectsList from '../../components/dashboard/owner/AllProjectsList';

export default function OwnerDashboard() {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiService.get(`api/owner/dashboard/${user.id}`);
                console.log("Owner Dashboard Data:", response.data);
                setDashboardData(response.data);
            } catch (error) {
                console.error("Error fetching owner dashboard data:", error);
            }
        };
        fetchData();
    }, [user.id]);

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <Box sx={{ p: 4 }}>
            <motion.div initial="initial" animate="animate" variants={fadeIn}>
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                    System Management
                </Typography>
            </motion.div>

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <motion.div initial="initial" animate="animate" variants={fadeIn}>
                        <GlobalStats stats={dashboardData?.systemStats} />
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={6}>
                    <motion.div initial="initial" animate="animate" variants={fadeIn}>
                        <FinancialOverview finances={dashboardData?.financials} />
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={6}>
                    <motion.div initial="initial" animate="animate" variants={fadeIn}>
                        <UsersManagement users={dashboardData?.allUsers} enableActions={true} />
                    </motion.div>
                </Grid>

                <Grid item xs={12}>
                    <motion.div initial="initial" animate="animate" variants={fadeIn}>
                        <AllProjectsList projects={dashboardData?.allProjects || []} />
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
}
