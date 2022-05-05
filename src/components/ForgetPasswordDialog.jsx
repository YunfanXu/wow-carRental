import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import userApi from '../api/user';
import { getUserInfo } from '../utils/user';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function ForgetPasswordDialog({ open, handleClose }) {
    const [loading, setLoading] = React.useState(false);
    const [verifiedLoading, setverifiedLoading] = React.useState(false);
    const [showError, setShowError] = React.useState({ isShown: false, isTrue: false, message: '' });
    const [sentEmail, setSentEmail] = React.useState(false);

    const [email, setEmail] = React.useState('');
    const api = new userApi();

    const renderErrorBox = () => {
        let isTrue = showError.isTrue;
        return (
            <Grid item xs={12}>
                <Typography variant="body1" component="h2" color={isTrue ? '#00FA9A' : 'error'}>
                    {showError.message}
                </Typography>
            </Grid>
        )
    }

    const handleSendEmail = async (e) => {
        e.preventDefault();

        setverifiedLoading(true);
        let message = await api.resetSendEmail(email);
        if (message === true) {
            console.log("send EMAIL");
            setSentEmail(true);
        } else {
            setShowError({ isShown: true, message: 'Your email is invalid!' });
        }
        setverifiedLoading(false);

    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleSubmit = async (event) => {
        setShowError({ isShown: false, message: '' });

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('newPassword') !== data.get('confirmPassword')) {
            setShowError({ isShown: true, message: 'Please confirm your passwords are the same!' });
            return;
        }
        setLoading(true);
        const inputData = {
            secret: data.get('secret'),
            newPassword: data.get('newPassword'),
            email
        }
        let message = await api.updatePasswordBySecret(inputData);
        if (message === true) {
            setShowError({ isShown: true, isTrue: true, message: 'Your Password has been updated!' });
            setTimeout(() => {
                handleClose();
            }, 2000)

        } else {
            setShowError({ isShown: true, message: 'Your password is incorrect!' });
        }
        setLoading(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ fontSize: 18 }}>Please Enter Your Email</DialogTitle>
                <Box component="form" onSubmit={handleSubmit} Validate sx={{ mt: 1 }}>
                    <Stack spacing={2} sx={{ padding: '40px' }}>
                        <Stack direction='row' spacing={2}>
                            <TextField
                                required
                                fullWidth
                                name="email"
                                label="Email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                autoComplete="email"
                            />
                            <LoadingButton onClick={handleSendEmail} loading={verifiedLoading} disabled={sentEmail}>{sentEmail ? 'Has Sent verified code' : 'Send verified code'}</LoadingButton>
                        </Stack>

                        <TextField
                            required
                            fullWidth
                            name="secret"
                            label="Verified Code"
                            type="Secret"
                            autoComplete="text"
                        />
                        <TextField
                            required
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            autoComplete="password"
                        />
                        <TextField
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Your Password"
                            type="password"
                            autoComplete="new-password"
                        />
                        {showError.isShown ? renderErrorBox() : null}

                        <Stack direction='row' spacing={2}>
                            <Button
                                variant="contained"
                                onClick={handleClose}>Cancel</Button>
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                loading={loading}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Confirm
                            </LoadingButton>
                        </Stack>

                    </Stack>

                </Box>

            </Dialog>
        </div>
    );
}
