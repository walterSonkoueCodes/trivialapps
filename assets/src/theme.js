import { createTheme as createMuiTheme } from '@mui/material/styles';

export default function createTheme(darkMode = false) {
    const primaryMain = darkMode ? '#F05D5E' : '#2A2D43';
    const secondaryMain = darkMode ? '#7DDE92' : '#F05D5E';
    const backgroundDefault = darkMode ? '#121212' : '#F4F4F9';
    const backgroundPaper = darkMode ? '#1E1E1E' : '#FFFFFF';

    return createMuiTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: primaryMain,
            },
            secondary: {
                main: secondaryMain,
            },
            background: {
                default: backgroundDefault,
                paper: backgroundPaper,
            },
            text: {
                primary: darkMode ? '#FFFFFF' : '#2A2D43',
                secondary: darkMode ? '#B0B0B0' : '#5A5A5A',
            },
            action: {
                active: darkMode ? '#FFFFFF' : '#2A2D43',
                hover: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(42, 45, 67, 0.08)',
                selected: darkMode ? 'rgba(255, 255, 255, 0.16)' : 'rgba(42, 45, 67, 0.16)',
            },
        },
        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: 14,
            h1: { fontSize: '2.5rem', fontWeight: 700 },
            h2: { fontSize: '2rem', fontWeight: 600 },
            h3: { fontSize: '1.75rem', fontWeight: 500 },
            h4: { fontSize: '1.5rem', fontWeight: 500 },
            h5: { fontSize: '1.25rem', fontWeight: 400 },
            h6: { fontSize: '1rem', fontWeight: 400 },
            body1: { fontSize: '1rem', lineHeight: 1.5 },
            body2: { fontSize: '0.875rem', lineHeight: 1.5 },
        },
    });
}
