import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CarIcon from '@mui/icons-material/DirectionsCar';
export function MainListItems({ handleClick }) {
  return (
    <React.Fragment>
      <ListItemButton onClick={() => handleClick(0)} >
        <ListItemIcon>
          <HomeWorkIcon />
        </ListItemIcon>
        <ListItemText primary="Offices" />
      </ListItemButton>
      <ListItemButton onClick={() => handleClick(1)}>
        <ListItemIcon>
          <CardGiftcardIcon />
        </ListItemIcon>
        <ListItemText primary="Coupons" />
      </ListItemButton>
      <ListItemButton onClick={() => handleClick(2)}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton >
      <ListItemButton onClick={() => handleClick(3)}>
        <ListItemIcon>
          <CarIcon />
        </ListItemIcon>
        <ListItemText primary="Cars" />
      </ListItemButton>

    </React.Fragment>
  )
}
