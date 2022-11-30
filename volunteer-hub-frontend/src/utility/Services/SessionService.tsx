import React from "react";

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
    return !(
      sessionStorage.getItem("email") == undefined &&
      sessionStorage.getItem("username") == undefined
    );
  },
};

export default SessionService;
