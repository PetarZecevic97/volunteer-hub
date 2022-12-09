import React from "react";

const SessionService = {
  setUserInfo: (username: string, email: string) => {
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("username", username);
    dispatchEvent(new Event("session"));
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
    dispatchEvent(new Event("session"));
  },
  checkIsLoggedIn: () => {
    return !(
      (sessionStorage.getItem("email") === "" &&
      sessionStorage.getItem("username") === "")
      ||
      (sessionStorage.getItem("email") === null &&
      sessionStorage.getItem("username") === null)
    );
  },
};

export default SessionService;
