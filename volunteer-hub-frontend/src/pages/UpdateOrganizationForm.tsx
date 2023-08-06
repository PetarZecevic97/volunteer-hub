import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from "react-redux";

import { inputFieldsforUpdateOrganizationForm } from "../utility/formInputFields";
import { renderForm, renderErrorMessage } from "../components/RenderForms";
import { getOrganization, updateOrganization } from "../actions/organizationActions";

import { checkIsLoggedIn } from "../utility/Services/SessionService";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const UpdateOrganizationForm = ({ getOrganizationAction, updateOrganizationAction }: any) => {
  const myOrganization = useSelector((state: any) => state.profileData.myProfile);
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();
  const navigate = useNavigate();

  const setDefault = () => myOrganization ? inputFieldsforUpdateOrganizationForm.map(x => {
                                                                        return {...x, default: myOrganization[x.name]}
                                                                      })
                                        : inputFieldsforUpdateOrganizationForm

  const [inputFieldsWithDefault, setInputFieldsWithDefault] = useState(setDefault());

  useEffect(() => {
    getOrganizationAction(myOrganization.id)
  }, [myOrganization.id]);

  useEffect(() => {
    setInputFieldsWithDefault(setDefault());
  }, [myOrganization]);

  const handleSubmit = async (event: any) => {
    //Prevent page reload
    event.preventDefault();
    
    const userStr = sessionStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : undefined;
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    
    if (user && id && id === myOrganization.id && role === "Organization") {
      const dataForUpdate = {
        ...myOrganization,
        organizationName: event.currentTarget.organizationName.value,
        summary: event.currentTarget.summary.value,
      }
      await updateOrganizationAction(dataForUpdate, myOrganization.id);
      navigate('/organization/' + myOrganization.id, { replace: true });
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
  getOrganizationAction: getOrganization,
};

export default connect(null, mapDispatchToProps)(UpdateOrganizationForm);
