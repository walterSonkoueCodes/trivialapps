import { Container, Grid, Typography, Card, CardContent, Box } from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const features = [
    {
        title: "Custom Development",
        icon: "💻",
        description: "Tailored solutions designed to meet your specific needs"
    },
    {
        title: "Innovative Design",
        icon: "🎨",
        description: "Modern and intuitive interfaces for an optimal user experience"
    },
    {
        title: "24/7 Support",
        icon: "🛠️",
        description: "A dedicated team available at all times to support you"
    }
];

const FeatureCard = ({ title, icon, description }) => (
    <Grid item xs={12} md={4}>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
        >
            <Card sx={{
                height: '100%',
                background: 'transparent',
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'divider'
            }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ mb: 2 }}>
                        {icon}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </motion.div>
    </Grid>
);

FeatureCard.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default function FeaturesSection() {
    return (
        <Box sx={{
            py: 8,
            backgroundColor: 'background.paper'
        }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h3"
                    align="center"
                    gutterBottom
                    sx={{ mb: 6 }}
                >
                    Why Choose Us?
                </Typography>

                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            title={feature.title}
                            icon={feature.icon}
                            description={feature.description}
                        />
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
