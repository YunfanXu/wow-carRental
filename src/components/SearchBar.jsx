import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

const CAR_CLASSES = ["All", "Station Wagon", "Sports Car", "Large Car", "Luxury Car", "Mid-size Car", "Small Car", "Pickup Truck", "Mini Van", "Commercial", "Premium SUV"]
export default function SearchBar({ handleSearchData, searchData }) {

    const today = new Date();
    const [pickupTime, setPickupTime] = React.useState((new Date()).setDate(today.getDate() + 1));
    const [dropOffTime, setdropOffTime] = React.useState((new Date()).setDate(today.getDate() + 2));
    const [pickUpLocation, setpickUpLocation] = React.useState('');
    const [dropOffLocation, setdropOffLocation] = React.useState('');
    const [class_type, setclass_type] = React.useState('All');

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


    const handleContinueButton = (event) => {
        event.preventDefault();
        let searchDetails = {
            pickupTime,
            dropOffTime,
            pickUpLocation,
            dropOffLocation,
            class_type
        };
        handleSearchData(Object.assign({}, searchDetails));
        let elementA = document.createElement('a');
        elementA.setAttribute('href', "#features")
        elementA.classList.add("page-scroll");
        elementA.dispatchEvent(new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        }))
        elementA.remove()
    }

    const handleSelect = (e) => {
        setclass_type(e.target.value)
    }
    const renderSelectType = () => {

        return (
            <>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Car Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={class_type}
                        label="car_type"
                        onChange={handleSelect}
                    >
                        {CAR_CLASSES.map((type, index) => <MenuItem key={index} value={type}>{type}</MenuItem>)}
                    </Select>
                </FormControl>
            </>
        )
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
                component="form"
                Validate
                autoComplete="off"
                onSubmit={handleContinueButton}
            >
                <Grid container id='search-bar' className="centerBox-row" spacing={2} style={{ flexGrow: 1 }}>
                    <Grid item xs={2}>{renderSelectType()}</Grid>
                    <Grid container item xs={2}>
                        <Grid item xs={6}>
                            <TextField
                                required
                                label="Pick-Up Location"
                                variant="outlined"
                                value={pickUpLocation}
                                onChange={handlePickUpLocation} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                label="Drop-Off Location"
                                variant="outlined"
                                value={dropOffLocation}
                                onChange={handleDropOffLocation} />
                        </Grid>
                    </Grid>
                    <Grid container item xs={6} spacing={2} >
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
                        <Button variant="contained" size="large" style={{ transform: 'scale(1.5)' }} type="submit">
                            Continue
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </LocalizationProvider>

    );
}
