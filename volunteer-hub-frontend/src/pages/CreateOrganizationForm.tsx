import { useState, useEffect } from "react";
import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import SessionService from "../utility/Services/SessionService";
import { useNavigate } from 'react-router-dom';
import { renderForm, renderErrorMessage } from "./RenderForms";

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

export default CreateOrganizationForm;
