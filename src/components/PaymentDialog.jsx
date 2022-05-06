import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PaymentForm from './PaymentForm';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

const RenderBillingAddress = () => {
    return (<>
        <Typography variant="h6" gutterBottom>
            Billing Address
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    required
                    name="address1"
                    label="Address line 1"
                    fullWidth
                    autoComplete="shipping address-line1"
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    autoComplete="shipping address-line2"
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    name="zipcode"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                    variant="standard"
                />
            </Grid>
        </Grid>
    </>)
}


export default function PaymentDialog({ open, handleClose }) {
    const [cardState, setCardState] = React.useState({
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: '',
    });
    const [loading, setLoading] = React.useState(false);

    const handleCardStateChange = (e) => {
        setCardState({
            ...cardState,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        let userInfo = {
            invoiceId: open.invoiceId,
            cardInfo: { ...cardState },
            userAddress: {
                street: data.get('address1') + '\n' + data.get('address2'),
                city: data.get('city'),
                state: data.get('state'),
                zipcode: data.get('zipcode'),
                country: data.get('country'),
            },
        }
        console.log("userInfo", userInfo);
        console.log(JSON.stringify(userInfo));

        setLoading(false);

    }
    return (
        <div>
            <Dialog open={open.isOpen} onClose={handleClose}>
                <DialogTitle>
                    <Typography variant="h4" gutterBottom component="div">
                        Payment
                    </Typography>
                </DialogTitle>
                <Box component="form" Validate onSubmit={handleSubmit}>
                    <DialogContent>
                        <PaymentForm state={cardState} handleChange={handleCardStateChange} />
                        <RenderBillingAddress />
                    </DialogContent>
                    <DialogActions >
                        <Button
                            variant="contained"
                            onClick={handleClose}
                            sx={{ mt: 3, mb: 2, mr: 7, width: '100px' }}
                        >Cancel</Button>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            loading={loading}
                            sx={{ mt: 3, mb: 2, mr: 2, width: '100px' }}
                        >
                            Confirm
                        </LoadingButton>
                    </DialogActions>
                </Box>

            </Dialog>
        </div>
    );
}
