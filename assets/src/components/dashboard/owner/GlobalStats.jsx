import { Card, CardContent, Grid, Typography } from '@mui/material';
import {
    People,
    MonetizationOn,
    AssignmentTurnedIn,
    PendingActions
} from '@mui/icons-material';

const StatCard = ({ icon, title, value, color }) => (
    <Card sx={{ height: '100%' }}>
        <CardContent>
            <Grid container spacing={2}>
                <Grid item>
                    {React.cloneElement(icon, {
                        sx: { fontSize: 40, color }
                    })}
                </Grid>
                <Grid item xs>
                    <Typography variant="h6" color="text.secondary">
                        {title}
                    </Typography>
                    <Typography variant="h4">
                        {value}
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default function GlobalStats({ stats }) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard
                    icon={<People />}
                    title="Utilisateurs"
                    value={stats?.users || 0}
                    color="#3f51b5"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard
                    icon={<MonetizationOn />}
                    title="Revenus"
                    value={`€${(stats?.revenue || 0).toLocaleString()}`}
                    color="#4caf50"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard
                    icon={<AssignmentTurnedIn />}
                    title="Projets"
                    value={stats?.projects || 0}
                    color="#ff9800"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard
                    icon={<PendingActions />}
                    title="En attente"
                    value={stats?.pending || 0}
                    color="#f44336"
                />
            </Grid>
        </Grid>
    );
}