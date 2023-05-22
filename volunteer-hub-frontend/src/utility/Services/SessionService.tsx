export function isDebug() {
    return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}

export function getUserInfo() {
    const email = sessionStorage.getItem("email");
    const username = sessionStorage.getItem("username");
    return {
        email: email,
        username: username,
    };
}

export function setUserInfo(username: string, email: string) {
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("username", username);
}

export function setRole(isAdmin: boolean) {
    sessionStorage.setItem("role", isAdmin ? "admin" : "user");
}

export function getRole() {
    const email = sessionStorage.getItem("role");
}

export function __setJWTIgnore(ignore: boolean) {
    if (isDebug()) {
        sessionStorage.setItem("debugIgnoreJWT", ignore ? "true" : "false");
    }
}

export function __setAllVisibile(visible: boolean) {
    if (isDebug()) {
        sessionStorage.setItem("debugAllVisibility", visible ? "true" : "false");
    }
}

export function __setAuthToggle(toggle: boolean) {
    if (isDebug()) {
        sessionStorage.setItem("debugAuthToggle", toggle ? "true" : "false");
    }
}

export function __setIsVolunteer(toggle: boolean) {
    if (isDebug()) {
        sessionStorage.setItem("debugIsVolunteer", toggle ? "true" : "false");
    }
}

export function __getIsVolunteer() {
    if (isDebug()) {
        return sessionStorage.getItem("debugIsVolunteer");
    }
}

export function __setIsOrganization(toggle: boolean) {
    if (isDebug()) {
        sessionStorage.setItem("debugIsOrganization", toggle ? "true" : "false");
    }
}

export function __getIsOrganization() {
    if (isDebug()) {
        return sessionStorage.getItem("debugIsOrganization");
    }
}

export function clearSessionInfo() {
    sessionStorage.clear();
}

export function checkIsLoggedIn() {
    const id = sessionStorage.getItem('id');
    return id !== null && id !== undefined;
}
