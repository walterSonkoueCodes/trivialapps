// src/components/layout/PublicLayout.jsx
import { Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Container, Box, Typography, Button, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme as useAppTheme } from '../../context/ThemeContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
}));

const NavLink = styled(Link)(({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: 'none',
    margin: theme.spacing(0, 2),
    '&:hover': {
        color: theme.palette.primary.main,
    },
}));

const PublicLayout = () => {
    // Utilisation correcte du hook personnalisé
    const { darkMode, toggleTheme } = useAppTheme();
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <StyledAppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <NavLink to="/">
                            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                                TrivialApps
                            </Typography>
                        </NavLink>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ThemeToggle />
                            <NavLink to="/services">Services</NavLink>
                            <NavLink to="/experts">Experts</NavLink>
                            <Button
                                component={Link}
                                to="/login"
                                variant="contained"
                                sx={{ ml: 2 }}
                            >
                                Connexion
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </StyledAppBar>

            <Box component="main" sx={{ flex: 1, py: 8 }}>
                <Container maxWidth="xl">
                    <Outlet />
                </Container>
            </Box>

            <Box
                component="footer"
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    py: 4,
                    mt: 'auto'
                }}
            >
                <Container maxWidth="xl">
                    {/* Contenu du footer... */}
                </Container>
            </Box>
        </Box>
    );
};

export default PublicLayout;