import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import orderApi from '../api/order';
import Box from '@mui/material/Box';

const api = new orderApi();

export default function Coupon({ handleChange, couponId }) {
    const [couponList, setCouponList] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            let response = await api.getCoupon();
            if (response !== 400) {
                setCouponList(response.couponsList);
            }
            return;
        }
        fetchData()
    }, [])

    console.log("couponList", couponList)
    return (
        <Box sx={{ minWidth: 200, maxWidth: 300 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Coupon</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={couponId}
                    label="Please Select Valid Coupon"
                    onChange={handleChange}
                >
                    {couponList.map(item => (
                        <MenuItem key={item.coupons?.couponId} value={item.coupons?.couponId}>{item.couponsBatchVO?.details}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
