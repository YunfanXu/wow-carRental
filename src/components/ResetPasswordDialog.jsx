import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import userApi from '../api/user';
import { getUserInfo } from '../utils/user';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function ChangePasswordDialog({ open, handleClose }) {
  const [loading, setLoading] = React.useState(false);
  const [showError, setShowError] = React.useState({ isError: false, message: '' });

  const api = new userApi();

  const getUserEmail = () => {
    let info = getUserInfo();
    return info.email;
  }

  const renderErrorBox = () => {
    return (
      <Grid item xs={12}>
        <Typography variant="body1" component="h2" color='error'>
          {showError.message}
        </Typography>
      </Grid>
    )
  }

  const handleSubmit = async (event) => {
    setShowError({ isError: false, message: '' });

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('newPassword') !== data.get('confirmPassword')) {
      setShowError({ isError: true, message: 'Please confirm your passwords are the same!' });
      return;
    }
    const userInfo = {
      email: getUserEmail(),
      oldPassword: data.get('oldPassword'),
      newPassword: data.get('newPassword'),

    };

    setLoading(true);
    let message = await api.updatePassword(userInfo);
    if (message === true) {
      handleClose();
    } else {
      setShowError({ isError: true, message: 'Your password is incorrect!' });
    }
    setLoading(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontSize: 18 }}>Change Your Password</DialogTitle>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Stack spacing={2} sx={{ padding: '40px' }}>
            <TextField
              required
              fullWidth
              name="oldPassword"
              label="Old Password"
              type="password"
              autoComplete="new-password"
            />
            <TextField
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              autoComplete="new-password"
            />
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Your Password"
              type="password"
              autoComplete="new-password"
            />
            {showError.isError ? renderErrorBox() : null}

            <Stack spacing={2}
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
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
