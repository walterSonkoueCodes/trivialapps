// src/components/layout/PublicLayout.jsx
import { Outlet, Link } from 'react-router-dom';
import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Typography,
    Toolbar,
    useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';


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

export default function PublicLayout() {
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

                        <Box>
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
                    <Outlet /> {/* Contenu des pages publiques */}
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
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                                TrivialApps
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Votre partenaire en développement digital
                            </Typography>
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <Typography variant="subtitle1" gutterBottom>
                                Légale
                            </Typography>
                            <Link to="/legal" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography variant="body2" color="textSecondary">
                                    Mentions légales
                                </Typography>
                            </Link>
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <Typography variant="subtitle1" gutterBottom>
                                Contact
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                contact@trivialapps.net
                            </Typography>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 4, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                        <Typography variant="body2" color="textSecondary" align="center">
                            © {new Date().getFullYear()} TrivialApps. Tous droits réservés.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}