import React, { useState } from "react";
import {
  LoginInputContainer,
  LoginTitle,
  LoginForm,
  LoginError,
  LoginSubmit,
  LoginInputText,
  LoginContainer,
  SignUpBtn,
  ButtonWrapper,
} from "../components/Login/styles/LoginStyles";
import IUser from "../Entities/User";
import { WebRequestsInterface } from "../webRequests/webRequests-int";
import { WebRequestMock } from "../webRequests/webRequestsMock";
import getWebRequest from "../webRequests/webRequestsProvider";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const Signin = () => {
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNewUser, setNewUser] = useState(false);

  const [sessionInfo, setSessionInfo] = useState<IUser>();

  const userService: WebRequestsInterface = getWebRequest();

  const errors = {
    email: "Invalid email",
    pass: "Invalid password",
  };

  const handleSubmit = (event: any) => {
    if (!isNewUser) {
      login(event);
    } else {
      signup(event);
    }
  };

  const login = async (event: any) => {
    //Prevent page reload
    event.preventDefault();
    var email = event.currentTarget.email.value;
    var pass = event.currentTarget.pass.value;

    // Find user login info
    const userData = await userService.getUser(email, pass);

    if (userData) {
      setSessionInfo(userData.data[0]);
    } else {
      // email not found
      setErrorMessages({ name: "login", message: "Sranje ti login" });
    }
  };

  const signup = async (event: any) => {
    //Prevent page reload
    event.preventDefault();

    var email = event.currentTarget.email.value;
    var pass = event.currentTarget.pass.value;

    // Find user login info
    const userData = await userService.createUser(email, pass);

    if (userData) {
      setSessionInfo(userData.data);
    } else {
      // email not found
      setErrorMessages({ name: "signup", message: "Sranje ti signup" });
    }
  };

  const handleClick = (event: any) => {
    if (!isNewUser) {
      setNewUser(true);
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

      {!isNewUser && (
        <ButtonWrapper>
          <SignUpBtn
            type="button"
            onClick={handleClick}
            value="Create new account"
          />
        </ButtonWrapper>
      )}
    </form>
  );

  if (sessionInfo) {
    return <LoginContainer>{sessionInfo.email} is logged in</LoginContainer>;
  } else {
    return (
      <LoginContainer>
        <LoginForm>
          {!isNewUser && (<LoginTitle>Log In</LoginTitle>) }
          { isNewUser && (<LoginTitle>Sign Up</LoginTitle>) }
          {renderForm}
        </LoginForm>
      </LoginContainer>
    );
  }
};

export default Signin;
