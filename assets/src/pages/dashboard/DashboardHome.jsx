import { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import ApiService from '../../api/apiService';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ProjectProgressChart from '../../components/dashboard/ProjectProgressChart';

export default function DashboardHome() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiService.get('/dashboard');
                setDashboardData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message={error} />;

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Tableau de bord
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Projets en cours
                            </Typography>
                            <ProjectProgressChart projects={dashboardData.activeProjects} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Dernières factures
                            </Typography>
                            <InvoiceList invoices={dashboardData.recentInvoices} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}