import { AppBar, Toolbar, IconButton, Switch } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from "../ui/ThemeToggle";

export default function DashboardLayout({ children }) {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton onClick={toggleTheme}>
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                    <Switch checked={darkMode} onChange={toggleTheme} />
                    <ThemeToggle />
                </Toolbar>
            </AppBar>
            <main>{children}</main>
        </div>
    );
}