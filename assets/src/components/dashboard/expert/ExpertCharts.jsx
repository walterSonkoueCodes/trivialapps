import { Card, CardContent, Typography, Grid, useTheme } from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
    Cell,
    PieChart,
    Pie,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar
} from 'recharts';

// Couleurs personnalisées avec dégradés
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function ExpertCharts({ projectStats, expertises}) {
    const theme = useTheme();

    // Préparation des données
    const timeData = projectStats?.map(p => ({
        name: p.title.substring(0, 15) + (p.title.length > 15 ? '...' : ''),
        hours: p.estimated_working_hours || 0,
        earnings: p.earnings || 0
    }));

    return (
        <Grid container spacing={3}>
            {/* Graphique circulaire pour répartition */}
            <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 4, boxShadow: theme.shadows[4] }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Breakdown of earnings
                        </Typography>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={timeData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="earnings"
                                    nameKey="name"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    animationDuration={1500}
                                    animationEasing="ease-out"
                                >
                                    {timeData?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => [`${value} €`, 'Montant']}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>

            {/* Graphique radar des compétences */}
            <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%', borderRadius: 4, boxShadow: theme.shadows[4] }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Core competencies
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={expertises}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                <Radar
                                    name="Niveau"
                                    dataKey="A"
                                    stroke="#FF8042"
                                    fill="#FFBB28"
                                    fillOpacity={0.6}
                                    animationDuration={1500}
                                />
                                <Legend />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>

            {/* Graphique à barres empilées */}
            <Grid item xs={12}>
                <Card sx={{ height: '100%', borderRadius: 4, boxShadow: theme.shadows[4] }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Cost vs. earnings per project
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={timeData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    angle={-45}
                                    textAnchor="end"
                                    height={60}
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) => [`${value}`, value === 'hours' ? 'Heures' : '€']}
                                    labelStyle={{ fontWeight: 'bold' }}
                                />
                                <Legend />
                                <Bar
                                    dataKey="hours"
                                    name="Heures travaillées"
                                    fill="#8884d8"
                                    animationDuration={1500}
                                >
                                    {timeData?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                                <Bar
                                    dataKey="earnings"
                                    name="Gains (€)"
                                    fill="#82ca9d"
                                    animationDuration={1500}
                                >
                                    {timeData?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}