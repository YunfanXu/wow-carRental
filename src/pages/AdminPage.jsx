import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import {
    useNavigate,
} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { RenderIndividual, RenderErrorBox, RenderAddress } from '../modules/UserForm';
import UserApi from '../api/user.js';
import { getUserInfo, setUser } from '../utils/user';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const theme = createTheme();

export default function Admin() {
    const [userInfo, setUserInfo] = React.useState(null);
    const navigate = new useNavigate();
    const api = new UserApi();
    const [showError, setShowError] = React.useState(false);
    const [isEditable, setEditable] = React.useState(false);

    React.useEffect(async () => {
        // setUserInfo(getUserInfo());
        let userInfo = await api.getUserInfo();
    }, []);

    const handleClickEditable = () => {
        if (isEditable) {
            setUserInfo(getUserInfo());
        }
        setEditable(!isEditable);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let userInfo = {
            userAddress: {
                street: data.get('address1') + data.get('address2'),
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

        let message = await api.updateAddress(userInfo.userAddress)

        if (message) {
            setShowError(false);
        } else {
            setShowError(true);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ height: '100vh', overflow: 'hidden' }}>

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
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={6}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <PersonIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Account
                            </Typography>
                            <Box>

                            </Box>
                            <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={3}>
                                    <RenderAddress userInfo={userInfo} isEditable={isEditable} />
                                    <RenderIndividual userInfo={userInfo} isEditable={isEditable} />
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
                                        <Button
                                            size='large'
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Submit
                                        </Button>
                                    </Grid> : null}
                                </Grid>
                            </Box>
                        </Box>

                    </Grid>
                </Grid>
            </div>

        </ThemeProvider >
    );
}