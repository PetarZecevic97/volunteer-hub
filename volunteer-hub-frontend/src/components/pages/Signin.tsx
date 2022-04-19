import React, { useState } from "react";
import {
  LoginInputContainer,
  LoginTitle,
  LoginForm,
  LoginError,
  LoginButton,
  LoginSubmit,
  LoginInputText,
  LoginContainer,
  SignUpBtn,
} from "../Login/styles/LoginStyles";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const Signup = () => {
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    uname: "Invalid username",
    pass: "Invalid password",
  };

  const handleSubmit = (event: any) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        let errorMessages: IErrorMessages = {
          name: "pass",
          message: errors.pass,
        };
        setErrorMessages(errorMessages);
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name: string) => {
    if (errorMessages != undefined) {
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
          <LoginInputText name="uname" required />
          {renderErrorMessage("uname")}
        </LoginInputContainer>
        <LoginInputContainer>
          <label>Password </label>
          <LoginInputText name="pass" required />
          {renderErrorMessage("pass")}
        </LoginInputContainer>
        <LoginButton>
          <LoginSubmit type="submit" value="Log in"/>
        </LoginButton>
        
        <SignUpBtn>
          <a href="/sign-up">Sign up</a>
        </SignUpBtn>
      </form>

  );

  return (
    <LoginContainer>
      <LoginForm>
        <LoginTitle>Sign In</LoginTitle>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </LoginForm>
    </LoginContainer>
  );
};

export default Signup;
