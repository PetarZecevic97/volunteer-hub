import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from "react-redux";

import { inputFieldsforUpdateOrganizationForm } from "../utility/formInputFields";
import { renderForm, renderErrorMessage } from "../components/RenderForms";
import { updateOrganization } from "../actions/organizationActions";
import { getProfileData } from "../actions/profileActions";
import { checkIsLoggedIn } from "../utility/Services/SessionService";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const UpdateOrganizationForm = ({ getProfileDataAction, updateOrganizationAction }: any) => {
  const myOrganization = useSelector((state: any) => state.profileData.myProfile);
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();
  const navigate = useNavigate();

  const setDefault = () => myOrganization ? inputFieldsforUpdateOrganizationForm.map(x => {
                                                                        return {...x, default: myOrganization[x.name]}
                                                                      })
                                        : inputFieldsforUpdateOrganizationForm

  const [inputFieldsWithDefault, setInputFieldsWithDefault] = useState(setDefault());
  const id = sessionStorage.getItem('id');
  const role = sessionStorage.getItem('role');

  useEffect(() => {
    if(id && role) {
      getProfileDataAction(id, role);
    }
  }, [role, id]);

  useEffect(() => {
    setInputFieldsWithDefault(setDefault());
  }, [myOrganization]);

  const handleSubmit = async (event: any) => {
    //Prevent page reload
    event.preventDefault();
    
    if (id && id === myOrganization.id && role === "Organization") {
      const dataForUpdate = {
        ...myOrganization,
        organizationName: event.currentTarget.organizationName.value,
        summary: event.currentTarget.summary.value,
      }
      await updateOrganizationAction(dataForUpdate, myOrganization.id);
      navigate('/profile', { replace: true });
    } else {
      setErrorMessages({ name: "update organization", message: "Sranje ti updateOrganization" });
    }
  };

  if (checkIsLoggedIn()) {
    return renderForm(handleSubmit, errorMessages, inputFieldsWithDefault, "Update your organization info!");
  } else {
    return renderErrorMessage("Nisi profilna organizacija", errorMessages);
  }
};

const mapDispatchToProps = {
  updateOrganizationAction: updateOrganization,
  getProfileDataAction: getProfileData,
};

export default connect(null, mapDispatchToProps)(UpdateOrganizationForm);
