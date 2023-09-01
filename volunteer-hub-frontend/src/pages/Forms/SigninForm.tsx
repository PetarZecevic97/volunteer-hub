import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { WebRequestsInterface } from "../../webRequests/webRequests-int";
import getWebRequest from "../../webRequests/webRequestsProvider";
import { inputFieldsforSignin } from "../../utility/formInputFields";
import { renderForm } from "../../components/RenderForms";
import {checkIsLoggedIn, getUserInfo, setUserInfo} from "../../utility/Services/SessionService";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const Signin = () => {
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();
  const [sessionInfo, setSessionInfo] = useState(getUserInfo());
  const navigate = useNavigate();

  const userService: WebRequestsInterface = getWebRequest();
  useEffect(() => {
    if (checkIsLoggedIn()) {
      navigate('/profile', { replace: true });
    }
  }, [sessionInfo]);

  const handleSubmit = async (event: any) => {
    //Prevent page reload
    event.preventDefault();
    const password = event.currentTarget.password.value;    
    const username = event.currentTarget.username.value;

    // Find user login info
    await userService.logIn(username, password);
    const userStr = sessionStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : undefined;
    const id = sessionStorage.getItem('id');

    if (user && id) {
      setUserInfo(user.name, user.email);
      setSessionInfo(getUserInfo());
      
    } else {
      // email not found
      setErrorMessages({ name: "login", message: "Invalid login" });
    }
  };

  const handleRedirect = (path: string) => {
    navigate('/' + path, {replace:true})
  }
  
  if (checkIsLoggedIn()) {
    return <></>
  } else {
    return renderForm(
      handleSubmit, 
      errorMessages, 
      inputFieldsforSignin, 
      "Log in", 
      handleRedirect
    );
  }
};

export default Signin;

