import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function SearchBar() {
    const [pickupTime, setPickupTime] = React.useState(new Date());
    const [dropOffTime, setdropOffTime] = React.useState(new Date());
    const [pickUpLocation, setpickUpLocation] = React.useState('');
    const [dropOffLocation, setdropOffLocation] = React.useState('');

    const handlePickUpChange = (newValue) => {
        setPickupTime(newValue);
    };
    const handleDropOffChange = (newValue) => {
        setdropOffTime(newValue);
    };

    const handlePickUpLocation = (e) => {
        setpickUpLocation(e.target.value)
    }

    const handleDropOffLocation = (e) => {
        setdropOffLocation(e.target.value)
    }

    const handleContinueButton = () => {
        console.log("pickupTime", pickupTime)
        console.log("dropOffTime", dropOffTime)
        console.log("pickUpLocation", pickUpLocation)
        console.log("dropOffLocation", dropOffLocation)

    }
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container id='search-bar' className="centerBox-row" spacing={2} style={{ flexGrow: 1 }}>
                <Grid container item xs={2}>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Pick-Up Location" variant="outlined" value={pickUpLocation} onChange={handlePickUpLocation} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Drop-Off Location" variant="outlined" value={dropOffLocation} onChange={handleDropOffLocation} />
                    </Grid>
                </Grid>
                <Grid container item xs={8} spacing={2} >
                    <Grid container item xs={6}>
                        <Grid item xs={6} >
                            <DesktopDatePicker
                                style={{ width: '100%' }}
                                label="Pick-Up Date"
                                inputFormat="MM/dd/yyyy"
                                value={pickupTime}
                                onChange={handlePickUpChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <TimePicker
                                label="Pick-Up Time"
                                value={pickupTime}
                                onChange={handlePickUpChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={6}>
                        <Grid item xs={6} >
                            <DesktopDatePicker
                                label="Drop-Off Date"
                                inputFormat="MM/dd/yyyy"
                                value={dropOffTime}
                                onChange={handleDropOffChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <TimePicker
                                label="Drop-Off Time"
                                value={dropOffTime}
                                onChange={handleDropOffChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" size="large" style={{ transform: 'scale(1.5)' }} onClick={handleContinueButton}>
                        Continue
                    </Button>
                </Grid>
            </Grid>

        </LocalizationProvider>

    );
}
