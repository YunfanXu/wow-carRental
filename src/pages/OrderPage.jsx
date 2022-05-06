import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    useNavigate,
} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import UserApi from '../api/user.js';
import HistoryIcon from '@mui/icons-material/History';
import OrderList from '../components/OrderList';
import PaymentDialog from '../components/PaymentDialog.jsx';
const theme = createTheme();

const renderIconTitle = (text, icon) => {
    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                {icon}
            </Avatar>
            <Typography component="h1" variant="h5">
                {text}
            </Typography>
        </>
    )
}
export default function Order() {
    const navigate = new useNavigate();
    const api = new UserApi();
    const [showError, setShowError] = React.useState(false);
    const [isEditable, setEditable] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState({
        isOpen: false,
        invoiceId: null
    });

    const handleCloseDialog = () => {
        setOpenDialog({isOpen:false});
    };

    const handleClickEditable = () => {
        setEditable(!isEditable);
    }

    const RenderTopBar = () => {
        return (
            <>
                <AppBar
                    position="absolute"
                    color="default"
                    elevation={0}
                    sx={{
                        position: 'relative',
                        borderBottom: (t) => `1px solid ${t.palette.divider}`,
                        height: "5vh",
                        minHeight: '64px'
                    }}
                >
                    <Toolbar style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 40px', alignItems: 'center' }}>
                        <Button
                            onClick={() => {
                                navigate("/");
                            }}
                            variant="outlined" startIcon={<ArrowBackIcon />}>
                            Go Back
                        </Button>

                        <Typography variant="h4" color="inherit" noWrap>
                            XZZ CAR RENTALS
                        </Typography>
                        <Box>
                        </Box>
                    </Toolbar>
                </AppBar>
            </>
        )
    }

    const handleOpenDialog = (invoiceId) => {
        console.log("invoiceId", invoiceId)
        setOpenDialog({isOpen: true, invoiceId});
    }
    const RenderOrder = () => {
        return (
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexGrow: 1,
                }}
            >
                {renderIconTitle('Orders', <HistoryIcon />)}
                <OrderList handleOpenDialog={handleOpenDialog} />
            </Box>
        )
    }
    return (
        <ThemeProvider theme={theme}>
            <div style={{ overflow: 'auto' }}>
                <CssBaseline />
                <RenderTopBar />
                <Grid container component="main" sx={{ flexGrow: 1 }}>
                    <Grid item xs={12} container justifyContent='center' sx={{ padding: '30px 10vw' }}>
                        <Grid item container xs={12} component={Paper} elevation={6} square>
                            <RenderOrder />
                        </Grid>
                    </Grid>
                </Grid>
                <PaymentDialog open={openDialog} handleClose={handleCloseDialog} />
            </div>

        </ThemeProvider >
    );
}