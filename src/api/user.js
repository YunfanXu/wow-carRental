import { getUserInfo, getUserToken } from "../utils/user";
export default class UserApi {

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

    async login(userInfo) {
        const params = Object.assign({},
            this.params,
            { body: JSON.stringify(userInfo) });
        let result = 400;
        try {
            result = await fetch(this.basePath + '/login', params)
                .then(response => response.json())
                .then(response => {
                    if (response.message === 'success') {
                        return response.data
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.log("Error:", e.message)
                })
        } catch (e) {
            console.log("Fetch Error:", e.message)
        }
        return result;
    }

    async register(userInfo) {
        const params = { ...this.params };
        const data = Object.assign({},
            params,
            { body: JSON.stringify(userInfo) });
        let result = 400;
        try {
            result = await fetch(this.basePath + '/register', data)
                .then(response => response.json())
                .then(response => {
                    console.log("register", response)
                    if (response.message === 'success') {
                        return response.data
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.log("Error:", e.message)
                })
        } catch (e) {
            console.log("Register Error:", e.message)
        }
        return result;
    }


    async updateAddress(address) {
        const params = { ...this.params };
        const { id, token } = getUserInfo();
        params.headers.set("Authorization", token);
        params.method = 'PUT';
        const data = Object.assign({},
            params,
            { body: JSON.stringify(address) });
        let result = 400;
        try {
            result = await fetch(this.basePath + '/api/useraddress/' + id, data)
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
            console.log("Update User Address Error:", e.message)
        }
        return result;
    }

    async updateIndividual(individual) {
        const params = { ...this.params };
        const { id, token } = getUserInfo();
        params.headers.set("Authorization", token);
        params.method = 'PUT';
        const data = Object.assign({},
            params,
            { body: JSON.stringify(individual) });
        let result = 400;
        try {
            result = await fetch(this.basePath + '/api/individual/' + id, data)
                .then(response => response.text())
                .then(response => {
                    console.log("updateIndividual", response)
                    if (response.code === 200) {
                        return response.data
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.log("Error:", e.message)
                })
        } catch (e) {
            console.log("Update Individual Error:", e.message)
        }
        return result;
    }


    async getUserInfo() {
        const params = { ...this.params };
        const token = getUserToken();
        params.headers.set("Authorization", token);
        params.method = 'GET';
        const data = Object.assign({}, params);
        let result = 400;
        try {
            result = await fetch(this.basePath + '/api/user', data)
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
            console.log("Update Individual Error:", e.message)
        }
        return result;
    }

    async getCoupon() {
        const params = { ...this.params };
        const { id, token } = getUserInfo();
        params.headers.set("Authorization", token);
        params.method = 'GET';
        const data = Object.assign({}, params);
        let result = 400;
        try {
            result = await fetch(this.basePath + '/coupons/u/' + id, data)
                .then(response => response.json())
                .then(response => {
                    console.log("getCoupon", response);
                    if (response.code === 200) {
                        return response.data
                    } else {
                        return 400
                    }
                }).catch(e => {
                    console.log("Error:", e.message)
                })
        } catch (e) {
            console.log("Update Individual Error:", e.message)
        }
        return result;
    }
}

