import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function PaymentForm({ paymentInfo, isChecked, handleChange }) {

  const {
    amount,
    cardName,
    cardNum,
    expireDate,
    city,
    country,
    state,
    cvv,
    address1,
    address2,
    zipcode } = paymentInfo;
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {isChecked ? (
          <Grid item xs={12} md={12}>
            <TextField
              name="amount"
              label="Payment Amount in this card"
              fullWidth
              variant="standard"
              value={amount}
              onChange={handleChange}
              type='number'
            />
          </Grid>
        ) : null}
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
            name="cardNum"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={cardNum}
            onChange={handleChange}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="expireDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={expireDate}
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
            value={cvv}
            onChange={handleChange}
            variant="standard"
          />
        </Grid>
      </Grid>

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
            value={address1}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={address2}
            onChange={handleChange}
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
            value={city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={state}
            onChange={handleChange}
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
            value={zipcode}
            onChange={handleChange}
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
            value={country}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}