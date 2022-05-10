import { getUserInfo } from "../utils/user";

export default class UserApi {
    constructor() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        this.basePath = 'http://67.207.80.139:8080';
        this.params = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        }

    }

    async getCoupon() {
        const params = { ...this.params };
        const { id, token } = getUserInfo();
        params.headers.set("Authorization", token);
        params.method = 'GET';
        const data = Object.assign({}, params);
        let result = 400;
        try {
            result = await fetch(this.basePath + '/api/coupons/u/' + id, data)
                .then(response => response.json())
                .then(response => {
                    if (response.code === 0 || response.message === 'success') {
                        return response.data
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.log("Error:", e.message)
                })
        } catch (e) {
            console.log("Update User Address Error:", e.message)
        }
        return result;
    }

    async getUserOrders() {
        const params = { ...this.params };
        const { id, token } = getUserInfo();
        params.headers.set("Authorization", token);
        params.method = 'GET';
        const data = Object.assign({}, params);
        let result = 400;
        try {
            result = await fetch(this.basePath + '/api/order/u/' + id, data)
                .then(response => response.json())
                .then(response => {
                    console.log("getUserOrders", response)
                    if (response.code === 0 || response.message === 'success') {
                        return response.data
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.log("Error:", e.message)
                })
        } catch (e) {
            console.log("Update User Address Error:", e.message)
        }
        return result;
    }
    async createOrder(inputData) {
        const params = { ...this.params };
        const { token } = getUserInfo();
        params.headers.set("Authorization", token);
        params.method = 'POST';
        const data = Object.assign({}, params,
            { body: JSON.stringify(inputData) });
        let result = 400;
        try {
            console.log("order", JSON.stringify(inputData))
            result = await fetch(this.basePath + '/api/order', data)
                .then(response => response.json())
                .then(response => {
                    console.log("createOrder", response)
                    if (response.code === 200 || response.message === 'success') {
                        return response.code
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.log("Error:", e.message)
                })
        } catch (e) {
            console.log("Error:", e.message)
        }
        return result;
    }

    async createPayment(inputData) {
        const params = { ...this.params };
        const { token } = getUserInfo();
        params.headers.set("Authorization", token);
        params.method = 'POST';

        let uploadData = {
            paymentUnitDTOList: inputData.data,
            size: 0
        }
        const data = Object.assign({}, params,
            { body: JSON.stringify(uploadData) });
        let result = 400;
        console.log("INPUT createPayment", data.body)
        try {
            result = await fetch(this.basePath + '/api/payment/' + inputData.invoiceId, data)
                .then(response => response.json())
                .then(response => {
                    console.log("createPayment", response)
                    if (response.code === 200 || response.message === 'success') {
                        return response.data
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.log("Error:", e.message)
                })
        } catch (e) {
            console.log("Error:", e.message)
        }
        return result;
    }
}