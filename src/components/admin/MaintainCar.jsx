import * as React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { getLocationList } from '../../utils/user';
import OfficeDialog from './OfficeDialog';


export default function MaintainCars() {
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

    const EditButton = (officeInfo) => {
        return (
            <Button variant="outlined" onClick={() => handleEditButton(officeInfo)}>
                Edit
            </Button>
        )
    }

    const AddButton = () => {
        return (
            <Button variant="contained" onClick={handleAddButton}>
                Add New Office
            </Button>
        )
    }


    const handleAddButton = () => {
        console.log("Add")
        setOpen(
            {
                isOpen: true
            }
        );

    }

    const handleEditButton = ({ officeInfo }) => {
        setOpen(
            {
                isOpen: true,
                isEdit: true,
                officeInfo
            }
        );

        console.log("Edit officeInfo", officeInfo)

    }

    return (
        <React.Fragment>
            <Title>Car List</Title>
            <Box sx={{ width: '180px', mt: 1, mb: 1 }} component='div'>
                <AddButton />
            </Box>
            <Table size="small">
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
            </Table>
            <OfficeDialog open={open} handleClose={handleClose} />
            {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link> */}
        </React.Fragment>
    );
}