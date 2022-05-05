import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import ResetPasswordDialog from './ResetPasswordDialog';
import ChangePasswordDialog from './ResetPasswordDialog';

export default function BasicMenu({ userName = "", handleLogout }) {
    let navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickLogout = () => {
        handleLogout();
        setAnchorEl(null);
    }

    const handleClickAccount = () => {
        navigate('/user')
        setAnchorEl(null);
    }

    const handleClickOrder = () => {
        setAnchorEl(null);
    }

    const handleClickReset = () => {
        setOpenDialog(true);
        setAnchorEl(null);
    }
    return (
        <div className='loginicon login-textBox' style={{ justifyContent: 'space-around' }} >
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size="large"
            >
                <PersonIcon sx={{ fontSize: '20px' }} />
                {userName}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClickAccount}>My account</MenuItem>
                <MenuItem onClick={handleClickOrder}>Order Summary</MenuItem>
                <MenuItem onClick={handleClickReset}>Reset Password</MenuItem>
                <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
            </Menu>
            <ChangePasswordDialog open={openDialog} handleClose={handleCloseDialog} />
        </div>
    );
}
