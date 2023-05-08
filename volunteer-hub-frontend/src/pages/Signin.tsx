import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import SessionService from "../utility/Services/SessionService";
import { EMAIL, NAME } from "../utility/jwtFields";
import { inputFieldsforSignin } from "../utility/formInputFields";
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
      SessionService.setUserInfo(user[NAME], user[EMAIL]);
      setSessionInfo(SessionService.getUserInfo());
      
    } else {
      // email not found
      setErrorMessages({ name: "login", message: "Sranje ti login" });
    }
  };
  
  if (SessionService.checkIsLoggedIn()) {
    return <></>
  } else {
    return renderForm(handleSubmit, errorMessages, inputFieldsforSignin, "Log in");
  }
};

export default Signin;

