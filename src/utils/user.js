const USER_INFO = 'user_info';
const USER_TOKEN = 'user_token';

export function setToken(token) {
    return localStorage.setItem(USER_TOKEN, JSON.stringify(token));
}

export function removeToken() {
    localStorage.removeItem(USER_TOKEN);
    return;
}

export function setUser(user) {
    return localStorage.setItem(USER_INFO, JSON.stringify(user));
}

export function removeUser() {
    localStorage.removeItem(USER_INFO);
    return;
}

export function getUserInfo() {
    return JSON.parse(localStorage.getItem(USER_INFO));
}

export function getUserToken() {
    return JSON.parse(localStorage.getItem(USER_TOKEN));

}