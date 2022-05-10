import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Title from './Title';
import { getLocationList } from '../../utils/user';
import OfficeDialog from './OfficeDialog';
import adminAPI from '../../api/admin';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Coupons() {
    const locationList = getLocationList();
    const [open, setOpen] = React.useState({
        isOpen: false
    });

    const handleClose = () => {
        setOpen({
            isOpen: false
        });
    }
    console.log("locationList", locationList);

    // const EditButton = (officeInfo) => {
    //     return (
    //         <Button variant="outlined" onClick={() => handleEditButton(officeInfo)}>
    //             Edit
    //         </Button>
    //     )
    // }

    const Corporation = () => {
        const [loading, setLoading] = React.useState(false);
        const api = new adminAPI();
        const handleSubmit = async (event) => {
            event.preventDefault();
            setLoading(true);
            const data = new FormData(event.currentTarget);
            let corporation = {
                companyName: data.get('companyName'),
                details: data.get('details'),
                discount: data.get('discount'),
            }
            console.log("corporation", corporation);
            let response = await api.createCorporation(corporation);
            if (response && response === 'success') {
                handleClose();
            }
            setLoading(false);
        }

        return (
            <Box component='div'>
                <Title>Create new Corporation</Title>
                <Box component="form" Validate onSubmit={handleSubmit} sx={{mt: 1, mb:3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                required
                                name="companyName"
                                label="Company Name"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="details"
                                label="Coupon Description"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="discount"
                                label="Coupon Discount"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        loading={loading}
                        sx={{ mt: 3, mb: 2, mr: 2, width: '100px' }}
                        variant="contained"
                        type="submit">
                        Create
                    </LoadingButton>
                </Box>
            </Box>
        )
    }


    const Batch = () => {
        const [loading, setLoading] = React.useState(false);
        const [couponType, setCouponType] = React.useState(1);

        const handhleCouponType = (e) => {
            setCouponType(e.target.value);
        }
        const api = new adminAPI();
        const handleSubmit = async (event) => {
            event.preventDefault();
            setLoading(true);
            const data = new FormData(event.currentTarget);
            let corporation = {
                couponType: couponType,
                details: data.get('details'),
                discount: data.get('discount'),
                stock: data.get('stock'),

            }
            console.log("corporation", corporation);
            let response = await api.createCouponsBatch(corporation);
            if (response && response === 'success') {
                handleClose();
            }
            setLoading(false);
        }

        return (
            <Box component='div'>
                <Title>Create new Coupon Batch</Title>
                <Box component="form" Validate onSubmit={handleSubmit} sx={{mt:3}} >
                    <Grid container spacing={2}>
                        <Grid item xs={6} >
                            <FormControl fullWidth>
                                <InputLabel >Coupon Type</InputLabel>
                                <Select
                                    value={couponType}
                                    label="Coupon Type"
                                    onChange={handhleCouponType}
                                >
                                    <MenuItem value={1}>Individual</MenuItem>
                                    <MenuItem value={2}>Corporate</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="details"
                                label="Coupon Description"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="discount"
                                label="Coupon Discount"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="stock"
                                label="Coupon Amount"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        loading={loading}
                        sx={{ mt: 3, mb: 2, mr: 2, width: '100px' }}
                        variant="contained"
                        type="submit">
                        Create
                    </LoadingButton>
                </Box>
            </Box>
        )
    }
    

    // const handleAddButton = () => {
    //     console.log("Add")
    //     setOpen(
    //         {
    //             isOpen: true
    //         }
    //     );

    // }

    // const handleEditButton = ({ officeInfo }) => {
    //     setOpen(
    //         {
    //             isOpen: true,
    //             isEdit: true,
    //             officeInfo
    //         }
    //     );

    //     console.log("Edit officeInfo", officeInfo)

    // }

    return (
        <React.Fragment>
            <Corporation />
            <Batch />
            {/* <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Office ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>street</TableCell>
                        <TableCell>State</TableCell>
                        <TableCell>Zip Code</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Action</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {locationList.map((row, index) => (
                        <TableRow key={row.officeId}>
                            <TableCell>{row.officeId}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.city}</TableCell>
                            <TableCell>{row.street}</TableCell>
                            <TableCell>{row.state}</TableCell>
                            <TableCell>{row.zipcode}</TableCell>
                            <TableCell>{row.phoneNum}</TableCell>
                            <TableCell>
                                <EditButton officeInfo={row} />
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table> */}
            <OfficeDialog open={open} handleClose={handleClose} />
            {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link> */}
        </React.Fragment>
    );
}