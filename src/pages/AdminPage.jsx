import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dashboard from '../components/admin/Dashboard';


const theme = createTheme();
export default function Admin() {
    return (
        <ThemeProvider theme={theme}>
            <Dashboard />
        </ThemeProvider >
    );
}