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

const CreateVolunteerForm = () => {
  const [myVolData, setMyVolData] = useState();
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();
  const navigate = useNavigate();
  useEffect(() => {
    if (SessionService.checkIsLoggedIn() && myVolData) {
      navigate('/profile', { replace: true });
    }
  }, [myVolData]);
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
        firstName: event.currentTarget.firstName.value,
        lastName: event.currentTarget.lastName.value,
        skills: event.currentTarget.skills.value.split(", "),
      }

      const newVol = await userService.createVolunteer(dataForCreate);

      sessionStorage.setItem('myVolunteer', JSON.stringify(newVol.data));
      setMyVolData(newVol);
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
        <label>Skills</label>
        <LoginInputText name="skills" required />
        {renderErrorMessage("skills")}
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
            <LoginTitle>Create your volunteer profile!</LoginTitle>
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

export default CreateVolunteerForm;
