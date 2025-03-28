import React from 'react';
import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

const GlobalStyles = () => (
    <>
        <MuiGlobalStyles styles={{
            body: {
                margin: 0,
                transition: 'background-color 0.3s ease',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
            },
            '#root': {
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }
        }} />
    </>
);

export default GlobalStyles;
