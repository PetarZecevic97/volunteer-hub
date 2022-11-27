import React from "react";

const SessionService = {
  setUserInfo: (username: string, email: string) => {
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("usernam", username);
  },
  getUserInfo: () => {
    const email = sessionStorage.getItem("email");
    const username = sessionStorage.getItem("username");
    return { 
        email: email, 
        username: username 
    };
  },
  clearSessionInfo: () => {
    sessionStorage.clear();
  },
};

export default SessionService;
