import { getUserInfo, setLocationList } from "../utils/user";
export default class AdminApi {

    constructor() {
        var myHeaders = new Headers();
        myHeaders.set("Content-Type", "application/json");
        myHeaders.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        this.basePath = 'http://67.207.80.139:8080/api/officeMaintain';
        this.params = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        }

    }

    async getOffices() {
        const params = { ...this.params };
        params.method = 'GET';
        let result = 400;
        try {
            result = await fetch(this.basePath + '/getOfficeInfo', params)
                .then(response => response.json())
                .then(response => {
                    if (response.code === 200 || response.message === 'success') {
                        console.log("office", response.data)
                        setLocationList(response.data);
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

    async updateOffice(officeInfo, officeId) {
        const params = { ...this.params };
        const { token } = getUserInfo();
        params.headers.set("Authorization", token);
        params.method = 'PUT';
        const data = Object.assign({},
            params,
            { body: JSON.stringify(officeInfo) });
        let result = 400;
        try {
            result = await fetch(this.basePath + '/updateOffice/' + officeId, data)
                .then(response => response.json())
                .then(response => {
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
        const { token } = getUserInfo();
        params.headers.set("Authorization", token);
        params.method = 'POST';
        const data = Object.assign({},
            params,
            { body: JSON.stringify(officeInfo) });
        let result = 400;
        try {
            result = await fetch(this.basePath + '/createOfficeInfo', data)
                .then(response => response.json())
                .then(response => {
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
}

