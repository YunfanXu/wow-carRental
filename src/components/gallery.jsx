import * as React from 'react';
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
import carApi from '../api/car';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import { getUserInfo } from '../utils/user';
import { useNavigate } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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

export default function CarsGallery({ searchData }) {
  const api = new carApi();
  const [carsData, setCarsData] = React.useState([]);
  const [renderData, setRenderData] = React.useState([]);
  const [sortVal, setSortVal] = React.useState('');
  const [openSnack, setOpenSnack] = React.useState({
    open: false,
    message: ''
  });

  let navigate = useNavigate();


  let carList = [];

  const handleClose = () => {
    setOpenSnack({ ...openSnack, open: false });
  };

  const handleSortChange = (e) => {
    let type = e.target.value;
    setSortVal(type);
    if (type === 'Year') {
      sortByYear();
    } else if (type === 'Price') {
      sortByPrice();
    }
  }

  const sortByPrice = (isAsc = true) => {
    setRenderData(renderData.sort((a, b) => {
      if (isAsc) {
        return Number(a.pricePerDay) - Number(b.pricePerDay);
      }
      return Number(b.pricePerDay) - Number(a.pricePerDay)
    }));
  }

  const sortByYear = (isAsc = false) => {
    setRenderData(renderData.sort((a, b) => {
      if (isAsc) {
        return Number(a.year) - Number(b.year);
      }
      return Number(b.year) - Number(a.year)
    }));
  }

  const filterByType = (type) => {
    if (type === 'All') {
      setRenderData(carsData);
    } else {
      setRenderData(carsData.filter(car => car.class_type === type));
    }
  }

  const fetchCarlist = async () => {
    carList = await api.getCarList();
    if (Array.isArray(carList)) {
      setCarsData(carList.filter(car => car.image_url));
      setRenderData(carList.filter(car => car.image_url));
    }
  }

  React.useEffect(() => {
    if (carList.length === 0) {
      fetchCarlist();
    }
  }, [])

  React.useEffect(() => {
    if (searchData && searchData.class_type) {
      filterByType(searchData.class_type)
    }
  }, [searchData])

  const handleRent = (car) => {
    let userInfo = getUserInfo();
    console.log('----searchData', searchData)
    if (!userInfo || !userInfo.token) {
      setOpenSnack({
        open: true,
        message: 'Please Login First!'
      });
    } else if (!searchData) {
      setOpenSnack({
        open: true,
        message: 'Please Fill in the Search bar!'
      });
    } else {
      navigate('/payment', {
        state: {
          carInfo: { ...car },
          searchData
        }
      })
    }
  }

  return (
    <ThemeProvider theme={theme} >
      <main>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openSnack.open}
          onClose={handleClose}
          autoHideDuration={3000}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            {openSnack.message}
          </Alert>
        </Snackbar>
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
          <Grid container >
            <Grid item xs={6} md={4} container alignItems='center'>
              <Typography variant="h6" display="block" gutterBottom>
                SORT BY:
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={sortVal}
                  onChange={handleSortChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'Price'}>Price</MenuItem>
                  <MenuItem value={'Year'}>Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>

          </Grid>
          <Grid container spacing={2}>
            {renderData.map((car, index) => (
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
                      <Grid item container xs={6}>{renderSeatBox(car.seat)}</Grid>
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
                          <Button variant="contained" size="medium" onClick={() => handleRent(car)}>Rent Now</Button>
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
