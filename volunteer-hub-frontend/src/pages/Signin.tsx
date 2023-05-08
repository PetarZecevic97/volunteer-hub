import React, { useEffect, useState } from "react";
import SessionService from "../utility/Services/SessionService";
import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import { useNavigate } from 'react-router-dom';
import { renderForm } from "../components/RenderForms";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const Signin = () => {
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();
  const [sessionInfo, setSessionInfo] = useState(SessionService.getUserInfo());
  const navigate = useNavigate();

  const userService: WebRequestsInterface = getWebRequest();
  useEffect(() => {
    if (SessionService.checkIsLoggedIn()) {
      navigate('/profile', { replace: true });
    }
  }, [sessionInfo]);

  const handleSubmit = async (event: any) => {
    //Prevent page reload
    event.preventDefault();
    const pass = event.currentTarget.pass.value;    
    const username = event.currentTarget.username.value;

    // Find user login info
    await userService.logIn(username, pass);
    const userStr = sessionStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : undefined;
    const id = sessionStorage.getItem('id');

    if (user && id) {
      SessionService.setUserInfo(user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                                user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
      setSessionInfo(SessionService.getUserInfo());
      
    } else {
      // email not found
      setErrorMessages({ name: "login", message: "Sranje ti login" });
    }
  };

  const inputFields = [
      {name:"username", labelName: "Username", errorName: "uname"},
      {name:"pass", labelName: "Password", errorName: "pass"},
  ];
  
  if (SessionService.checkIsLoggedIn()) {
    return <></>
  } else {
    return renderForm(handleSubmit, errorMessages, inputFields, "Log in");
  }
};

export default Signin;

