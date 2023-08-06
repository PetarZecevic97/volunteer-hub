import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from "react-redux";

import { inputFieldsforUpdateVolunteerForm } from "../utility/formInputFields";
import { renderForm, renderErrorMessage } from "../components/RenderForms";
import { getVolunteer, updateVolunteer } from "../actions/volunteerActions";

import { checkIsLoggedIn } from "../utility/Services/SessionService";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const UpdateVolunteerForm = ({ getVolunteerAction, updateVolunteerAction }: any) => {
  const myVolunteer = useSelector((state: any) => state.profileData.myProfile);
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();
  const navigate = useNavigate();

  const setDefault = () => myVolunteer ? inputFieldsforUpdateVolunteerForm.map(x => {
                                                                        return {...x, default: myVolunteer[x.name]}
                                                                      })
                                        : inputFieldsforUpdateVolunteerForm

  const [inputFieldsWithDefault, setInputFieldsWithDefault] = useState(setDefault());

  useEffect(() => {
    getVolunteerAction(myVolunteer.id)
  }, [myVolunteer.id]);

  useEffect(() => {
    setInputFieldsWithDefault(setDefault());
  }, [myVolunteer]);

  const handleSubmit = async (event: any) => {
    //Prevent page relovolunteer
    event.preventDefault();
    
    const userStr = sessionStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : undefined;
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    
    if (user && id && id === myVolunteer.id && role === "Volunteer") {
      const dataForUpdate = {
        ...myVolunteer,
        firstName: event.currentTarget.firstName.value,
        lastName: event.currentTarget.lastName.value,
        skills: event.currentTarget.skills.value,
      }
      await updateVolunteerAction(id, dataForUpdate);
      navigate('/volunteer/' + id, { replace: true });
    } else {
      setErrorMessages({ name: "update volunteer", message: "Sranje ti updateVolunteer" });
    }
  };

  if (checkIsLoggedIn()) {
    return renderForm(handleSubmit, errorMessages, inputFieldsWithDefault, "Update your volunteer info!");
  } else {
    return renderErrorMessage("Nisi profilni volonter", errorMessages);
  }
};

const mapDispatchToProps = {
  updateVolunteerAction: updateVolunteer,
  getVolunteerAction: getVolunteer,
};

export default connect(null, mapDispatchToProps)(UpdateVolunteerForm);
