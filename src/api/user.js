import { Mode } from "@mui/icons-material";

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

    async login(userInfo) {
        const params = Object.assign({},
            this.params,
            { body: JSON.stringify(userInfo) });
        let result = 400;
        try {
            result = await fetch(this.basePath + '/login', params)
                .then(response => response.json())
                .then(response => {
                    console.log("response", response)
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

}