import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../utils/user';

export const RenderAddress = ({ isEditable = true }) => {

    let userAddress = null;
    let userInfo = getUserInfo();
    if (userInfo && 'userAddress' in userInfo) {
        userAddress = userInfo.userAddress;
        userAddress.street = userAddress.street.split('\n');
    }
    return (
        <>
            <Grid item xs={12}>
                <TextField
                    required
                    name="address1"
                    label="Address line 1"
                    fullWidth
                    autoComplete="shipping address-line1"
                    variant="standard"
                    disabled={!isEditable}

                    defaultValue={userAddress ? userAddress?.street[0] : ''}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    autoComplete="shipping address-line2"
                    variant="standard"
                    disabled={!isEditable}
                    defaultValue={userAddress ? userAddress?.street[1] : ''}

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
                    disabled={!isEditable}
                    defaultValue={userAddress?.city}


                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    variant="standard"
                    disabled={!isEditable}
                    defaultValue={userAddress?.state}


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
                    disabled={!isEditable}
                    defaultValue={userAddress?.zipcode}

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
                    disabled={!isEditable}
                    defaultValue={userAddress?.country}
                />
            </Grid>
        </>
    )
}

export const RenderIndividual = ({ isEditable = true }) => {
    let individual = {};
    let userInfo = getUserInfo();
    if (userInfo && 'individual' in userInfo) {
        individual = userInfo.individual;
    }
    return (
        <>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="Driver Licence Number"
                    name="driverLicence"
                    disabled={!isEditable}
                    defaultValue={individual?.driverLicence}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="Insurance Company"
                    name="insuranceCompany"
                    disabled={!isEditable}
                    defaultValue={individual?.insuranceCompany}


                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="Insurance Number"
                    name="insuranceNumber"
                    disabled={!isEditable}
                    defaultValue={individual?.insuranceNumber}


                />
            </Grid>
        </>
    )
}

export const RenderCorporate = () => {
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
                    label="Employee ID"
                    name="employeeId"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="Registerion Code"
                    name="registerCode"
                />
            </Grid>
        </>
    )
}

export const RenderPersonalInfo = ({ role_type, handleRoleType }) => {
    const handleChange = (e) => {
        handleRoleType(e);
    }

    return (<>
        <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                label="First Name"
                autoFocus
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                required
                fullWidth
                label="Phone Number"
                name="phoneNum"
                autoComplete="tel"
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
            />
        </Grid>
        <RenderAddress />
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
                onChange={handleChange}
            >
                <option value={1}>Individual</option>
                <option value={2}>Coporate Company Employee</option>
            </NativeSelect>
        </Grid>
    </>)
}

export const RenderErrorBox = () => {
    return (
        <Grid item xs={12}>
            <Typography variant="body1" component="h2" color='error'>
                Please check Your Input Again!
            </Typography>
        </Grid>
    )
}