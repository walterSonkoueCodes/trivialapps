import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

export default function SkillsChart({ expertises }) {
    const data = expertises.map(skill => ({
        subject: skill,
        A: Math.floor(Math.random() * 100) + 50, // Valeurs aléatoires pour l'exemple
        fullMark: 100
    }));

    return (
        <Box sx={{ mt: 4, height: 300 }}>
            <Typography variant="h6" gutterBottom>
                Niveau de compétences
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <Radar
                        name="Compétences"
                        dataKey="A"
                        stroke="#F05D5E"
                        fill="#F05D5E"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </Box>
    );
}