import FinancialOverview from '../../components/dashboard/owner/FinancialOverview';

export default function OwnerDashboard() {
    // ... (structure similaire)

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Administration Système
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <GlobalStats
                        stats={dashboardData?.systemStats}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FinancialOverview
                        finances={dashboardData?.financials}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <UsersManagement
                        users={dashboardData?.recentUsers}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}