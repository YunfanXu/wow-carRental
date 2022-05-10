import { getUserInfo, setManufacture, setModelList } from "../utils/user";

export default class CarApi {
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

    async getCarList() {
        const params = { ...this.params };
        params.method = 'GET';
        const data = Object.assign({}, params);
        let result = 400;
        try {
            await this.getManufacture();
            await this.getModelList();
            result = await fetch(this.basePath + '/api/carInfo/1', data)
                .then(response => response.json())
                .then(response => {
                    if (response.code === 200 || response.message === 'success') {
                        console.log("getCarList", response.data)
                        return response.data
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.error("Error:", e.message)
                })
        } catch (e) {
            console.error("Error:", e.message)
        }
        return result;
    }

    async getManufacture() {
        const params = { ...this.params };
        params.method = 'GET';
        const data = Object.assign({}, params);
        let result = 400;
        try {
            result = await fetch(this.basePath + '/api/manufacture', data)
                .then(response => response.json())
                .then(response => {
                    if (response.code === 200 || response.message === 'success') {
                        setManufacture(response.data);
                        return response.data
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.error("Error:", e.message)
                })
        } catch (e) {
            console.error("Error:", e.message)
        }
        return result;
    }

    async getModelList() {
        const params = { ...this.params };
        params.method = 'GET';
        const data = Object.assign({}, params);
        let result = 400;
        try {
            result = await fetch(this.basePath + '/api/model', data)
                .then(response => response.json())
                .then(response => {
                    if (response.code === 200 || response.message === 'success') {
                        setModelList(response.data);
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

    async deleteCar(inputData) {
        const params = { ...this.params };
        const { token } = getUserInfo();
        params.headers.set("Authorization", token);
        params.method = 'DELETE';
        const data = Object.assign({}, params,
            {
                body: JSON.stringify(inputData)
            });
        let result = 400;
        try {
            result = await fetch(this.basePath + '/api/carInfo', data)
                .then(response => response.json())
                .then(response => {
                    console.log("response", response)
                    if (response.code === 200) {
                        return response.data
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.log("Error:", e.message)
                })
        } catch (e) {
            console.log("Update User carInfo Error:", e.message)
        }
        return result;
    }

    async updateCar(carInfo) {
        console.log("carInfo", JSON.stringify(carInfo))
        const params = { ...this.params };
        const { token } = getUserInfo();
        params.headers.set("Authorization", token);
        params.method = 'PUT';
        const data = Object.assign({},
            params,
            { body: JSON.stringify(carInfo) });
        let result = 400;
        try {
            result = await fetch(this.basePath + '/api/carInfo', data)
                .then(response => response.json())
                .then(response => {
                    if (response.code === 200 || response.message === 'success') {
                        return response.code
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.log("Error:", e.message)
                })
        } catch (e) {
            console.log("Update User carInfo Error:", e.message)
        }
        return result;
    }

    async createCar(carInfo) {
        const params = { ...this.params };
        const { token } = getUserInfo();
        params.headers.set("Authorization", token);
        params.method = 'POST';
        const data = Object.assign({},
            params,
            { body: JSON.stringify(carInfo) });
        let result = 400;
        try {
            result = await fetch(this.basePath + '/api/carInfo', data)
                .then(response => response.json())
                .then(response => {
                    if (response.code === 200 || response.message === 'success') {
                        return response.code
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.error("Error:", e.message)
                })
        } catch (e) {
            console.error("Update User carInfo Error:", e.message)
        }
        return result;
    }
}