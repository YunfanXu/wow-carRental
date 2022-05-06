import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import OfficeAPI from '../../api/officeApi';


const OfficeForm = ({ officeInfo }) => {
    return (
        <>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    name="name"
                    label="Office Name"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="standard"
                    defaultValue={officeInfo?.name}


                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    name="phoneNum"
                    label="Phone Number"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="standard"
                    defaultValue={officeInfo?.phoneNum}


                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    name="street"
                    label="Street"
                    fullWidth
                    autoComplete="shipping address-line1"
                    variant="standard"
                    defaultValue={officeInfo ? officeInfo?.street : ''}
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
                    defaultValue={officeInfo?.city}


                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    variant="standard"
                    defaultValue={officeInfo?.state}


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
                    defaultValue={officeInfo?.zipcode}

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
                    defaultValue={officeInfo?.country}
                />
            </Grid>
        </>
    )
}
export default function OfficeDialog({ open, handleClose }) {
    const [loading, setLoading] = React.useState(false);
    const [coupon, setCoupon] = React.useState({
       
    });

    const api = new OfficeAPI();
    


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
       
        setLoading(false);

    }
    return (
        <div>
            <Dialog open={open.isOpen} onClose={handleClose}>
                <DialogTitle>
                    <Typography variant="h5" gutterBottom component="div" color='#1976d2'>
                        {open?.isEdit ? 'Edit Office Information' : 'Create New Office'}
                    </Typography>
                </DialogTitle>
                <Box component="form" Validate onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            < OfficeForm officeInfo={open?.officeInfo} />
                        </Grid>
                    </DialogContent>
                    <DialogActions >
                        <Button
                            variant="contained"
                            onClick={() => {
                                setLoading(false);
                                handleClose();
                            }}
                            sx={{ mt: 3, mb: 2, mr: 7, width: '100px' }}
                        >Cancel</Button>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            loading={loading}
                            sx={{ mt: 3, mb: 2, mr: 2, width: '100px' }}
                        >
                            {open?.isEdit ? 'Update' : 'Create'}
                        </LoadingButton>
                    </DialogActions>
                </Box>

            </Dialog>
        </div>
    );
}
