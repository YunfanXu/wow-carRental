import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PaymentForm from './PaymentForm';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import api from '../api/order';
import AlertBox from './admin/AlertBox';
import Confetti from "react-confetti";
import { useWindowSize } from 'react-use';

const initPaymentInfo = {
    amount: 0,
    cardName: '', // consist of fname + " " + lname
    cardNum: '',
    expireDate: '',
    city: '',
    country: '',
    state: '',
    zipcode: '',
    cvv: '',
    address1: '',
    address2: '',

}

const getPaymentCardDTO = (paymentInfo, userId) => {
    let [fname, lname] = paymentInfo.cardName.split(' ');
    let output = {
        payAmount: paymentInfo.amount,
        paymentCardDTO: {
            fname,
            lname,
            cardNum: paymentInfo.cardNum,
            expireDate: paymentInfo.expireDate,
            userId,
            cardNum: paymentInfo.cardNum,
            street: paymentInfo.address1 + '\n' + paymentInfo.address2,
            city: paymentInfo.city,
            state: paymentInfo.state,
            zipcode: paymentInfo.zipcode,
            country: paymentInfo.country,
        },
    }
    return output;
}
export default function PaymentDialog({ open, handleClose }) {
    const { width, height } = useWindowSize()

    const orderAPI = new api();
    const orderInfo = open?.orderInfo;
    const [paymentInfoList, setPaymentInfoList] = React.useState([{ ...initPaymentInfo }, { ...initPaymentInfo }, { ...initPaymentInfo }]);
    const [currentPaymentInfo, setCurrentPaymentInfo] = React.useState(paymentInfoList[0]);

    const [loading, setLoading] = React.useState(false);
    const [isChecked, setChecked] = React.useState(false);
    const [cardIndex, setCardIndex] = React.useState(0);
    const [alertInfo, setAlertInfo] = React.useState({ isOpen: false });
    const [startAnimation, setStartAnimation] = React.useState(false);

    const wrapperSetInfo = (info) => {
        setAlertInfo({
            ...info,
            isOpen: true
        });
        setTimeout(() => {
            setAlertInfo({
                ...info,
                isOpen: false
            });
        }, 3000);
    }

    const handleCheckChange = (event) => {
        setChecked(event.target.checked);
    }

    const handleSelect = (event) => {
        let currentIndex = event.target.value;
        let tempList = JSON.parse(JSON.stringify(paymentInfoList));
        tempList[cardIndex] = { ...currentPaymentInfo };
        setPaymentInfoList(tempList);
        setCurrentPaymentInfo(paymentInfoList[currentIndex]);
        setCardIndex(currentIndex);
    }


    const handlePaymentInfoChange = (e) => {
        setCurrentPaymentInfo({
            ...currentPaymentInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        let paymentAmount = Number(orderInfo.orderVO.basicCost + orderInfo.orderVO.extraCost);
        let userId = Number(orderInfo.orderVO.userId);
        let inputData = {
            invoiceId: Number(open.invoiceId),
            data: []
        }

        if (!isChecked) {
            let cardDTO = getPaymentCardDTO(currentPaymentInfo, userId) || {};
            cardDTO.paymentAmount = paymentAmount;
            inputData.data.push(cardDTO);
        } else {
            let currentAmount = Number(data.get('amount'));
            let list = paymentInfoList.filter((item, index) => index !== cardIndex);
            let totalSum = Number(list[0].amount) + Number(list[1].amount) + currentAmount;
            if (totalSum !== paymentAmount) {
                wrapperSetInfo({
                    textType: 'error',
                    textContent: "Failed! The Payment Amount is not correct!"
                });
            } else {
                paymentInfoList.forEach(paymentInfo => {
                    let cardDTO = getPaymentCardDTO(paymentInfo, userId);
                    if (cardDTO) {
                        inputData.data.push(cardDTO);
                    }
                });
            }
        }
        let response = await orderAPI.createPayment(inputData);
        if (response && response.status === 1) {
            setStartAnimation(true);
            handleClose();
        }
        setLoading(false);

    }

    const handleAminationComplete = (confetti) => {
        if (startAnimation) {
            confetti.reset()
        }
    }
    return (
        <div>
            <Confetti
                run={startAnimation}
                width={width}
                height={height}
                numberOfPieces={1000}
                recycle={false}
                gravity={0.15}
                onConfettiComplete={(confetti) => handleAminationComplete(confetti)}
            />

            <Dialog open={open.isOpen} onClose={handleClose}>
                <DialogTitle>
                    <Typography variant="h4" gutterBottom component="div">
                        Payment
                    </Typography>
                </DialogTitle>
                <Box component="form" Validate onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={3} sx={{ mb: 7 }}>
                            <Grid item xs={6} md={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox value={isChecked} onChange={handleCheckChange} />
                                    } label="Split the Bill" />
                            </Grid>
                            <Grid container item xs={6} sx={{ height: 10 }}>
                                {isChecked ? (
                                    <>
                                        <FormControl fullWidth>
                                            <InputLabel>Select Card</InputLabel>
                                            <Select
                                                value={cardIndex}
                                                label="Card Index"
                                                onChange={handleSelect}
                                            >
                                                <MenuItem value={0}>Payment Card 1</MenuItem>
                                                <MenuItem value={1}>Payment Card 2</MenuItem>
                                                <MenuItem value={2}>Payment Card 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </>
                                ) : null}
                            </Grid>
                        </Grid>
                        <PaymentForm paymentInfo={currentPaymentInfo} isChecked={isChecked} handleChange={handlePaymentInfoChange} />
                    </DialogContent>

                    <DialogActions >
                        <Button
                            variant="contained"
                            onClick={handleClose}
                            sx={{ mt: 3, mb: 2, mr: 7, width: '100px' }}
                        >Cancel</Button>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            loading={loading}
                            sx={{ mt: 3, mb: 2, mr: 2, width: '100px' }}
                        >
                            Confirm
                        </LoadingButton>
                    </DialogActions>
                    <AlertBox alertInfo={alertInfo} handleClose={() => setAlertInfo({ isOpen: false })} />
                </Box>
            </Dialog>
        </div>
    );
}
