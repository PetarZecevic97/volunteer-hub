import React, { useState } from "react";
import {
  LoginInputContainer,
  LoginTitle,
  LoginForm,
  LoginError,
  LoginSubmit,
  LoginInputText,
  LoginContainer,
  ButtonWrapper,
} from "../components/Login/styles/LoginStyles";
import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import SessionService from "../utility/Services/SessionService";
import { useNavigate } from 'react-router-dom';

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

  const handleSubmit = (event: any) => {
    signup(event);
  };

  const signup = async (event: any) => {
    //Prevent page reload
    event.preventDefault();

    var firstName = event.currentTarget.firstName.value;
    var lastName = event.currentTarget.lastName.value;
    var username = event.currentTarget.username.value;
    var email = event.currentTarget.email.value;
    var password = event.currentTarget.pass.value;
    var role = event.currentTarget.role.value;
    var phoneNumber = event.currentTarget.phone.value;
    const dataForSignup = {
      firstName,
      lastName,
      username,
      email,
      password,
      phoneNumber,
    }

    if(role === 'Organization') {
      await userService.signUpAsOrganization(dataForSignup);
      await userService.logIn(username, password);
      const dataForCreate = {
        id: sessionStorage.getItem('id'),
        organizationName: username,
        organizationId: sessionStorage.getItem('id'),
        summary: "",
      }

      await userService.createOrganization(dataForCreate);
    } else {
      await userService.signUpAsVolunteer(dataForSignup);
      await userService.logIn(username, password);
      const dataForCreate = {
        id: sessionStorage.getItem('id'),
        firstName,
        lastName,
        skils: [],
      }
      await userService.createVolunteer(dataForCreate);
    }
    const userStr = sessionStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : undefined;
    const id = sessionStorage.getItem('id');

    if (user && id) {
      const userData = role === 'Organization' ? await userService.getOrganizationById(id) : await userService.getVolunteerById(id);
      sessionStorage.setItem('userData', JSON.stringify(userData));
      SessionService.setUserInfo(user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                                user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
      setSessionInfo(SessionService.getUserInfo());
    } else {
      // email not found
      setErrorMessages({ name: "signup", message: "Sranje ti signup" });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name: string) => {
    if (errorMessages) {
      return (
        name === errorMessages.name && (
          <LoginError>{errorMessages.message}</LoginError>
        )
      );
    }
  };

  // Generate JSX code for login form
  const renderForm = (
    <form onSubmit={handleSubmit}>
    <LoginInputContainer>
      <label>First name</label>
      <LoginInputText name="firstName" required />
      {renderErrorMessage("firstName")}
    </LoginInputContainer>
      <LoginInputContainer>
        <label>Last name</label>
        <LoginInputText name="lastName" required />
        {renderErrorMessage("lastName")}
      </LoginInputContainer>
      <LoginInputContainer>
        <label>Username</label>
        <LoginInputText name="username" required />
        {renderErrorMessage("uname")}
      </LoginInputContainer>
      <LoginInputContainer>
        <label>E-mail </label>
        <LoginInputText name="email" required />
        {renderErrorMessage("uname")}
      </LoginInputContainer>
      <LoginInputContainer>
        <label>Password </label>
        <LoginInputText name="pass" required />
        {renderErrorMessage("pass")}
      </LoginInputContainer>
      <LoginInputContainer>
        <label>Role </label>
        <LoginInputText name="role" required />
        {renderErrorMessage("role")}
      </LoginInputContainer>
      <LoginInputContainer>
        <label>Phone number </label>
        <LoginInputText name="phone" required />
        {renderErrorMessage("phone")}
      </LoginInputContainer>

      <ButtonWrapper>
        <LoginSubmit type="submit" value="Submit" />
      </ButtonWrapper>
    </form>
  );

  if (SessionService.checkIsLoggedIn()) {
    const role = sessionStorage.getItem('role');
    role === 'Organization' ? navigate('/organization', { replace: true }) : navigate('/volunteer', { replace: true });
    return <></>
  } else {
    return (
      <LoginContainer>
        <LoginForm>
          <LoginTitle>Sign Up</LoginTitle>
          {renderForm}
        </LoginForm>
      </LoginContainer>
    );
  }
};

export default Signup;
