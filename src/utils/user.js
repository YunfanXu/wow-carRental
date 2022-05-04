const USER_INFO = 'user_info';
const USER_TOKEN = 'user_token';
const SEARCH_INFO = 'SEARCH_INFO';

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
export function setSearchInfo(data) {
    return localStorage.setItem(SEARCH_INFO, JSON.stringify(data));
}

export function getSearchInfo() {
    return JSON.parse(localStorage.getItem(SEARCH_INFO));
}

export function removeSearchInfo() {
    localStorage.removeItem(SEARCH_INFO);
    return;
}
