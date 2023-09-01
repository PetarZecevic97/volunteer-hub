import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from "react-redux";

import { inputFieldsforCreateVolunteerForm } from "../../../utility/formInputFields";
import { renderForm } from "../../../components/RenderForms";
import { createProfile } from "../../../actions/profileActions";
import {checkIsLoggedIn} from "../../../utility/Services/SessionService";
import { LoginError } from "../../../components/Login/styles/LoginSC";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const CreateVolunteerForm = ({ createProfileAction }: any) => {
  const myVolData = useSelector((state: any) => state.profileData.myProfile);
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();
  const navigate = useNavigate();
  
  const id = sessionStorage.getItem('id');
  const role = sessionStorage.getItem('role');

  useEffect(() => {
    if (checkIsLoggedIn() && myVolData) {
      navigate('/profile', { replace: true });
    }
  }, [myVolData]);

  const handleSubmit = async (event: any) => {
    //Prevent page reload
    event.preventDefault();
        
    if (id && role === "Volunteer") {
      const dataForCreate = {
        id: sessionStorage.getItem('id'),
        firstName: event.currentTarget.firstName.value,
        lastName: event.currentTarget.lastName.value,
        skills: event.currentTarget.skills.value.split(", "),
      }
      await createProfileAction(dataForCreate, "Volunteer");
    } else {
        // email not found
      setErrorMessages({ name: "signup", message: "Invalid createOrg" });
    }
  };
  const handleRedirect = (path: string) => {
    navigate('/' + path, {replace:true})
  }
  const updateErrorMessage = (name: string, errors: any) => {
    console.log("Errors");
    let errorMessages: string[] = [];
  
    errors.forEach((error) => {
      if (name === error.name) {
        errorMessages.push(error.message);
        console.log(error);
      }
    });
    if (errorMessages.length > 0) {
      return <LoginError>{errorMessages.join(", ")}</LoginError>;
    }
    return <></>;
  };

  

  if (checkIsLoggedIn()) {
    return renderForm(
      handleSubmit, 
      errorMessages, 
      inputFieldsforCreateVolunteerForm, 
      "Create your volunteer profile!",
      handleRedirect
    );
  } else {
    return updateErrorMessage("You're not signed up. Please sign up first.", errorMessages);
  }
};

const mapDispatchToProps = {
  createProfileAction: createProfile,
};

export default connect(null, mapDispatchToProps)(CreateVolunteerForm);
