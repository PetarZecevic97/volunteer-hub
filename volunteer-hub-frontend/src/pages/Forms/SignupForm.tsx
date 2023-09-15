/* eslint-disable @typescript-eslint/no-unused-vars */
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

// Define the structure of error messages.
interface IErrorMessages {
  name: string;
  email?: string;
  password?: string;
  message: string;
}

// Define the Signup component.
const Signup = () => {
  // State variables to manage error messages, session info, and role.
  const [errorMessages, setErrorMessages] = useState<IErrorMessages[]>([]);
  const [sessionInfo, setSessionInfo] = useState(getUserInfo());
  const [role, setRole] = useState("");
  const [openError, setOpenError] = useState(false);
  const navigate = useNavigate();

  // Create a user service instance for making web requests.
  const userService: WebRequestsInterface = getWebRequest();

  // Check if the user is already logged in and redirect accordingly.
  useEffect(() => {
    if (checkIsLoggedIn()) {
      const role = sessionStorage.getItem("role");
      if ("Organization" === role) {
        navigate("/create-org-form", { replace: true });
      } else if ("Volunteer") {
        navigate("/create-volunteer-form", { replace: true });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionInfo]);

  // Handle the form submission.
  const handleSubmit = async (event: any) => {
    // Prevent page reload.
    event.preventDefault();

    // Extract form data.
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
      // Sign up the user as an organization or volunteer based on the selected role.
      if (role === "Organization") {
        await userService.signUpAsOrganization(dataForSignup);
      } else {
        await userService.signUpAsVolunteer(dataForSignup);
      }

      // Log in the user.
      await userService.logIn(username, password);
      const userStr = sessionStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : undefined;
      const id = sessionStorage.getItem("id");

      if (user && id) {
        // Update session info and user info.
        setUserInfo(user.username, user.email);
        setSessionInfo(getUserInfo());
      } else {
        // Handle the case where user or ID is not found.
        setErrorMessages([
          ...errorMessages,
          { name: "signup", message: "Invalid signup" },
        ]);
      }
    } catch (e) {
      // Handle errors from the server response.
      const errorResponse = e as AxiosError;
      const errors = errorResponse?.response?.data?.errors;
      let errorsToAdd: IErrorMessages[] = [];
      for (let key in errors) {
        errorsToAdd.push({ name: "signup", message: errors[key][0] });
      }

      const errorsBackup = errorResponse?.response?.data;
      for (let key in errorsBackup) {
        errorsToAdd.push({ name: "signup", message: errorsBackup[key][0] });
      }

      setErrorMessages([...errorsToAdd]);
    }
  };

  // Handle redirection to different routes.
  const handleRedirect = (path: string) => {
    navigate("/" + path, { replace: true });
  };

  // Handle the selection of a role (organization or volunteer).
  const handleSelect = (value: string) => {
    setRole(value);
  };

  // Update error messages if present.

  // Check if the user is already logged in and redirect accordingly.
  if (checkIsLoggedIn()) {
    navigate("/profile", { replace: true });
    return <></>;
  } else {
    // Render the signup form.
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
