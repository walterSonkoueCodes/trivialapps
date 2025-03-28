// src/components/sections/ServiceCarousel.jsx
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function ServiceCarousel({ services = [], loading }) {
    if (loading) {
        return <Typography>Chargement des services...</Typography>;
    }

    if (!services || services.length === 0) {
        return <Typography>Aucun service disponible pour le moment</Typography>;
    }

    return (
        <Box sx={{ /* styles du carousel */ }}>
            {services.map(service => (
                <ServiceCard key={service.id} service={service} />
            ))}
        </Box>
    );
}

ServiceCarousel.propTypes = {
    services: PropTypes.array,
    loading: PropTypes.bool
};