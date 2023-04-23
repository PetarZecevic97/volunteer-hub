import { useState, useEffect } from "react";
import { WebRequestsInterface } from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import SessionService from "../utility/Services/SessionService";
import { useNavigate } from 'react-router-dom';
import { renderForm, renderErrorMessage } from "../components/RenderForms";

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
      const newVol = await userService.createVolunteer(dataForCreate);
      sessionStorage.setItem('myVolunteer', JSON.stringify(newVol.data));
      setMyVolData(newVol);
    } else {
        // email not found
      setErrorMessages({ name: "signup", message: "Sranje ti createOrg" });
    }
  };

  const inputFields = [
    {name:"firstName", labelName: "First name", errorName: "firstName"},
    {name:"lastName", labelName: "Last name", errorName: "lastName"},
    {name:"skills", labelName: "Skills", errorName: "skills"},
];

  if (SessionService.checkIsLoggedIn()) {
    return renderForm(handleSubmit, errorMessages, inputFields, "Create your volunteer profile!");
  } else {
    return renderErrorMessage("You're not signed up. Please sign up first.", errorMessages);
  }
};

export default CreateVolunteerForm;
