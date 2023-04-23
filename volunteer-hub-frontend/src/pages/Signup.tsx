import React, { useState, useEffect } from "react";
import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import SessionService from "../utility/Services/SessionService";
import { useNavigate } from 'react-router-dom';
import { renderForm } from "./RenderForms";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const Signup = () => {
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();

  const [sessionInfo, setSessionInfo] = useState(SessionService.getUserInfo());
  const navigate = useNavigate();

  const userService: WebRequestsInterface = getWebRequest();
  useEffect(() => {
    if (SessionService.checkIsLoggedIn()) {
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
      SessionService.setUserInfo(user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                                user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
      setSessionInfo(SessionService.getUserInfo());
    } else {
      // email not found
      setErrorMessages({ name: "signup", message: "Sranje ti signup" });
    }
  };
  const inputFields = [
      {name:"firstName", labelName: "First name", errorName: "firstName"},
      {name:"lastName", labelName: "Last name", errorName: "lastName"},
      {name:"username", labelName: "Username", errorName: "uname"},
      {name:"email", labelName: "E-mail", errorName: "email"},
      {name:"pass", labelName: "Password", errorName: "pass"},
      {name:"role", labelName: "Role", errorName: "role"},
      {name:"phone", labelName: "Phone number", errorName: "phone"},
  ];

  if (SessionService.checkIsLoggedIn()) {
    navigate('/profile', { replace: true });
    return <></>
  } else {
    return renderForm(handleSubmit, errorMessages, inputFields, "Sign up");
  }
};

export default Signup;
