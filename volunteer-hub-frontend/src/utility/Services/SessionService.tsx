export function isDebug() {
    return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}

export function getUserInfo() {
    const email = sessionStorage.getItem("email");
    const username = sessionStorage.getItem("username");
    console.log({
        email: email,
        username: username,})
    return {
        email: email,
        username: username,
    };
}

export function setUserInfo(_username: string, _email: string) {
    sessionStorage.setItem("email", _email);
    sessionStorage.setItem("username", _username);
}

export function setDebugValue(_toggledValue: boolean, _string: string) {
    if(isDebug()){
        sessionStorage.setItem(_string, _toggledValue ? "true" : "false");
    }
}

export function getDebugValue(_string: string) {
    if(isDebug()){
        return sessionStorage.getItem(_string);
    }
    throw Error("Debug value manipulation restricted while not in dev build!")
}

export function checkIsLoggedIn() {
    const id = sessionStorage.getItem('id');
    return id !== null && id !== undefined;
}
