import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from "react-redux";

import { inputFieldsforCreateOrganizationForm } from "../../../utility/formInputFields";
import { renderForm, renderErrorMessage } from "../../../components/RenderForms";
import { createProfile } from "../../../actions/profileActions";
import {checkIsLoggedIn} from "../../../utility/Services/SessionService";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const CreateOrganizationForm = ({ createProfileAction }: any) => {
  const myOrganization = useSelector((state: any) => state.profileData.myProfile);
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();
  const navigate = useNavigate();

  const id = sessionStorage.getItem('id');
  const role = sessionStorage.getItem('role');

  useEffect(() => {
    if (checkIsLoggedIn() && myOrganization) {
      navigate('/profile', { replace: true });
    }
  }, [myOrganization]);

  const handleSubmit = async (event: any) => {
    //Prevent page reload
    event.preventDefault();    
    if (id && role === "Organization") {
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
      await createProfileAction(dataForCreate, "Organization");
    } else {
      // email not found
      setErrorMessages({ name: "signup", message: "Sranje ti createOrg" });
    }
  };

  if (checkIsLoggedIn()) {
    return renderForm(handleSubmit, errorMessages, inputFieldsforCreateOrganizationForm, "Create your organization");
  } else {
    return renderErrorMessage("You're not signed up. Please sign up first.", errorMessages);
  }
};

const mapDispatchToProps = {
  createProfileAction: createProfile,
};

export default connect(null, mapDispatchToProps)(CreateOrganizationForm);
