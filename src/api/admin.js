import { getUserInfo, getUserToken } from "../utils/user";
export default class AdminApi {

    constructor() {
        var myHeaders = new Headers();
        myHeaders.set("Content-Type", "application/json");
        myHeaders.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        this.basePath = 'http://67.207.80.139:8080';
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
            result = await fetch(this.basePath + '/api/officeMaintain/updateOffice/' + officeId, data)
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
            result = await fetch(this.basePath + '/api/officeMaintain/createOfficeInfo', data)
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
}

