import * as React from 'react';
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
import OfficeAPI from '../../api/officeApi';


export default function Orders() {
    const api = new OfficeAPI();
    const [officeList, setOfficeList] = React.useState([]);
    const [open, setOpen] = React.useState({
        isOpen: false
    });

    const handleClose = () => {
        setOpen({
            isOpen: false
        });
    }

    const EditButton = (officeInfo) => {
        return (
            <Button variant="outlined" size="small" color="success" sx={{ ml:1}} onClick={() => handleEditButton(officeInfo)}>
                Edit
            </Button>
        )
    }

    const DeleteButton = (officeId) => {
        return (
            <Button variant="outlined" size="small" color="error" sx={{ ml:1}} onClick={() => handleDeleteButton(officeId)}>
                Delete
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

    const updateOfficeList = async () => {
        await api.getOffices();
        const locationList = getLocationList();
        setOfficeList(locationList)
    }

    const handleDeleteButton = async (officeId) => {
        const response = await api.deleteOffice(officeId);
        console.log("handleDeleteButton", response)
        if (response === 'success') {
            updateOfficeList();
        }
    }


    React.useEffect(() => {
        updateOfficeList();
    }, []);

    return (
        <React.Fragment>
            <Title>Office List</Title>
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
                    {officeList.map((row, index) => (
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
                                <DeleteButton officeId={row.officeId} />
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <OfficeDialog open={open} handleClose={handleClose} updateOfficeList={updateOfficeList}/>
        </React.Fragment>
    );
}