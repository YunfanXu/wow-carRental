// import { getUserInfo } from "../utils/user";

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

    async getCarList() {
        const params = { ...this.params };
        params.method = 'GET';
        const data = Object.assign({}, params);
        let result = 400;
        try {
            result = await fetch(this.basePath + '/api/carInfo/valid', data)
                .then(response => response.json())
                .then(response => {
                    console.log("response", response)
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

    async getOffices() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        let result = 400;
        try {
            result = await fetch("http://67.207.80.139:8080/api/officeMaintain/OfficeInformation", requestOptions)
                .then(response => response.json())
                .then(response => {
                    if (response.code === 200 || response.message === 'success') {
                        console.log("office", response.data)
                        return response.data
                    } else {
                        return 400
                    }
                })
                .catch(error => console.log('error', error));
        } catch (e) {
            console.log("Error:", e.message)
        }
        return result;
    }
}