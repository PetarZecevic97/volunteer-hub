import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { WebRequestsInterface } from "../../webRequests/webRequests-int";
import getWebRequest from "../../webRequests/webRequestsProvider";
import { inputFieldsforSignup } from "../../utility/formInputFields";
import { renderForm } from "../../components/RenderForms";
import {checkIsLoggedIn, getUserInfo, setUserInfo} from "../../utility/Services/SessionService";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const Signup = () => {
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();

  const [sessionInfo, setSessionInfo] = useState(getUserInfo());
  const navigate = useNavigate();

  const userService: WebRequestsInterface = getWebRequest();
  useEffect(() => {
    if (checkIsLoggedIn()) {
      const role = sessionStorage.getItem('role');
      if('Organization' === role) {
        navigate('/create-org-form', { replace: true });
      } else if('Volunteer') {
        navigate('/create-volunteer-form', { replace: true });
      }
    }
  }, [sessionInfo]);

  const handleSubmit = async (event: any) => {
    //Prevent page reload
    event.preventDefault();

    const username = event.currentTarget.username.value;
    const password = event.currentTarget.pass.value;
    const role = event.currentTarget.role.value;
    const dataForSignup = {
      firstName: event.currentTarget.firstName.value,
      lastName: event.currentTarget.lastName.value,
      username,
      email: event.currentTarget.email.value,
      password,
      phoneNumber: event.currentTarget.phone.value,
    }

    if(role === 'Organization') {
      await userService.signUpAsOrganization(dataForSignup);
    } else {
      await userService.signUpAsVolunteer(dataForSignup);
    }

    await userService.logIn(username, password);
    const userStr = sessionStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : undefined;
    const id = sessionStorage.getItem('id');

    if (user && id) {
      setUserInfo(user.name, user.email);
      setSessionInfo(getUserInfo());
    } else {
      // email not found
      setErrorMessages({ name: "signup", message: "Sranje ti signup" });
    }
  };
  const handleRedirect = (path: string) => {
    navigate('/' + path, {replace:true})
  }

  if (checkIsLoggedIn()) {
    navigate('/profile', { replace: true });
    return <></>
  } else {
    return renderForm(
      handleSubmit, 
      errorMessages, 
      inputFieldsforSignup, 
      "Sign up",
      handleRedirect
    );
  }
};

export default Signup;
