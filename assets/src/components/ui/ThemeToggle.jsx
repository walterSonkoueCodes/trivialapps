import { Switch, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Brightness7 sx={{ mr: 1 }} />
            <Switch
                checked={darkMode}
                onChange={toggleTheme}
                color="primary"
            />
            <Brightness4 sx={{ ml: 1 }} />
        </Box>
    );
}