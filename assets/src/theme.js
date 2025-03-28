import { createTheme } from '@mui/material/styles';

export const getAppTheme = (isDark) => createTheme({
    palette: {
        mode: isDark ? 'dark' : 'light',
        primary: {
            main: isDark ? '#F05D5E' : '#2A2D43',
        },
        secondary: {
            main: isDark ? '#7DDE92' : '#F05D5E',
        },
        background: {
            default: isDark ? '#121212' : '#F4F4F9',
            paper: isDark ? '#1E1E1E' : '#FFFFFF',
        }
    },
    typography: {
        fontFamily: '"Inter", "Open Sans", sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    transition: 'background-color 0.3s ease'
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    overflow: 'visible'
                }
            }
        }

    },
});