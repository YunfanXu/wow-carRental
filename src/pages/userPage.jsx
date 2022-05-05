import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import {
    useNavigate,
} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { RenderIndividual, RenderErrorBox, RenderAddress } from '../modules/UserForm';
import UserApi from '../api/user.js';
import { getUserInfo, setUser } from '../utils/user';
import CouponList from '../components/CouponList';
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
export default function User() {
    const navigate = new useNavigate();
    const api = new UserApi();
    const [showError, setShowError] = React.useState(false);
    const [isEditable, setEditable] = React.useState(false);
    const [loading, setLoading] = React.useState(false);



    const handleClickEditable = () => {
        setEditable(!isEditable);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        let userInfo = {
            userAddress: {
                street: data.get('address1') + '\n' + data.get('address2'),
                city: data.get('city'),
                state: data.get('state'),
                zipcode: data.get('zipcode'),
                country: data.get('country'),
            },
            individual: {
                driverLicence: data.get('driverLicence') || '',
                insuranceCompany: data.get('insuranceCompany') || '',
                insuranceNumber: data.get('insuranceNumber') || '',
            }
        }
        let message1 = await api.updateAddress(userInfo.userAddress)
        let message2 = await api.updateIndividual(userInfo.individual)

        if (message1 && message2) {
            let initUserInfo = getUserInfo();
            initUserInfo.userAddress = userInfo.userAddress;
            initUserInfo.individual = userInfo.individual;

            setUser(initUserInfo);
            setShowError(false);
        } else {
            setShowError(true);
        }
        setLoading(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ overflow: 'auto' }}>
                <CssBaseline />
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

                <Grid container component="main" sx={{ flexGrow: 1 }}>
                    <Grid item xs={12} container justifyContent='center' sx={{ padding: '30px 15vw' }}>

                        <Grid item container xs={12} component={Paper} elevation={6} square>
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                {renderIconTitle('Account', <PersonIcon />)}
                                <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    <Grid container spacing={3}>
                                        <RenderAddress isEditable={isEditable} />
                                        <RenderIndividual isEditable={isEditable} />

                                        {showError ? <RenderErrorBox isEditable={isEditable} /> : null}
                                    </Grid>
                                    <Grid container justifyContent='space-around'>
                                        <Grid item >
                                            <Button
                                                size='large'
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={handleClickEditable}
                                            >
                                                {isEditable ? 'Cancel' : 'Edit'}
                                            </Button>
                                        </Grid>

                                        {isEditable ? <Grid item >
                                            <LoadingButton
                                                size='large'
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                loading={loading}
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Submit
                                            </LoadingButton>
                                        </Grid> : null}
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item container xs={12} component={Paper} elevation={6} square>
                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flexGrow: 1
                                }}
                            >
                                {renderIconTitle('Coupons', <CardGiftcardIcon />)}
                                <CouponList />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} component={Paper} elevation={6} square >

                    </Grid>
                </Grid>
            </div>

        </ThemeProvider >
    );
}