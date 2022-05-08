import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Title from './Title';
import { getLocationList } from '../../utils/user';
import adminAPI from '../../api/admin';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AlertBox from './AlertBox';

export default function MaintainOrder() {
  const locationList = getLocationList();

  const CompleteOrder = () => {
    const today = new Date();

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [loading, setLoading] = React.useState(false);
    const [dropOffLocation, setdropOffLocation] = React.useState('');
    const [dropOffTime, setdropOffTime] = React.useState((new Date()).setDate(today.getDate()));
    const [alertInfo, setAlertInfo] = React.useState({ isOpen: false });

    const wrapperSetInfo = (info) => {
      setAlertInfo({
        ...info,
        isOpen: true
      });
      setTimeout(() => {
        setAlertInfo({
          ...info,
          isOpen: false
        });
      }, 3000);
    }
    const handleDropOffLocation = (e) => {
      setdropOffLocation(e.target.value)
    }
    const handleDropOffChange = (newValue) => {
      setdropOffTime(newValue);
    };

    const api = new adminAPI();

    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      const data = new FormData(event.currentTarget);
      let orderInfo = {
        userId: data.get('userId'),
        dropLocId: dropOffLocation,
        dropDate: dropOffTime,
        endOdometer: data.get('endOdometer'),
      }
      let orderId = data.get('orderId');
      console.log("CompleteOrder", orderInfo, orderId);
      let response = await api.maintainOrder(orderId, orderInfo);
      if (response && response === 200) {
        wrapperSetInfo({
          textType: 'success',
          textContent: "Update successed!"
        });
      } else {
        wrapperSetInfo({
          textType: 'error',
          textContent: "Failed! Please check the order information!"
        });
      }
      setLoading(false);
    }

    return (
      <Box component='div'>
        <Title>Maintain Order</Title>
        <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 1, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} >
              <TextField
                required
                name="orderId"
                label="Order ID"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={6} >
              <TextField
                required
                name="userId"
                label="User ID"
                fullWidth
                variant="standard"
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDateFns}>

              <Grid item xs={3} >
                <DesktopDatePicker
                  label="Drop-Off Date"
                  inputFormat="MM/dd/yyyy"
                  value={dropOffTime}
                  onChange={handleDropOffChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={3} >
                <TimePicker
                  label="Drop-Off Time"
                  value={dropOffTime}
                  onChange={handleDropOffChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </LocalizationProvider>

            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel >Drop Off Location</InputLabel>
                <Select
                  value={dropOffLocation}
                  label="dropOffLocation"
                  onChange={handleDropOffLocation}
                >
                  {locationList?.map((office, index) => (
                    <MenuItem value={office.officeId} key={office.city + index}>{`${office.city} - ${office.name}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                name="endOdometer"
                label="Drop Off Odometer"
                fullWidth
                variant="standard"
              />
            </Grid>
          </Grid>
          <Box>
            <LoadingButton
              loading={loading}
              sx={{ mt: 3, mb: 2, mr: 2, width: '100px' }}
              variant="contained"
              type="submit">
              Update
            </LoadingButton>
          </Box>
          <AlertBox alertInfo={alertInfo} handleClose={() => setAlertInfo({ isOpen: false })} />

        </Box>
      </Box>
    )
  }

  return (
    <React.Fragment>
      <CompleteOrder />
    </React.Fragment>
  );
}