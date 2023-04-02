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
import IUser from "../Entities/User";
import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import HashingAlgService from "../utility/Services/HashingAlgService";
import SessionService from "../utility/Services/SessionService";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const Signup = () => {
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();

  const [sessionInfo, setSessionInfo] = useState(SessionService.getUserInfo());

  const userService: WebRequestsInterface = getWebRequest();

  const handleSubmit = (event: any) => {
    signup(event);
  };

  const signup = async (event: any) => {
    //Prevent page reload
    event.preventDefault();

    var username = event.currentTarget.username.value;
    var email = event.currentTarget.email.value;
    var pass = event.currentTarget.pass.value;

    // var pass = HashingAlgService.getHash(event.currentTarget.pass.value);
    // Find user login info
    const userData = await userService.createUser(username, email, pass);

    if (userData) {
      SessionService.setUserInfo(userData.data.username, userData.data.email);
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

      <ButtonWrapper>
        <LoginSubmit type="submit" value="Submit" />
      </ButtonWrapper>
    </form>
  );

  if (SessionService.checkIsLoggedIn()) {
    return <LoginContainer>{sessionInfo.username} is logged in</LoginContainer>;
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
