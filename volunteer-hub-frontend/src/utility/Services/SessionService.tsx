const SessionService = {
  setUserInfo: (username: string, email: string) => {
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("username", username);
  },
  setRole: (isAdmin: boolean) => {
    sessionStorage.setItem("role", isAdmin ? "admin" : "user");
  },
  getRole: () => {
    const email = sessionStorage.getItem("role");
  },
  getBuild: () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return true;
    } else {
      return false;
    }
  },
  setJWTIgnore: (ignore: boolean) => {
    sessionStorage.setItem("debugIgnoreJWT", ignore ? "true" : "false");
  },
  setAllVisibile: (visible: boolean) => {
    sessionStorage.setItem("debugAllVisibility", visible ? "true" : "false");
  },
  setAuthToggle: (toggle: boolean) => {
    sessionStorage.setItem("debugAuthToggle", toggle ? "true" : "false");
  },
  setIsVolunteer: (toggle: boolean) => {
    sessionStorage.setItem("debugIsVolunteer", toggle ? "true" : "false");
  },
  getIsVolunteer: () => {
    return sessionStorage.getItem("debugIsVolunteer");
  },
  setIsOrganization: (toggle: boolean) => {
    sessionStorage.setItem("debugIsOrganization", toggle ? "true" : "false");
  },
  getIsOrganization: () => {
    return sessionStorage.getItem("debugIsOrganization");
  },
  getUserInfo: () => {
    const email = sessionStorage.getItem("email");
    const username = sessionStorage.getItem("username");
    return {
      email: email,
      username: username,
    };
  },
  clearSessionInfo: () => {
    sessionStorage.clear();
  },
  checkIsLoggedIn: () => {
    const id = sessionStorage.getItem('id');
    return id !== null && id !== undefined;
  },
};

export default SessionService;
