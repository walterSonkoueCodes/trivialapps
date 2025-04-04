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
    Divider,
    Avatar,
    Menu,
    MenuItem,
    IconButton
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    AccountCircle as AccountIcon,
    ExitToApp as LogoutIcon
} from '@mui/icons-material';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme as useAppTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

// Composants stylisés
const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    transition: 'all 0.3s ease',
}));

const NavLink = styled(RouterLink)(({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: 'none',
    margin: theme.spacing(0, 2),
    '&:hover': {
        color: theme.palette.primary.main,
    },
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const LogoImage = styled('img')({
    height: '40px',
    width: 'auto',
});

const PublicLayout = () => {
    const { darkMode } = useAppTheme();
    const { user, logout } = useAuth();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleMenuClose();
    };

    const getDashboardLink = () => {
        if (!user) return null;
        console.log("userdata: ", user)
        if (user.roles.includes('ROLE_OWNER')) {
            return '/owner-dashboard';
        } else if (user.roles.includes('ROLE_EXPERT')) {
            return '/expert-dashboard';
        } else if (user.roles.includes('ROLE_CLIENT')) {
            return '/client-dashboard';
        }
        return null;
    };

    const dashboardLink = getDashboardLink();

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

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <ThemeToggle />
                            <NavLink to="/services">Services</NavLink>
                            <NavLink to="/experts">Experts</NavLink>

                            {user ? (
                                <>
                                    {dashboardLink && (
                                        <Button
                                            component={RouterLink}
                                            to={dashboardLink}
                                            variant="outlined"
                                            startIcon={<DashboardIcon />}
                                            sx={{ ml: 2 }}
                                        >
                                            My Dashboard
                                        </Button>
                                    )}

                                    <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
                                        {user.expert_profile?.photo_url ? (
                                            <Avatar
                                                src={user.expert_profile.photo_url}
                                                alt={user.full_name}
                                            />
                                        ) : (
                                            <AccountIcon fontSize="large" />
                                        )}
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem disabled>
                                            <Typography variant="subtitle1">
                                                {user.full_name}
                                            </Typography>
                                        </MenuItem>
                                        <Divider />
                                        {dashboardLink && (
                                            <MenuItem
                                                component={RouterLink}
                                                to={dashboardLink}
                                                onClick={handleMenuClose}
                                            >
                                                <DashboardIcon sx={{ mr: 1 }} />
                                                Dashboard
                                            </MenuItem>
                                        )}
                                        <MenuItem onClick={handleLogout}>
                                            <LogoutIcon sx={{ mr: 1 }} />
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Button
                                    component={RouterLink}
                                    to="/login"
                                    variant="contained"
                                    sx={{ ml: 2 }}
                                >
                                    Login
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </StyledAppBar>

            <Box component="main" sx={{ flex: 1 }}>
                <Outlet />
            </Box>

            <Box component="footer" sx={{
                py: 4,
                backgroundColor: theme.palette.background.paper,
                borderTop: `1px solid ${theme.palette.divider}`
            }}>
                <Container maxWidth="xl">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom>
                                TrivialApps
                            </Typography>
                            <Typography variant="body2">
                                Your partner in digital development
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom>
                                Contact
                            </Typography>
                            <Typography variant="body2">
                                contact@trivialapps.net
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom>
                                Legal
                            </Typography>
                            <NavLink to="/legal">
                                Legal information
                            </NavLink>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 4, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                        <Typography variant="body2" align="center">
                            © {new Date().getFullYear()} TrivialApps. All rights reserved.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default PublicLayout;