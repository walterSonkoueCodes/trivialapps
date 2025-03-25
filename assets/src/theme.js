import { createTheme } from '@mui/material/styles';

export const createAppTheme = (darkMode) => createTheme({
    palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: {
            main: '#F05D5E',
        },
        secondary: {
            main: darkMode ? '#7DDE92' : '#2A2D43',
        }
    }
});