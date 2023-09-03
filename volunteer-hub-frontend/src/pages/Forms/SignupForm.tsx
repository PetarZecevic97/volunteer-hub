import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { Alert, Grid } from "@mui/material";
import { WebRequestsInterface } from "../../webRequests/webRequests-int";
import getWebRequest from "../../webRequests/webRequestsProvider";
import { inputFieldsforSignup } from "../../utility/formInputFields";
import { renderForm } from "../../components/RenderForms";
import {
  checkIsLoggedIn,
  getUserInfo,
  setUserInfo,
} from "../../utility/Services/SessionService";
import { AxiosError } from "axios";
import { LoginError } from "../../components/Login/styles/LoginSC";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";

interface IErrorMessages {
  name: string;
  email?: string;
  password?: string;
  message: string;
}

const Signup = () => {
  const [errorMessages, setErrorMessages] = useState<IErrorMessages[]>([]);

  const [sessionInfo, setSessionInfo] = useState(getUserInfo());
  const [role, setRole] = useState("");
  const [openError, setOpenError] = useState(false);
  const navigate = useNavigate();

  const userService: WebRequestsInterface = getWebRequest();
  useEffect(() => {
    if (checkIsLoggedIn()) {
      const role = sessionStorage.getItem("role");
      if ("Organization" === role) {
        navigate("/create-org-form", { replace: true });
      } else if ("Volunteer") {
        navigate("/create-volunteer-form", { replace: true });
      }
    }
  }, [sessionInfo]);

  const handleSubmit = async (event: any) => {
    //Prevent page reload
    event.preventDefault();

    const username = event.currentTarget.username.value;
    const password = event.currentTarget.pass.value;
    const role = event.currentTarget.role.value;
    const dataForSignup = {
      firstName: event.currentTarget.firstName.value,
      lastName: event.currentTarget.lastName.value,
      username,
      email: event.currentTarget.email.value,
      password,
      phoneNumber: event.currentTarget.phone.value,
    };

    try {
      if (role === "Organization") {
        await userService.signUpAsOrganization(dataForSignup);
      } else {
        await userService.signUpAsVolunteer(dataForSignup);
      }
      await userService.logIn(username, password);
      const userStr = sessionStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : undefined;
      const id = sessionStorage.getItem("id");
      

      if (user && id) {
        console.log(userStr);
        setUserInfo(user.username, user.email);
        setSessionInfo(getUserInfo());
      } else {
        // email not found
        setErrorMessages([
          ...errorMessages,
          { name: "signup", message: "Invalid signup" },
        ]);
      }
    } catch (e) {
      const errorResponse = e as AxiosError;
      const errors = errorResponse?.response?.data?.errors;
      let errorsToAdd: IErrorMessages[] = [];
      for (let key in errors) {
        errorsToAdd.push({ name: "signup", message: errors[key][0] });
      }
      setErrorMessages([...errorsToAdd]);
    }
  };
  const handleRedirect = (path: string) => {
    navigate("/" + path, { replace: true });
  };
  const handleSelect = (value: string) => {
    setRole(value);
  };

  const updateErrorMessage = (name: string, errorMessage: any) => {
    console.log("Errors");
    
    if (errorMessage !== undefined && errorMessages.length > 0) {
      return <LoginError>{errorMessage}</LoginError>;
    }
    return <></>;
  };


  if (checkIsLoggedIn()) {
    navigate("/profile", { replace: true });
    return <></>;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {renderForm(
            handleSubmit,
            errorMessages,
            inputFieldsforSignup,
            "Sign up",
            handleRedirect,
            null,
            handleSelect
          )}
          <Grid container spacing={2}>
            {errorMessages.map((error) => (
              <Grid item xs={12} key={error.name}>
                <Alert severity="error">{error.message}</Alert>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    );
  }
};

export default Signup;
