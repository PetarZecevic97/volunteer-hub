/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  getUserInfo,
  setDebugValue,
  setUserInfo,
} from "../utility/Services/SessionService";

interface IErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  message?: string;
}

const useStyles = makeStyles((theme) => ({
  debugContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#171616",
  },
  debugForm: {
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#7600ff",
  },
  debugTitle: {
    fontSize: "25px",
    marginBottom: theme.spacing(2),
  },
  debugInputContainer: {
    marginBottom: theme.spacing(2),
  },
  debugSubmit: {
    width: "100%",
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#ffbb00",
    color: "#000000",
    fontSize: "18px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#7600ff",
    },
  },
  debugError: {
    color: "red",
    fontSize: "12px",
  },
  checkboxGroup: {
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  checkbox: {
    color: theme.palette.secondary.main, // Default color for checkboxes
    "&.Mui-checked": {
      color: theme.palette.secondary.main, // Amber color for checked checkboxes
    },
  },
}));

const DebugPanel = () => {
  const classes = useStyles();
  const [errorMessages, setErrorMessages] = useState<IErrorMessages>();

  const [flags, setFlags] = useState([
    { id: "debug_admin_toggle", label: "Admin", checked: true },
    { id: "debug_jwt_toggle", label: "Require JWT Token", checked: true },
    {
      id: "debug_all_visibility_toggle",
      label: "All content visible",
      checked: true,
    },
    { id: "debug_auth_toggle", label: "Authorization checks", checked: true },
    { id: "debug_volunteer_toggle", label: "Volunteer account", checked: true },
    {
      id: "debug_organization_toggle",
      label: "Organization account",
      checked: true,
    },
  ]);

  const [sessionInfo, setSessionInfo] = useState(getUserInfo());
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setDebugValues(event.currentTarget);
  };

  const handleChange = (isChecked: boolean, i: number) => {
    let tmp = flags[i];
    tmp.checked = !isChecked;
    let flagsClone = [...flags];
    flagsClone[i] = tmp;
    setFlags([...flagsClone]);
  };

  const setDebugValues = (form: any) => {
    const username = form.username.value;
    const email = form.email.value;

    setUserInfo(username, email);

    // eslint-disable-next-line array-callback-return
    flags.map(({ id, label, checked }, i) => {
      setDebugValue(checked, label);
    });
  };

  const renderErrorMessage = (name: string) => {
    if (errorMessages) {
      return (
        name === errorMessages.name && (
          <FormHelperText className={classes.debugError}>
            {errorMessages.message}
          </FormHelperText>
        )
      );
    }
  };

  return (
    <>
      <Box className={classes.debugContainer}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} className={classes.debugInputContainer}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                required
                variant="outlined"
              />
              {renderErrorMessage("username")}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                required
                variant="outlined"
              />
              {renderErrorMessage("email")}
            </Grid>
          </Grid>
          <FormControl
            component="fieldset"
            className={classes.debugInputContainer}
          >
            <Typography variant="subtitle1">Account Flags:</Typography>
            <RadioGroup
              className={classes.checkboxGroup}
              aria-label="account-flags"
            >
              {flags.map(({ id, label, checked }, i) => (
                <FormControlLabel
                  key={id}
                  control={
                    <Checkbox
                      className={classes.checkbox}
                      checked={checked}
                      onChange={() => handleChange(checked, i)}
                    />
                  }
                  label={label}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            className={classes.debugSubmit}
          >
            Update Info
          </Button>
        </form>
      </Box>
    </>
  );
};

export default DebugPanel;
