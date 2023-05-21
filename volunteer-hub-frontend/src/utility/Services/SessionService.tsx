const SessionService = {
  setUserInfo: (username: string, email: string) => {
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("username", username);
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
