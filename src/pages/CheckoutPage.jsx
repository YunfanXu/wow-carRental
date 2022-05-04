import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/ReviewForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import {
    useNavigate, useLocation
} from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { getUserInfo } from '../utils/user';
import orderApi from '../api/order';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                XZZ Cars Rental
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const steps = ['Payment details', 'Review your order'];

const theme = createTheme();

const createOrderData = (orderInfo, couponId) => {
    const userInfo = getUserInfo();
    let data = {
        "couponId": couponId,
        "dailyLimitOdometer": 0,
        "dropDate": orderInfo.searchData.dropOffTime,
        "dropLocId": 1,
        "pickDate": orderInfo.searchData.pickupTime,
        "pickLocId": 2,
        "userId": userInfo.id,
        "vinId": orderInfo.carInfo.vin_id,
        "endOdometer": 0,
        "startOdometer": 0

    }

    return data;
}

const createPaymentData = (orderInfo, invoice) => {
    let data = {
        "cardNum": orderInfo.cardInfo.cardNumber,
        "invoiceId": invoice.invoiceId,
        "payAmount": invoice.amount,
        "payMethod": "visa"
    };
    return data;
}
export default function Checkout(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [state, setState] = React.useState({
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: '',
    });
    const [couponId, setCouponId] = React.useState('');
    const [openSnack, setOpenSnack] = React.useState({
        open: false,
        message: ''
    });

    const [seconds, setSeconds] = React.useState(5);

    const [orderInfo, SetOrderInfo] = React.useState({});

    let navigate = useNavigate();
    let api = new orderApi();
    const location = useLocation();
    const { carInfo, searchData } = location.state;



    const handleClose = () => {
        setOpenSnack({ ...openSnack, open: false });
    };


    const placeOrder = async (orderInfo, couponId) => {
        let data = createOrderData(orderInfo, couponId)
        let response = await api.createOrder(data);
        if (response && response.invoice) {
            let paymentData = createPaymentData(orderInfo, response.invoice);
            let paymentResponse = api.createPayment(paymentData);
            if (paymentResponse) {
                setActiveStep(activeStep + 1);
                let count = 5;
                let timer = setInterval(() => {
                    count--;
                    if (count >= 0) {
                        setSeconds(count);
                    } else {
                        clearInterval(timer);
                        navigate('/');
                    }
                }, 1000)
            }

        }
    }
    const handleNext = () => {
        if (activeStep === 0) {
            if (Object.values(state).some(item => !item)) {
                setOpenSnack({
                    open: true,
                    message: 'Please Fill in the form!'
                });
            } else {
                setActiveStep(activeStep + 1);
                SetOrderInfo({ carInfo, searchData, cardInfo: state })
            }
        } else if (activeStep === 1) {
            placeOrder(orderInfo, couponId)
        }

    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleStateChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleCouponChange = (e) => {
        setCouponId(e.target.value)
    }
    function getStepContent(step, state, handleChange) {
        switch (step) {
            case 0:
                return <PaymentForm state={state} handleChange={handleChange} />;
            case 1:
                return <Review orderInfo={orderInfo} couponId={couponId} handleChange={handleCouponChange} />;
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnack.open}
                onClose={handleClose}
                autoHideDuration={3000}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    {openSnack.message}
                </Alert>
            </Snackbar>
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
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
                        <PersonIcon />
                    </Box>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    {`Thank you for your order.  You will be directed to the Home page after ${seconds} seconds.`}
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep, state, handleStateChange)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}

                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}