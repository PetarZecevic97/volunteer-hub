import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from "react-redux";

import { inputFieldsforCreateAdForm } from "../../../utility/formInputFields";
import { renderForm, renderErrorMessage } from "../../../components/RenderForms";
import { createAd } from "../../../actions/adActions";

import { checkIsLoggedIn } from "../../../utility/Services/SessionService";

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
        organizationId: id,
      }
      await createAdAction(dataForCreate);
    } else {
      setErrorMessages({ name: "create ad", message: "Sranje ti createAd" });
    }
  };

  if (checkIsLoggedIn()) {
    return renderForm(handleSubmit, errorMessages, inputFieldsforCreateAdForm, "Create your ad");
  } else {
    return renderErrorMessage("Nisi org", errorMessages);
  }
};

const mapDispatchToProps = {
  createAdAction: createAd,
};

export default connect(null, mapDispatchToProps)(CreateAdForm);
