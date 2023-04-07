import React, { useState, useEffect } from "react";
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

const CreateOrganizationForm = () => {
  const [myOrgData, setMyOrgData] = useState();
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();
  const navigate = useNavigate();
  useEffect(() => {
    if (SessionService.checkIsLoggedIn() && myOrgData) {
      navigate('/profile', { replace: true });
    }
  }, [myOrgData]);
  const userService: WebRequestsInterface = getWebRequest();

  const handleSubmit = (event: any) => {
    signup(event);
  };

  const signup = async (event: any) => {
    //Prevent page reload
    event.preventDefault();
    
    const userStr = sessionStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : undefined;
    const id = sessionStorage.getItem('id');
    
    if (user && id) {
        
      const dataForCreate = {
        id: sessionStorage.getItem('id'),
        organizationName: event.currentTarget.organizationName.value,
        organizationId: Math.random().toString(),
        createdBy: sessionStorage.getItem('username'),
        lastModifiedBy: sessionStorage.getItem('username'),
        createdDate: Date().toLocaleString(),
        lastModifiedDate: Date().toLocaleString(),
        summary: event.currentTarget.summary.value,
      }

      const newOrg = await userService.createOrganization(dataForCreate);

    sessionStorage.setItem('myOrganization', JSON.stringify(newOrg.data));
    setMyOrgData(newOrg);
      } else {
        // email not found
        setErrorMessages({ name: "signup", message: "Sranje ti createOrg" });
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
      <label>Organization name</label>
      <LoginInputText name="organizationName" required />
      {renderErrorMessage("organizationName")}
    </LoginInputContainer>
      <LoginInputContainer>
        <label>Summary</label>
        <LoginInputText name="summary" required />
        {renderErrorMessage("summary")}
      </LoginInputContainer>

      <ButtonWrapper>
        <LoginSubmit type="submit" value="Submit" />
      </ButtonWrapper>
    </form>
  );

  if (SessionService.checkIsLoggedIn()) {
    
    return (
        <LoginContainer>
          <LoginForm>
            <LoginTitle>Create your organization</LoginTitle>
            {renderForm}
          </LoginForm>
        </LoginContainer>
      );
  } else {
    return (<>
    {renderErrorMessage("You're not signed up. Please sign up first.")}
    </>);
  }
};

export default CreateOrganizationForm;
