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
import CarDialog from './CarDialog';
import carAPI from '../../api/car';


export default function MaintainCar() {
    const api = new carAPI();
    const [carList, setCarList] = React.useState([]);
    const [open, setOpen] = React.useState({
        isOpen: false
    });

    const handleClose = () => {
        setOpen({
            isOpen: false
        });
    }

    const EditButton = (info) => {
        return (
            <Button variant="outlined" size="small" color="success" sx={{ ml: 1 }} onClick={() => handleEditButton(info)}>
                Edit
            </Button>
        )
    }

    const DeleteButton = ({ vinId }) => {
        return (
            <Button variant="outlined" size="small" color="error" sx={{ ml: 1 }} onClick={() => handleDeleteButton(vinId)}>
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

    const handleEditButton = ({ carInfo }) => {
        setOpen(
            {
                isOpen: true,
                isEdit: true,
                carInfo
            }
        );
    }

    const updatecarList = async () => {
        let updatedCarList = await api.getCarList();
        setCarList(updatedCarList)
    }

    const handleDeleteButton = async (vinId) => {
        const response = await api.deleteCar(vinId);
        if (response === 'success') {
            updatecarList();
        }
    }


    React.useEffect(() => {
        updatecarList();
    }, []);

    return (
        <React.Fragment>
            <Title>Cars List</Title>
            <Box sx={{ mt: 1, mb: 1 }} component='div'>
                <AddButton />
            </Box>
            <Table size="small" sx={{ overflow: 'auto', maxHeight: '60vh' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Row Index</TableCell>
                        <TableCell>Car Model Name</TableCell>
                        <TableCell>Manufacture Name</TableCell>
                        <TableCell>Class Type</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Seat</TableCell>
                        <TableCell>Price per Day</TableCell>
                        <TableCell>Over Fee per Mile</TableCell>
                        <TableCell >Miles limit per Day</TableCell>
                        <TableCell>Current in Office</TableCell>
                        <TableCell sx={{ width: '180px' }}>Car Image URL</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {carList.map((row, index) => (
                        <TableRow key={row.vin_id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.manName}</TableCell>
                            <TableCell>{row.class_type}</TableCell>
                            <TableCell>{row.year}</TableCell>
                            <TableCell>{row.seat}</TableCell>
                            <TableCell>{row.pricePerDay}</TableCell>
                            <TableCell>{row.overFee}</TableCell>
                            <TableCell>{row.limitMilePerDay}</TableCell>
                            <TableCell>{row.officeName}</TableCell>
                            <TableCell sx={{ overflow: 'auto', maxWidth: '180px' }}>{row.image_url}</TableCell>
                            <TableCell>
                                <EditButton carInfo={row} />
                                <DeleteButton vinId={row.vin_id} />
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <CarDialog open={open} handleClose={handleClose} updatecarList={updatecarList} />
            {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link> */}
        </React.Fragment>
    );
}