import React, { useState } from "react";
import {
  DebugInputContainer,
  DebugTitle,
  DebugForm,
  DebugError,
  DebugSubmit,
  DebugInputText,
  DebugContainer,
  ButtonWrapper,
} from "../components/Debug/styles/DebugStyles";
import SessionService from "../utility/Services/SessionService";
import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import { useNavigate } from "react-router-dom";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const DebugPanel = () => {
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();
  const [sessionInfo, setSessionInfo] = useState(SessionService.getUserInfo());
  const navigate = useNavigate();

  const userService: WebRequestsInterface = getWebRequest();

  const handleSubmit = (event: any) => {
    setDebugValues(event);
  };

  const setDebugValues = async (event: any) => {
    //Prevent page reload
    event.preventDefault();

    const pass = event.currentTarget.pass.value;
    const username = event.currentTarget.username.value;

    // if () {

    // } else {
    //   // email not found
    //   setErrorMessages({ name: "Debug", message: "Sranje ti Debug" });
    // }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name: string) => {
    if (errorMessages) {
      return (
        name === errorMessages.name && (
          <DebugError>{errorMessages.message}</DebugError>
        )
      );
    }
  };

  // Generate JSX code for Debug form
  const renderForm = (
    <form onSubmit={handleSubmit}>
      <DebugInputContainer>
        <label>Username </label>
        <DebugInputText name="username" required />
        {renderErrorMessage("uname")}
      </DebugInputContainer>

      <DebugInputContainer>
        <label>Email </label>
        <DebugInputText name="username" required />
        {renderErrorMessage("uname")}
      </DebugInputContainer>

      <ButtonWrapper>
        <DebugSubmit type="submit" value="Submit" />
      </ButtonWrapper>
    </form>
  );
  if (SessionService.checkIsLoggedIn()) {
    navigate("/profile", { replace: true });
    return <></>;
  } else {
    return (
      <DebugContainer>
        <DebugForm>
          <DebugTitle>User options</DebugTitle>
          {renderForm}
        </DebugForm>
      </DebugContainer>
    );
  }
};

export default DebugPanel;
