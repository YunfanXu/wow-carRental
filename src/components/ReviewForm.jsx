import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import GasMeterIcon from '@mui/icons-material/GasMeter';
import HdrAutoIcon from '@mui/icons-material/HdrAuto';
import Coupon from '../components/Coupon';

const Title = (props) => {
  return (
    <Typography component="h2" variant="h5" color="primary" gutterBottom>
      {props.children}
    </Typography>
  )
}

const createIconTextBox = (icon, text) => {
  return (
    <>
      <Grid item xs={2}>{icon}</Grid>
      <Grid item xs={10}>
        <Typography variant="body1" gutterBottom>
          {text}
        </Typography>
      </Grid>
    </>
  )
}

const renderSeatBox = (value) => {
  return createIconTextBox(<PeopleAltIcon color="primary" sx={{ fontSize: 20 }} />, value + " People");
}

const renderGasBox = (value) => {
  return createIconTextBox(<LocalGasStationIcon color="primary" sx={{ fontSize: 20 }} />, value);
}

const renderOrilBox = (value) => {
  return createIconTextBox(<GasMeterIcon color="primary" sx={{ fontSize: 20 }} />, value + "mpg");
}

const renderDriveModeBox = (value) => {
  return createIconTextBox(<HdrAutoIcon color="primary" sx={{ fontSize: 20 }} />, value);
}

const renderCarInfo = (car) => {
  return (
    <Card
      sx={{ padding: '20px', display: 'flex', flexDirection: 'row' }}
    >
      <CardMedia
        component="img"
        height="340"
        style={{ objectFit: 'contain' }}
        image={car.image_url || "https://source.unsplash.com/random"}
        alt={car.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Grid container >
          <Grid item xs={10}>
            <Typography gutterBottom variant="h5" component="h2">
              {car.name}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography gutterBottom variant="h5" component="h2">
              {car.year}
            </Typography>
          </Grid>
          <Grid item container xs={6}>{renderSeatBox(car.seat)}</Grid>
          <Grid item container xs={6}>{renderGasBox(car.powerMode)}</Grid>
          <Grid item container xs={6}>{renderOrilBox(car.mpg)}</Grid>
          <Grid item container xs={6}>{renderDriveModeBox(car.driveMode)}</Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}


const getPayment = (cardInfo) => {
  if (!cardInfo) return [];
  return [
    { name: 'Card holder', detail: cardInfo.cardName },
    { name: 'Card number', detail: cardInfo.cardNumber },
    { name: 'Expiry date', detail: cardInfo.expDate },
  ]
}


const getTotalCost = (costPerDay, endDate, startDate) => {
  return Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) * Number(costPerDay);
}

const convertDate = (date) => {
  var dateStr =
    ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
    ("00" + date.getDate()).slice(-2) + "/" +
    date.getFullYear() + " " +
    ("00" + date.getHours()).slice(-2) + ":" +
    ("00" + date.getMinutes()).slice(-2);

  return dateStr;
}
const getBasicInfo = (orderInfo) => {
  if (!orderInfo || !orderInfo.searchData) return [];
  const { searchData } = orderInfo;
  let result = [];
  result.push(
    {
      name: 'Cost Per Day',
      val: "$ " + orderInfo.carInfo.pricePerDay
    },
    {
      name: 'Car type',
      val: orderInfo.carInfo.class_type
    },
    {
      name: 'Pick up Time',
      val: convertDate(new Date(searchData.pickupTime))
    },
    {
      name: 'Drop off Time',
      val: convertDate(new Date(searchData.dropOffTime))
    },
    {
      name: 'Pick up Location',
      val: searchData.pickUpLocation
    },
    {
      name: 'Drop off Location',
      val: searchData.dropOffLocation
    },
  )

  return result;
}

const renderBasicInfo = (orderInfo) => {
  let data = getBasicInfo(orderInfo);
  return (
    <>
      {data.map((payment) => (
        <React.Fragment key={payment.name}>
          <Grid item xs={6}>
            <Typography gutterBottom>{payment.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{payment.val}</Typography>
          </Grid>
        </React.Fragment>
      ))}
    </>
  )
}
export default function Review({ orderInfo, couponId, handleChange }) {
  let payments = getPayment(orderInfo.cardInfo);
  let totalCost = getTotalCost(orderInfo.carInfo.pricePerDay, orderInfo.searchData.dropOffTime, orderInfo.searchData.pickupTime)


  return (
    <React.Fragment>
      <Title gutterBottom>
        Order summary
      </Title>
      <List disablePadding>
        {renderCarInfo(orderInfo.carInfo)}
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Title gutterBottom sx={{ mt: 2 }}>
            Basic Infomation:
          </Title>
          <Grid container>
            {renderBasicInfo(orderInfo)}
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Title gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Title>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid container style={{ paddingTop: '30px' }}>
        <Grid item xs={12} md={6}>
          <Coupon couponId={couponId} handleChange={handleChange} />
        </Grid>
        <Grid container item xs={12} md={6} justifyContent='space-between' sx={{ padding: '20px 0' }}>
          <Title sx={{ fontWeight: 800 }}>
            Total Cost:
          </Title>
          <Title sx={{ fontWeight: 800 }}>
            ${totalCost}
          </Title>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}