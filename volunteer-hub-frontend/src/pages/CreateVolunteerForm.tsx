import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from "react-redux";

import SessionService from "../utility/Services/SessionService";
import { inputFieldsforCreateVolunteerForm } from "../utility/formInputFields";
import { renderForm, renderErrorMessage } from "../components/RenderForms";
import { createProfile } from "../actions/profileActions";

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

  useEffect(() => {
    if (SessionService.checkIsLoggedIn() && myVolData) {
      navigate('/profile', { replace: true });
    }
  }, [myVolData]);

  const handleSubmit = async (event: any) => {
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
      await createProfileAction(dataForCreate, "Volunteer");
    } else {
        // email not found
      setErrorMessages({ name: "signup", message: "Sranje ti createOrg" });
    }
  };

  if (SessionService.checkIsLoggedIn()) {
    return renderForm(handleSubmit, errorMessages, inputFieldsforCreateVolunteerForm, "Create your volunteer profile!");
  } else {
    return renderErrorMessage("You're not signed up. Please sign up first.", errorMessages);
  }
};

const mapDispatchToProps = {
  createProfileAction: createProfile,
};

export default connect(null, mapDispatchToProps)(CreateVolunteerForm);
