import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <Tooltip title={`Passer en mode ${isDark ? 'clair' : 'sombre'}`}>
            <IconButton onClick={toggleTheme} color="inherit">
                {isDark ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
        </Tooltip>
    );
}