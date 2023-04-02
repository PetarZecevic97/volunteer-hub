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
// import HashingAlgService from "../utility/Services/HashingAlgService";
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
    // var hashPass = HashingAlgService.getHash(pass);
    
    var username = event.currentTarget.username.value;

    // Find user login info
    await userService.logIn(username, pass);
    const userStr = sessionStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : undefined;
    const id = sessionStorage.getItem('id');

    if (user && id) {
      console.dir(user);
      const role = sessionStorage.getItem('role');
      const userData = role === 'Organization' ? await userService.getOrganizationById(id) : await userService.getVolunteerById(id);
      sessionStorage.setItem('userData', JSON.stringify(userData));
      SessionService.setUserInfo(user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                                user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
      setSessionInfo(SessionService.getUserInfo());
      
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

