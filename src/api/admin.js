import { getUserInfo, getUserToken } from "../utils/user";
export default class AdminApi {

    constructor() {
        var myHeaders = new Headers();
        myHeaders.set("Content-Type", "application/json");
        myHeaders.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        this.basePath = 'http://67.207.80.139:8086';
        this.params = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        }

    }

    async updateOffice(officeInfo) {
        console.log("INPUT officeInfo", officeInfo)
        const { officeId, ...address } = officeInfo;
        const params = { ...this.params };
        const { token } = getUserInfo();
        params.headers.set("Authorization", token);
        params.method = 'PUT';
        const data = Object.assign({},
            params,
            { body: JSON.stringify(address) });
        let result = 400;
        try {
            result = await fetch(this.basePath + '/api/office/' + officeId, data)
                .then(response => response.json())
                .then(response => {
                    console.log("updateOffice", response)
                    if (response.code === 200) {
                        return response.data
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.log("Error:", e.message)
                })
        } catch (e) {
            console.log("Update User OfficeInfo Error:", e.message)
        }
        return result;
    }

    async createOffice(officeInfo) {
        const params = { ...this.params };
        const {  token } = getUserInfo();
        params.headers.set("Authorization", token);
        params.method = 'POST';
        const data = Object.assign({},
            params,
            { body: JSON.stringify(officeInfo) });
        let result = 400;
        try {
            result = await fetch(this.basePath + '/api/office', data)
                .then(response => response.json())
                .then(response => {
                    console.log("createOffice", response)
                    if (response.code === 200) {
                        return response.data
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.log("Error:", e.message)
                })
        } catch (e) {
            console.log("Update User OfficeInfo Error:", e.message)
        }
        return result;
    }

    async createCorporation(inputData) {
        const params = { ...this.params };
        const { token } = getUserInfo();
        params.headers.set("Authorization", token);
        params.method = 'POST';
        const data = Object.assign({},
            params,
            { body: JSON.stringify(inputData) });
        let result = 400;
        try {
            result = await fetch(this.basePath + '/api/coupons/corporation', data)
                .then(response => response.json())
                .then(response => {
                    console.log("createCorporation", response)
                    if (response.code === 200) {
                        return response.data
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.log("Error:", e.message)
                })
        } catch (e) {
            console.log("Update User inputData Error:", e.message)
        }
        return result;
    }

    async createCouponsBatch(inputData) {
        const params = { ...this.params };
        const { token } = getUserInfo();
        params.headers.set("Authorization", token);
        params.method = 'POST';
        const data = Object.assign({},
            params,
            { body: JSON.stringify(inputData) });
        let result = 400;
        try {
            result = await fetch(this.basePath + '/api/couponsbatch', data)
                .then(response => response.json())
                .then(response => {
                    console.log("createCouponsBatch", response)
                    if (response.code === 200) {
                        return response.data
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.log("Error:", e.message)
                })
        } catch (e) {
            console.log("Update User inputData Error:", e.message)
        }
        return result;
    }
}

