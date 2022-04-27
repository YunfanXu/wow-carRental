export function setToken(token) {
    return localStorage.setItem('user_token', token);
}

export function removeToken() {
    localStorage.removeItem('user_token');
    return;
}

export function setUser(User) {
    return localStorage.setItem('user_info', JSON.stringify(User));
}

export function removeUser() {
    localStorage.removeItem('user_info');
    return;
}