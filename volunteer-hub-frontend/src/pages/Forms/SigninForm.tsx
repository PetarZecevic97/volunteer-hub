import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";

import { WebRequestsInterface } from "../../webRequests/webRequests-int";
import getWebRequest from "../../webRequests/webRequestsProvider";
import { inputFieldsforSignin } from "../../utility/formInputFields";
import { renderForm } from "../../components/RenderForms";
import {
  checkIsLoggedIn,
  getUserInfo,
  setUserInfo,
} from "../../utility/Services/SessionService";
import { AxiosError } from "axios";
import { Box, Container } from "@mui/system";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const Signin = () => {
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();
  const [sessionInfo, setSessionInfo] = useState(getUserInfo());
  const navigate = useNavigate();

  const userService: WebRequestsInterface = getWebRequest();

  useEffect(() => {
    if (checkIsLoggedIn()) {
      navigate("/profile", { replace: true });
    }
  }, [sessionInfo]);

  const handleSubmit = async (event: any) => {
    // Prevent page reload
    event.preventDefault();
    const password = event.currentTarget.password.value;
    const username = event.currentTarget.username.value;

    try {
      // Find user login info
      await userService.logIn(username, password);
      const userStr = sessionStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : undefined;
      const id = sessionStorage.getItem("id");

      if (user && id) {
        setUserInfo(user.name, user.email);
        setSessionInfo(getUserInfo());
      } else {
        // email not found
        setErrorMessages({ name: "login", message: "Invalid login" });
      }
    } catch (error) {
      // Handle axios error
      setErrorMessages({ name: "login", message: "Malformed login data" });
    }
  };

  const handleRedirect = (path: string) => {
    navigate("/" + path, { replace: true });
  };

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
          inputFieldsforSignin,
          "Log in",
          handleRedirect
        )}
        <Grid container spacing={2}>
          {errorMessages && errorMessages.message && (
            <Grid item xs={12} key={errorMessages.name}>
              <Alert severity="error">{errorMessages.message}</Alert>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Signin;
