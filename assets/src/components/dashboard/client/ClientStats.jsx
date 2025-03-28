import { Card, CardContent, Grid, Typography, Box, LinearProgress } from '@mui/material';
import { Assignment, Paid, HourglassEmpty } from '@mui/icons-material';

export default function ClientStats({ projects = [], invoices = [] }) {
    const paidInvoices = invoices.filter(i => i.status === 'paid').length;
    const pendingInvoices = invoices.filter(i => i.status === 'pending').length;
    const activeProjects = projects.filter(p => p.status === 'in_progress').length;

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Statistiques
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Assignment color="primary" />
                            <Box>
                                <Typography variant="body2">Projets actifs</Typography>
                                <Typography variant="h6">{activeProjects}</Typography>
                            </Box>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={(activeProjects / projects.length) * 100}
                            sx={{ mt: 1 }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Paid color="success" />
                            <Box>
                                <Typography variant="body2">Factures payées</Typography>
                                <Typography variant="h6">{paidInvoices}</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <HourglassEmpty color="warning" />
                            <Box>
                                <Typography variant="body2">En attente</Typography>
                                <Typography variant="h6">{pendingInvoices}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}