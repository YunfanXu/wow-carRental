import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function PaymentForm({ state, handleChange }) {

  const { cardName, cardNumber, expDate, cvv } = state;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={cardName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={cardNumber}
            onChange={handleChange}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={expDate}
            onChange={handleChange}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={cvv}
            onChange={handleChange}

          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}