import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import GasMeterIcon from '@mui/icons-material/GasMeter';
import HdrAutoIcon from '@mui/icons-material/HdrAuto';
import Coupon from '../components/Coupon';
import { getLocationById } from '../utils/user';

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
        <Typography variant="h6" sx={{ mb: 0.3, ml: 1, fontWeight: 700 }} component="div" gutterBottom>
          {text}
        </Typography>
      </Grid>
    </>
  )
}

const renderSeatBox = (value) => {
  return createIconTextBox(<PeopleAltIcon color="primary" sx={{ fontSize: 24 }} />, value + " People");
}

const renderGasBox = (value) => {
  return createIconTextBox(<LocalGasStationIcon color="primary" sx={{ fontSize: 24 }} />, value);
}

const renderOrilBox = (value) => {
  return createIconTextBox(<GasMeterIcon color="primary" sx={{ fontSize: 24 }} />, value + "mpg");
}

const renderDriveModeBox = (value) => {
  return createIconTextBox(<HdrAutoIcon color="primary" sx={{ fontSize: 24 }} />, value);
}

const renderCarInfo = (car) => {
  return (
    <Card
      sx={{ padding: '20px', display: 'flex', flexDirection: 'row' }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <CardMedia
            component="img"
            width="100%"
            height="340px"
            style={{ objectFit: 'contain' }}
            image={car.image_url || "https://source.unsplash.com/random"}
            alt={car.name}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <Typography gutterBottom variant="h4" component="h2" sx={{ letterSpacing: 3 }}>
                  {car.name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography gutterBottom variant="h4" component="h2" sx={{ letterSpacing: 3 }}>
                  {car.year}
                </Typography>
              </Grid>
              <Grid item xs={12} container spacing={2} sx={{ mt: 0 }}>
                <Grid item container xs={6} alignItems='flex-end'>{renderSeatBox(car.seat)}</Grid>
                <Grid item container xs={6} alignItems='flex-end'>{renderGasBox(car.powerMode)}</Grid>
                <Grid item container xs={6} alignItems='flex-end'>{renderOrilBox(car.mpg)}</Grid>
                <Grid item container xs={6} alignItems='flex-end'>{renderDriveModeBox(car.driveMode)}</Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}


const getTotalCost = (costPerDay, endDate, startDate, discount = 1) => {
  return Math.round(Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) * Number(costPerDay) * discount * 100) / 100;
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
      name: 'Limited Miles Per day',
      val: orderInfo.carInfo.limitMilePerDay
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
      val: getLocationById(searchData.pickUpLocation)
    },
    {
      name: 'Drop off Location',
      val: getLocationById(searchData.dropOffLocation)
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
            <Typography variant="h6" sx={{ fontWeight: 500, letterSpacing: 0.75 }}>{payment.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" sx={{ fontWeight: 500, letterSpacing: 0.75 }}>{payment.val}</Typography>
          </Grid>
        </React.Fragment>
      ))}
    </>
  )
}
export default function Review({ orderInfo, couponId, handleChange, discount = 1 }) {
  let totalCost = getTotalCost(orderInfo?.carInfo?.pricePerDay, orderInfo?.searchData?.dropOffTime, orderInfo?.searchData?.pickupTime, discount)

  return (
    <React.Fragment>
      <Title gutterBottom>
        Order summary
      </Title>
      <Grid container sx={{ flexGrow: 1, padding: '30px 0' }} justifyContent='center'>
        {renderCarInfo(orderInfo.carInfo)}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ mt: 2 }}>
          <Title gutterBottom>
            Basic Infomation:
          </Title>
          <Grid container sx={{ mt: 2 }}>
            {renderBasicInfo(orderInfo)}
          </Grid>
        </Grid>
        <Grid item container xs={12} md={6} sx={{ mt: 2 }}>
          <Title gutterBottom>
            Select Coupons:
          </Title>
          <Grid item xs={12} sx={{ mt: 2 }} >
            <Coupon couponId={couponId} handleChange={handleChange} />
          </Grid>
          <Grid container item xs={10} justifyContent='space-between' sx={{ padding: '20px 0', mt: 6 }}>
            <Title sx={{ fontWeight: 800 }}>
              Total Cost:
            </Title>
            <Title sx={{ fontWeight: 800 }}>
              ${totalCost}
            </Title>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}