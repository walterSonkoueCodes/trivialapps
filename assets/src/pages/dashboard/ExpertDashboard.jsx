import ExpertEarnings from '../../components/dashboard/expert/ExpertEarnings';
import TaskProgress from '../../components/dashboard/expert/TaskProgress';

export default function ExpertDashboard() {
    // ... (structure similaire au client)

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