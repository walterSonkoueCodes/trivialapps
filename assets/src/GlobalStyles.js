import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

export default function GlobalStyles() {
    return (
        <MuiGlobalStyles
            styles={{
                body: {
                    transition: 'background-color 0.3s ease',
                },
                '.fade-in': {
                    animation: 'fadeIn 0.5s',
                },
                '@keyframes fadeIn': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                }
            }}
        />
    );
}