import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

export default function HeroSection() {
    const theme = useTheme();

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.palette.background.default,
            transition: 'background-color 0.3s ease'
        }}>
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography variant="h1" sx={{ fontSize: '4rem', mb: 3 }}>
                        Créons votre projet digital ensemble
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ px: 6, py: 2 }}
                    >
                        Commencer maintenant
                    </Button>
                </motion.div>
            </Container>
        </Box>
    );
}