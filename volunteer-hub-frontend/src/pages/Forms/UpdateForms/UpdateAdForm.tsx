import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { connect, useSelector } from "react-redux";

import { inputFieldsforUpdateAdForm } from "../../../utility/formInputFields";
import { renderForm } from "../../../components/RenderForms";
import { getAd, updateAd } from "../../../actions/adActions";

import { checkIsLoggedIn } from "../../../utility/Services/SessionService";
import { LoginError } from "../../../components/Login/styles/LoginSC";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const UpdateAdForm = ({ getAdAction, updateAdAction }: any) => {
  const myAd = useSelector((state: any) => state.ads.ad);
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();
  const navigate = useNavigate();
  const { adId } = useParams();

  const setDefault = () => myAd ? inputFieldsforUpdateAdForm.map(x => {
                                                                        return {...x, default: myAd[x.name]}
                                                                      })
                                : inputFieldsforUpdateAdForm

  const [inputFieldsWithDefault, setInputFieldsWithDefault] = useState(setDefault());

  useEffect(() => {
    getAdAction(adId)
  }, [adId]);

  useEffect(() => {
    setInputFieldsWithDefault(setDefault());
  }, [myAd]);

  const handleSubmit = async (event: any) => {
    //Prevent page reload
    event.preventDefault();
    
    const userStr = sessionStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : undefined;
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    
    if (user && id && role === "Organization") {
      const dataForUpdate = {
        id: adId,
        title: event.currentTarget.title.value,
        summary: event.currentTarget.summary.value,
        skills: event.currentTarget.skills.value,
        isOpen: event.currentTarget.isOpen.value === "true",
        location: event.currentTarget.location.value,
        openedDate: myAd.openedDate,
        organizationId: id,
      }
      await updateAdAction(dataForUpdate, myAd.id);
      navigate('/ad/' + myAd.id, { replace: true });
    } else {
      setErrorMessages({ name: "update ad", message: "Sranje ti updateAd" });
    }
  };
  const handleRedirect = (path: string) => {
    navigate('/' + path, {replace:true})
  }
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
    return renderForm(
      handleSubmit, 
      errorMessages, 
      inputFieldsWithDefault, 
      "Update your ad",
      handleRedirect
    );
  } else {
    return updateErrorMessage("Nisi org", errorMessages);
  }
};

const mapDispatchToProps = {
  updateAdAction: updateAd,
  getAdAction: getAd,
};

export default connect(null, mapDispatchToProps)(UpdateAdForm);
