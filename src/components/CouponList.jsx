import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import orderApi from '../api/order';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
const api = new orderApi();

const convertDate = (date) => {
    var dateStr =
        ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
        ("00" + date.getDate()).slice(-2) + "/" +
        date.getFullYear() + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2);

    return dateStr;
}

export default function Coupon() {
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
        <TableContainer component={Paper}>
            <Table sx={{ flexGrow: 1 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Coupon List</TableCell>
                        <TableCell align="right">Detail</TableCell>
                        <TableCell align="right">Expired By</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {couponList.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index}
                            </TableCell>
                            <TableCell align="right">
                                {row?.couponsBatchVO?.details}
                            </TableCell>
                            <TableCell align="right">
                                {convertDate(new Date(row?.coupons?.validTo))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
