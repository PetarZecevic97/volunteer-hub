import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from "react-redux";

import { inputFieldsforCreateAdForm } from "../../../utility/formInputFields";
import { renderForm } from "../../../components/RenderForms";
import { createAd } from "../../../actions/adActions";

import { checkIsLoggedIn } from "../../../utility/Services/SessionService";
import { LoginError } from "../../../components/Login/styles/LoginSC";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const CreateAdForm = ({ createAdAction }: any) => {
  const myAd = useSelector((state: any) => state.ads.ad);
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();
  const navigate = useNavigate();
  const [isEmergency, setIsEmergency] = useState(false)
    
  const id = sessionStorage.getItem('id');
  const role = sessionStorage.getItem('role');

  useEffect(() => {
    if (checkIsLoggedIn() && myAd && myAd.id) {
      navigate('/ad/' + myAd.id, { replace: true });
    }
  }, [myAd]);

  const handleSubmit = async (event: any) => {
    //Prevent page reload
    event.preventDefault();
    
    if (id && role === "Organization") {
      const dataForCreate = {
        title: event.currentTarget.title.value,
        summary: event.currentTarget.summary.value,
        skills: event.currentTarget.skills.value,
        location: event.currentTarget.location.value,
        isEmergency: isEmergency,
        organizationId: id,
      }
      await createAdAction(dataForCreate);
    } else {
      setErrorMessages({ name: "create ad", message: "Invalid createAd" });
    }
  };
  const handleRedirect = (path: string) => {
    navigate('/' + path, {replace:true})
  }
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmergency(event.target.checked);
  };
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
    return renderForm(handleSubmit, 
                      errorMessages, 
                      inputFieldsforCreateAdForm, 
                      "Create your ad",
                      handleRedirect,
                      updateErrorMessage,
                      null,
                      handleCheckbox);
  } else {
    return updateErrorMessage("Nisi org", errorMessages);
  }
};

const mapDispatchToProps = {
  createAdAction: createAd,
};

export default connect(null, mapDispatchToProps)(CreateAdForm);
