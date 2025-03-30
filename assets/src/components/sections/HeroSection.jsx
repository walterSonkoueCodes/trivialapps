import { Box, Typography, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';
import heroBackground from '../../../images/hero-bg.png'; // Relative path

const HeroSection = ({isAuthenticated}) => {
    const theme = useTheme();

    return (
        <Parallax bgImage={heroBackground} strength={300}>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBackground})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: -1,
                        filter: 'brightness(0.8)',
                        backdropFilter: 'blur(2px)',
                        WebkitBackdropFilter: 'blur(2px)',
                    }
                }}
            >
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    sx={{
                        maxWidth: '800px',
                        mx: 'auto',
                        textAlign: 'center',
                        color: 'common.white',
                        px: 2,
                        py: 10
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            mb: 3,
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}
                    >
                        {isAuthenticated ? 'Welcome to TrivialApps' : 'Create your digital project'}
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 5,
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}
                    >
                        {isAuthenticated
                            ? 'Manage your projects and invoices with ease'
                            : 'Tailor-made solutions for your business'}
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        component={motion.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={isAuthenticated ? "/login" : "/login"}
                        sx={{
                            mr: isAuthenticated ? 2 : 0,
                            mb: { xs: 2, sm: 0 }
                        }}
                    >
                        {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                    </Button>
                </Box>
            </Box>
        </Parallax>
    );
};

export default HeroSection;
