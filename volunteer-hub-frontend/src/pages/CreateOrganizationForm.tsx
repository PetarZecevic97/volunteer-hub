import { useState, useEffect } from "react";
import SessionService from "../utility/Services/SessionService";
import { useNavigate } from 'react-router-dom';
import { renderForm, renderErrorMessage } from "../components/RenderForms";
import { connect } from "react-redux";
import { useSelector } from 'react-redux';
import { createProfile } from "../actions/profileActions";

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

  useEffect(() => {
    if (SessionService.checkIsLoggedIn() && myOrganization) {
      navigate('/profile', { replace: true });
    }
  }, [myOrganization]);

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
      await createProfileAction(dataForCreate, "Organization");
    } else {
      // email not found
      setErrorMessages({ name: "signup", message: "Sranje ti createOrg" });
    }
  };

  const inputFields = [
    {name:"organizationName", labelName: "Organization name", errorName: "organizationName"},
    {name:"summary", labelName: "Summary", errorName: "summary"},
];

  if (SessionService.checkIsLoggedIn()) {
    return renderForm(handleSubmit, errorMessages, inputFields, "Create your organization");
  } else {
    return renderErrorMessage("You're not signed up. Please sign up first.", errorMessages);
  }
};

const mapDispatchToProps = {
  createProfileAction: createProfile,
};

export default connect(null, mapDispatchToProps)(CreateOrganizationForm);
