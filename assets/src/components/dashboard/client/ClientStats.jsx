import { Card, CardContent, Grid, Typography, Box, LinearProgress } from '@mui/material';
import { Assignment, Paid, HourglassEmpty, Warning } from '@mui/icons-material';

export default function ClientStats({ projects = [], invoices = [] }) {
    const paidInvoices = invoices.filter(i => i.status === 'paid').length;
    const pendingInvoices = invoices.filter(i => i.status === 'pending').length;
    const overdueInvoices = invoices.filter(i => i.status === 'overdue').length;
    const activeProjects = projects.filter(p => p.status !== 'completed').length;

    const getProgress = (count, total) => total ? Math.round((count / total) * 100) : 0;

    return (
        <Card sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Client Overview
                </Typography>

                <Grid container spacing={3}>
                    {/* Active Projects */}
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Assignment color="primary" />
                            <Box>
                                <Typography variant="body2">Active Projects</Typography>
                                <Typography variant="h6">{activeProjects}</Typography>
                            </Box>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={getProgress(activeProjects, projects.length)}
                            sx={{ mt: 1, height: 8, borderRadius: 5 }}
                        />
                    </Grid>

                    {/* Paid Invoices */}
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Paid color="success" />
                            <Box>
                                <Typography variant="body2">Invoices Paid</Typography>
                                <Typography variant="h6">{paidInvoices}</Typography>
                            </Box>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={getProgress(paidInvoices, invoices.length)}
                            color="success"
                            sx={{ mt: 1, height: 8, borderRadius: 5 }}
                        />
                    </Grid>

                    {/* Pending Invoices */}
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <HourglassEmpty color="warning" />
                            <Box>
                                <Typography variant="body2">Invoices Pending</Typography>
                                <Typography variant="h6">{pendingInvoices}</Typography>
                            </Box>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={getProgress(pendingInvoices, invoices.length)}
                            color="warning"
                            sx={{ mt: 1, height: 8, borderRadius: 5 }}
                        />
                    </Grid>

                    {/* Overdue Invoices */}
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Warning color="error" />
                            <Box>
                                <Typography variant="body2">Overdue Invoices</Typography>
                                <Typography variant="h6">{overdueInvoices}</Typography>
                            </Box>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={getProgress(overdueInvoices, invoices.length)}
                            color="error"
                            sx={{ mt: 1, height: 8, borderRadius: 5 }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
