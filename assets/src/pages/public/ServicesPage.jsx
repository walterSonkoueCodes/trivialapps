import { Tabs, Tab, Grid, Typography, Card, CardContent } from '@mui/material';
import { useState } from 'react';
import useServices from '../../hooks/useServices';

export default function ServicesPage() {
    const [category, setCategory] = useState('all');
    const { services, loading } = useServices();

    const filteredServices = category === 'all'
        ? services
        : services.filter(service => service.category === category);

    return (
        <div>
            <Typography variant="h2" align="center" gutterBottom>
                Nos Solutions
            </Typography>

            <Tabs
                value={category}
                onChange={(e, newValue) => setCategory(newValue)}
                centered
                sx={{ mb: 4 }}
            >
                <Tab label="Tous" value="all" />
                <Tab label="Web" value="web" />
                <Tab label="Mobile" value="mobile" />
                <Tab label="Design" value="design" />
            </Tabs>

            <Grid container spacing={3}>
                {filteredServices.map((service) => (
                    <Grid item xs={12} sm={6} md={4} key={service.id}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {service.name}
                                </Typography>
                                <Typography color="text.secondary" paragraph>
                                    {service.description}
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    À partir de {service.price}€
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}