import { Box, Typography, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';
import heroBackground from '../../../images/hero-bg.png'; // Chemin relatif

const HeroSection = () => {

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
                            Créez votre présence digitale
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 5,
                                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                            }}
                        >
                            Des solutions sur mesure pour propulser votre entreprise
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            component={motion.a}
                            href="/contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            sx={{
                                px: 6,
                                py: 2,
                                fontSize: '1.1rem',
                                backgroundColor: theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark
                                }
                            }}
                        >
                            Demander un devis
                        </Button>
                    </Box>
                </Box>
            </Parallax>
        );

};

export default HeroSection;