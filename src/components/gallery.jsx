import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import GasMeterIcon from '@mui/icons-material/GasMeter';
import HdrAutoIcon from '@mui/icons-material/HdrAuto';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from "react-router-dom";
import carApi from '../api/car';

const theme = createTheme();

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

export default function CarsGallery(props) {
  const api = new carApi();
  const [carsData, setCarsData] = React.useState([]);
  React.useEffect(async () => {
    let carInfo = await api.getCarList();
    console.log("carInfo", carInfo)
    if (Array.isArray(carInfo)) {
      setCarsData(carInfo.filter(car => car.image_url));
    }
  }, [])
  return (
    <ThemeProvider theme={theme} >
      <main>
        {/* Hero unit */}
        <Box
          id="features"
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <div className='col-md-10 col-md-offset-1 section-title'>
              <h2 style={{ textAlign: 'center' }}>Featured Cars</h2>
            </div>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="xl">
          {/* End hero unit */}
          <Grid container spacing={2}>
            {carsData.map((car, index) => (
              <Grid item key={car.name + index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
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
                      <Grid item container xs={6}>{renderSeatBox(car.seats)}</Grid>
                      <Grid item container xs={6}>{renderGasBox(car.powerMode)}</Grid>
                      <Grid item container xs={6}>{renderOrilBox(car.mpg)}</Grid>
                      <Grid item container xs={6}>{renderDriveModeBox(car.driveMode)}</Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                      <Grid item xs={6}>
                        <Typography gutterBottom variant="h5" component="h2">
                          ${car.pricePerDay} / Day
                        </Typography>
                      </Grid>
                      <Grid item container xs={6}>
                        <Grid item xs={5}>
                          <IconButton aria-label="favoriteBorderIcon" color="warning">
                            <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                          </IconButton>
                        </Grid>
                        <Grid item xs={7} style={{ display: 'flex' }}>
                          <Link to="payment">
                            <Button variant="contained" size="medium">Rent Now</Button>
                          </Link>

                        </Grid>

                      </Grid>

                    </Grid>

                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider >
  );
}
