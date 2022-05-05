import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserApi from '../api/user.js';

import { setToken, setUser } from '../utils/user';
import { RenderIndividual, RenderCorporate, RenderPersonalInfo, RenderErrorBox } from '../modules/UserForm';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        XZZ Car Rentals
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const JoinForm = ({ isShowJoin, handleJoinClick, handleLoginClick }) => {
  const api = new UserApi();
  const [showError, setShowError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [role_type, setRoleType] = React.useState('1');

  const handleClickBox = (e) => {
    if (e.target.className === 'login-form') {
      handleJoinClick(!isShowJoin);
    }
  }

  const handleSignIn = () => {
    handleLoginClick(true);
    handleJoinClick(false);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData(event.currentTarget);
    let userInfo = {
      email: data.get('email'),
      password: data.get('password'),
      fname: data.get('firstName'),
      lname: data.get('lastName'),
      phoneNum: data.get('phoneNum'),
      role_type,
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
      },
      corporate: {
        companyName: data.get('companyName') || '',
        employeeId: data.get('employeeId') || '',
        registerCode: data.get('registerCode') || '',
      }
    }

    let message = await api.register(userInfo)

    if (message && message.token) {
      setToken(message.token);
      setUser({ ...message, ...userInfo });
      setShowError(false);
      handleJoinClick(false);
    } else {
      setShowError(true);
    }
    setLoading(false);

  };

  const handleRoleType = (e) => {
    setRoleType(e.target.value);
  }

  return (
    <div onClick={handleClickBox} className={isShowJoin ? 'show' : 'isHidden'}>
      <div className="login-form">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white', marginTop: '20vh ', borderRadius: 20 }}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <RenderPersonalInfo role_type={role_type} handleRoleType={handleRoleType} />
                  {parseInt(role_type) === 1 ? <RenderIndividual /> : <RenderCorporate />}
                  {showError ? <RenderErrorBox /> : null}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  loading={loading}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </LoadingButton>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2" onClick={handleSignIn}>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default JoinForm;
