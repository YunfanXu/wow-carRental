import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import UserApi from '../api/user.js';
import LoadingButton from '@mui/lab/LoadingButton';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

function LoginForm({ isShowLogin, handleLoginClick }) {
  const [showError, setShowError] = React.useState(false);
  const api = new UserApi();
  const [loading, setLoading] = React.useState(false);

  const renderErrorBox = () => {
    return (
      <Grid item xs={12}>
        <Typography variant="body1" component="h2" color='error'>
          Please check your username or password!
        </Typography>
      </Grid>
    )
  }
  const getUserInfo = async () => {
    let userInfo = await api.getUserInfo();
    return userInfo;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const userInfo = {
      email: data.get('email'),
      password: data.get('password'),
    };

    let message = await api.login(userInfo);
    if (message && message.token) {
      setToken(message.token);

      let basicUserInfo = await getUserInfo();
      setUser({ ...message, ...basicUserInfo });
      setShowError(false);
      handleLoginClick(false);
    } else {
      setShowError(true);
    }
    setLoading(false);
  };
  const handleClickBox = (e) => {
    if (e.target.className === 'login-form') {
      handleLoginClick(!isShowLogin);
    }
  }
  return (
    <div onClick={handleClickBox} className={`${isShowLogin ? "active" : ""} show `}>
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
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                {showError ? renderErrorBox() : null}
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  loading={loading}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </LoadingButton>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default LoginForm;
