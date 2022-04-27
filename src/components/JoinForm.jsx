import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import { setToken, setUser } from '../utils/user';

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

const JoinForm = ({ isShowJoin, handleJoinClick }) => {
  const api = new UserApi();
  const [showError, setShowError] = React.useState(false);

  const handleClickBox = (e) => {
    if (e.target.className === 'login-form') {
      handleJoinClick(!isShowJoin);
    }
  }

  const [role_type, setRoleType] = React.useState('1');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log();
    let userInfo = {
      email: data.get('email'),
      password: data.get('password'),
      fname: data.get('firstName'),
      lname: data.get('lastName'),
      role_type,
      userAddress: {
        street: data.get('address1') + data.get('address2'),
        city: data.get('city'),
        state: data.get('state'),
        zipcode: data.get('zip'),
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
    console.log("message", message)

    if (message && message.token) {
      setToken(message.token);
      setUser(message);
      setShowError(false);
      handleJoinClick(false);
    } else {
      setShowError(true);
    }
  };

  const handleRoleType = (e) => {
    console.log("type", e.target.value)
    setRoleType(e.target.value);
  }

  const renderErrorBox = () => {
    return (
      <Grid item xs={12}>
        <Typography variant="body1" component="h2" color='error'>
          Please check Your Input Again!
        </Typography>
      </Grid>
    )
  }
  const renderPersonalInfo = () => {
    return (<>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="given-name"
          name="firstName"
          required
          fullWidth
          id="firstName"
          label="First Name"
          autoFocus
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
        />
      </Grid>
      {renderAddress()}
      <Grid item xs={4}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          User Type
        </InputLabel>
      </Grid>
      <Grid item xs={8}>
        <NativeSelect
          fullWidth
          value={role_type}
          inputProps={{
            name: 'role_type',
            id: 'uncontrolled-native',
          }}
          onChange={handleRoleType}
        >
          <option value={1}>Individual</option>
          <option value={2}>Coporate Company Employee</option>
        </NativeSelect>
      </Grid>
    </>)
  }
  const renderAddress = () => {
    return (
      <>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
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
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
      </>
    )
  }

  const renderIndividual = () => {
    return (
      <>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="driverLicence"
            label="Driver Licence Number"
            name="driverLicence"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="insuranceCompany"
            label="Insurance Company"
            name="insuranceCompany"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="insuranceNumber"
            label="Insurance Number"
            name="insuranceNumber"
          />
        </Grid>
      </>
    )
  }

  const renderCorporate = () => {
    return (
      <>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="companyName"
            label="Coporatate Company Name"
            name="companyName"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="employeeId"
            label="Employee ID"
            name="employeeId"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="registerCode"
            label="Registerion Code"
            name="registerCode"
          />
        </Grid>
      </>
    )
  }
  return (
    <div onClick={handleClickBox} className={`${isShowJoin ? "active" : ""} show `}>
      <div className="login-form">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white', borderRadius: 20 }}>
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
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  {renderPersonalInfo()}

                  {role_type == 1 ? (
                    renderIndividual()
                  ) : (
                    renderCorporate()
                  )}
                  {showError ? renderErrorBox() : null}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
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
