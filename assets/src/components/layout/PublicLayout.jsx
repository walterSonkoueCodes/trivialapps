// src/components/layout/PublicLayout.jsx
import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Container,
    Box,
    Typography,
    Button,
    useTheme,
    styled,
    Grid,
    Divider
} from '@mui/material';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme as useAppTheme } from '../../context/ThemeContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    transition: theme.transitions.create(['background-color', 'color'], {
        duration: theme.transitions.duration.standard,
    }),
}));

const NavLink = styled(RouterLink)(({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: 'none',
    margin: theme.spacing(0, 2),
    transition: theme.transitions.create('color'),
    '&:hover': {
        color: theme.palette.primary.main,
    },
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const FooterLink = styled(RouterLink)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    '&:hover': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
    },
}));

const LogoImage = styled('img')({
    height: '40px',
    width: 'auto',
});

const PublicLayout = () => {
    const { darkMode } = useAppTheme();
    const theme = useTheme();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: theme.palette.background.default
        }}>
            <StyledAppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <NavLink to="/">
                            <LogoImage
                                src="/images/logo.svg"
                                alt="TrivialApps Logo"
                                loading="lazy"
                            />
                            <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
                                TrivialApps
                            </Typography>
                        </NavLink>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ThemeToggle />
                            <NavLink to="/services">Services</NavLink>
                            <NavLink to="/experts">Experts</NavLink>
                            <Button
                                component={RouterLink}
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

            <Box component="main" sx={{ flex: 1, py: 4 }}>
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
                    mt: 'auto',
                    transition: theme.transitions.create(['background-color', 'border-color']),
                }}
            >
                <Container maxWidth="xl">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom>
                                TrivialApps
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Votre partenaire en développement digital
                            </Typography>
                        </Grid>

                        <Grid item xs={6} md={2}>
                            <Typography variant="subtitle1" gutterBottom>
                                Entreprise
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <FooterLink to="/about">À propos</FooterLink>
                                <FooterLink to="/team">Notre équipe</FooterLink>
                                <FooterLink to="/contact">Contact</FooterLink>
                            </Box>
                        </Grid>

                        <Grid item xs={6} md={2}>
                            <Typography variant="subtitle1" gutterBottom>
                                Légale
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <FooterLink to="/legal/terms">Conditions d'utilisation</FooterLink>
                                <FooterLink to="/legal/privacy">Politique de confidentialité</FooterLink>
                                <FooterLink to="/legal/cookies">Préférences cookies</FooterLink>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" gutterBottom>
                                Ressources
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <FooterLink to="/blog">Blog</FooterLink>
                                <FooterLink to="/documentation">Documentation</FooterLink>
                                <FooterLink to="/faq">FAQ</FooterLink>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        <Typography variant="body2" color="text.secondary">
                            © {new Date().getFullYear()} TrivialApps. Tous droits réservés.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <FooterLink to="/legal/terms">Mentions légales</FooterLink>
                            <FooterLink to="/legal/privacy">Confidentialité</FooterLink>
                            <FooterLink to="/sitemap">Plan du site</FooterLink>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default PublicLayout;