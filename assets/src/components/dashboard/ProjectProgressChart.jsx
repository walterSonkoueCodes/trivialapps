import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function ProjectProgressChart({ projects }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projects}>
                <Bar dataKey="progress" fill="#F05D5E" />
                <XAxis dataKey="title" />
                <YAxis />
            </BarChart>
        </ResponsiveContainer>
    );
}