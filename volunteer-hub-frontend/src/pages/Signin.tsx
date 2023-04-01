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
import SessionService from "../utility/Services/SessionService";
import HashingAlgService from "../utility/Services/HashingAlgService";
import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const Signin = () => {
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();

  const [sessionInfo, setSessionInfo] = useState(SessionService.getUserInfo());

  const userService: WebRequestsInterface = getWebRequest();
  

  const handleSubmit = (event: any) => {
    login(event);
  };

  const login = async (event: any) => {
    //Prevent page reload
    event.preventDefault();
    
    var pass = event.currentTarget.pass.value;
    var hashPass = HashingAlgService.getHash(pass);
    
    var username = event.currentTarget.username.value;

    const isValid = await HashingAlgService.isLoginValid(pass, username);
    // Find user login info
    const userData = isValid ? 
                     await userService.getUser("", hashPass, username) : 
                     undefined;

    if (userData) {
      console.dir(userData.data[0]);
      SessionService.setUserInfo(userData.data[0]["username"], userData.data[0]["email"]);
      setSessionInfo(SessionService.getUserInfo());
      // console.log(userData.data);
      
    } else {
      // email not found
      setErrorMessages({ name: "login", message: "Sranje ti login" });
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
        <label>Username </label>
        <LoginInputText name="username" required />
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
          <LoginTitle>Log In</LoginTitle>
          {renderForm}
        </LoginForm>
      </LoginContainer>
    );
  }
};

export default Signin;

