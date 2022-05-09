import * as React from 'react';
import orderApi from '../api/order';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { getLocationList } from '../utils/user';
import Typography from '@mui/material/Typography';

const api = new orderApi();

const convertDate = (date) => {
    var dateStr =
        ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
        ("00" + date.getDate()).slice(-2) + "/" +
        date.getFullYear() + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2);

    return dateStr;
}

const getStatusContent = (id) => {
    switch (id) {
        case 0:
            return 'Processing';
        case 1:
            return 'Need Payment';
        case 2:
            return 'Finished';
        default:
            return ''
    }
}

const getLocation = (locationList, locationId) => {
    if (!locationList) return '';
    const office = locationList.filter(location => location.officeId === locationId)[0];

    return office?.city + ' - ' + office?.name;
}

const renderBasicInfo = (data) => {
    return (
        <>
            {data.map((payment, index) => (
                <Grid container item xs={12} key={index}>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>{payment.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>{payment.val}</Typography>
                    </Grid>
                </Grid>
            ))}
        </>
    )
}

const getBasicInfo1 = (data) => {
    if (!data || !data) return [];
    let result = [];
    result.push(
        {
            name: 'Car Name',
            val: data.name
        },
        {
            name: 'Car VIN',
            val: data.vinId
        },
        {
            name: 'Daily Limited Miles',
            val: data.dailyLimitOdometer
        },
        {
            name: 'Pick up Time',
            val: convertDate(new Date(data.pickDate))
        },
        {
            name: 'Expected Drop off Time',
            val: convertDate(new Date(data.expectedDate))
        },
        {
            name: 'Pick up Location',
            val: getLocation(data.locationList, data.pickLocId)
        }

    );
    return result;
}

const getBasicInfo2 = (data) => {
    if (!data || !data) return [];
    let result = [];

    if (data.orderStatus !== 0) {

        result.push(
            {
                name: 'Drop off Location',
                val: getLocation(data.locationList, data.dropLocId)
            },
            {
                name: 'Drop off Time',
                val: convertDate(new Date(data.dropDate))
            }, {
            name: 'Basic Cost',
            val: data.basicCost
        }, {
            name: 'Total Cost',
            val: (data.extraCost || 0) + data.basicCost
        })
    }
    return result;
}
const getBasicInfoRow1 = (info) => {
    let data = getBasicInfo1(info);
    return renderBasicInfo(data);
}

const getBasicInfoRow2 = (info) => {
    let data = getBasicInfo2(info);
    return renderBasicInfo(data);
}
const RenderBoxHeader = ({ orderId, status }) => {
    return (
        <Grid container item xs={12} justifyContent='space-between'>
            <Typography variant="h6" gutterBottom>
                Order Number: {orderId}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Order Status: {getStatusContent(status)}
            </Typography>
        </Grid >
    )
}

const RenderMainBox = ({ info }) => {
    return (
        <Grid container item xs={12} spacing={2}>
            <Grid item xs={4}>
                <img src={info.imgUrl} style={{ objectFit: 'contain', width: '100%' }} />
            </Grid>
            <Grid item xs={4}>
                {getBasicInfoRow1(info)}
            </Grid>
            <Grid item xs={4}>
                {getBasicInfoRow2(info)}
            </Grid>
        </Grid>
    )
}

export default function OrderList({ handleOpenDialog }) {
    const [orderList, setOrderList] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            let response = await api.getUserOrders();
            if (response !== 400) {
                setOrderList(response);
            }
            return;
        }
        fetchData()
    }, [])
    const locationList = getLocationList();

    const RenderButton = ({ status, handleOpenDialog, invoiceId, orderInfo }) => {
        const handleClickButton = () => {
            handleOpenDialog(invoiceId, orderInfo)
        }
        let text = '';
        switch (status) {
            case 0:
                text = 'Processing';
                break;
            case 1:
                text = 'Pay for the Bill';
                break;
            case 2:
                text = 'Finished';
                break;
        }
        if (status === 1) {
            return (
                <Grid item container xs={12} justifyContent='flex-end'>
                    <Button variant="contained" onClick={handleClickButton} >
                        {text}
                    </Button>
                </Grid>
            )
        }
        return null;
    }
    return (
        <>
            {orderList?.map((order, index) => (
                <Grid item container key={order.orderVO.orderId + index} xs={12} sx={{ border: '2px solid #ffc107', borderBottom: '4px solid #ffc107', borderRadius: '20px', padding: '25px', marginTop: '30px' }}>
                    <RenderBoxHeader orderId={order.orderVO.orderId} status={order.orderVO.orderStatus} />
                    <RenderMainBox info={Object.assign({}, { locationList: locationList }, order?.orderVO, order?.orderVehicleVO)} />
                    <RenderButton status={order.orderVO.orderStatus} handleOpenDialog={handleOpenDialog} invoiceId={order?.invoiceId} orderInfo={order} />
                </Grid>
            ))}
        </>
    );
}
