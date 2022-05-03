import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";

export default function CarTypes({ userName = "" }) {
    let navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = () => {

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
                <MenuItem onClick={handleClick}>My account</MenuItem>
            </Menu>
        </div>
    );
}
