import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

export default function SkillsRadarChart({ expertises }) {
    const data = expertises.map(skill => ({
        subject: skill,
        level: Math.floor(Math.random() * 60) + 40, // Valeurs simulées
        fullMark: 100
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid gridType="circle" />
                <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#555', fontSize: 12 }}
                />
                <Radar
                    name="Compétences"
                    dataKey="level"
                    stroke="#F05D5E"
                    fill="#F05D5E"
                    fillOpacity={0.6}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
}