import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import carApi from '../../api/car';
import { getManufacture, getModelList, getLocationList } from '../../utils/user';


const CarForm = ({ carInfo }) => {
    let manufactureList = getManufacture();
    let modelList = getModelList();
    const locationList = getLocationList();

    const [manufactureId, setManufactureId] = React.useState(carInfo?.manId ? carInfo?.manId : '');
    let defaultModle = '';
    if (modelList.some(model => model.modelName === carInfo?.name)) {
        defaultModle = modelList.filter(model => model.modelName === carInfo.name)[0]?.modelId;
    }
    const [modelId, setModelId] = React.useState(defaultModle);
    const [office, setOffice] = React.useState(carInfo?.officeId ? carInfo?.officeId : '');

    const handleManufactureId = (e) => {
        setManufactureId(e.target.value);
    }

    const handleModelId = (e) => {
        setModelId(e.target.value);
    }

    const handleOfficeChange = (e) => {
        setOffice(e.target.value)
    }
    return (
        <>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    name="name"
                    label="Car Model Name"
                    fullWidth
                    variant="standard"
                    defaultValue={carInfo?.name}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    name="class_type"
                    label="Car Class Type"
                    fullWidth
                    variant="standard"
                    defaultValue={carInfo?.class_type}
                />
            </Grid>
            <Grid item xs={6} >
                <FormControl fullWidth>
                    <InputLabel >Model Name</InputLabel>
                    <Select
                        value={modelId}
                        label="Model Name"
                        name="modelId"
                        onChange={handleModelId}
                    >
                        {modelList.map(item => (
                            <MenuItem key={item.modelId} value={item.modelId}>{item.modelName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} >
                <FormControl fullWidth>
                    <InputLabel >Manufacture Name</InputLabel>
                    <Select
                        value={manufactureId}
                        name="manufactureId"
                        label="Manufacture Name"
                        onChange={handleManufactureId}
                    >
                        {manufactureList.map(item => (
                            <MenuItem key={item.manId} value={item.manId}>{item.manName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel >Belong to Office</InputLabel>
                    <Select
                        value={office}
                        name="officeId"

                        label="office"
                        onChange={handleOfficeChange}
                    >
                        {locationList?.map((office, index) => (
                            <MenuItem value={office.officeId} key={office.city + index}>{`${office.city} - ${office.name}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    required
                    name="year"
                    label="Model Year"
                    fullWidth
                    variant="standard"
                    defaultValue={carInfo ? carInfo?.year : ''}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    name="seat"
                    label="Seats"
                    fullWidth
                    variant="standard"
                    defaultValue={carInfo?.seat}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    name="pricePerDay"
                    label="Price per Day in $"
                    fullWidth
                    variant="standard"
                    defaultValue={carInfo?.pricePerDay}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    name="overFee"
                    label="Over Fee per Mile in $"
                    fullWidth
                    variant="standard"
                    defaultValue={carInfo?.overFee}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    name="limitMilePerDay"
                    label="Limited Miles per Day"
                    fullWidth
                    variant="standard"
                    defaultValue={carInfo?.limitMilePerDay}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    name="image_url"
                    label="Image URL"
                    fullWidth
                    variant="standard"
                    defaultValue={carInfo?.image_url}
                />
            </Grid>
        </>
    )
}
export default function CarDialog({ open, handleClose, updateOfficeList }) {
    const [loading, setLoading] = React.useState(false);
    const [carState, setCarState] = React.useState({
        name: '',
        class_type: '',
        year: '',
        seat: '',
        pricePerDay: '',
        overFee: '',
        limitMilePerDay: '',
        image_url: '',
    });



    const api = new carApi();

    React.useEffect(() => {
        console.log("open.carInfo",open.carInfo)
        if (open && open.carInfo) {
            setCarState({ ...open.carInfo });
        }
    }, [])
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);

        let carInfo = {}, response = null;
        if (open.isEdit) {
            carInfo = {
                vehicleId: carState?.vin_id || Math.round(Math.random()*10000000000),
                carClassDTO: {
                    classType: data.get('class_type'),
                    dailyMileLimit: data.get('limitMilePerDay'),
                    rentalRatePerDay: data.get('pricePerDay'),
                    imageUrl: data.get('image_url'),
                    overFee: data.get('overFee'),
                },
                modelId: data.get('modelId'),
                manufactureId: data.get('manufactureId'),
                officeId: data.get('officeId'),
            }

            console.log("carInfo", carInfo)
            response = await api.updateCar(carInfo, open.carInfo.officeId)
        } else {
            carInfo = {
                carClassDTO: {
                    classType: data.get('class_type'),
                    dailyMileLimit: data.get('limitMilePerDay'),
                    rentalRatePerDay: data.get('pricePerDay'),
                    imageUrl: data.get('image_url'),
                    overFee: data.get('overFee'),
                },
                modelId: data.get('modelId'),
                manufactureId: data.get('manufactureId'),
                officeId: data.get('officeId'),
            }
            console.log("carInfo", carInfo)
            response = await api.createCar(carInfo)
        }
        if (response && response === 'success') {
            updateOfficeList();
            handleClose();
        }
        setLoading(false);

    }
    return (
        <div>
            <Dialog open={open.isOpen} onClose={handleClose}>
                <DialogTitle>
                    <Typography variant="h5" gutterBottom component="div" color='#1976d2'>
                        {open?.isEdit ? 'Edit Car Information' : "Create New Car's Information"}
                    </Typography>
                </DialogTitle>
                <Box component="form" Validate onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            < CarForm carInfo={open?.carInfo} />
                        </Grid>
                    </DialogContent>
                    <DialogActions >
                        <Button
                            variant="contained"
                            onClick={() => {
                                setLoading(false);
                                handleClose();
                            }}
                            sx={{ mt: 3, mb: 2, mr: 7, width: '100px' }}
                        >Cancel</Button>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            loading={loading}
                            sx={{ mt: 3, mb: 2, mr: 2, width: '100px' }}
                        >
                            {open?.isEdit ? 'Update' : 'Create'}
                        </LoadingButton>
                    </DialogActions>
                </Box>

            </Dialog>
        </div>
    );
}
