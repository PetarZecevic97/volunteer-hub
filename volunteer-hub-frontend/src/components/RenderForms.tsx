import React from "react";
import {
  LoginError,
} from "./Login/styles/LoginSC";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const renderErrorMessage = (name: string, errorMessages: any) => {
  if (errorMessages && name === errorMessages.name) {
    return <LoginError>{errorMessages.message}</LoginError>;
  } else {
    return <></>;
  }
};


// Pass the title and list of input fields you want generated and you shall receive th form.
// One object of that list should contain name, labelName and default value (default value is optional)
// Iterate through list and generate labels and input fields.
export const renderForm = (
  handleSubmit: (event: any) => void,
  errorMessages: any,
  inputFields: any,
  title: string,
  handleRedirect: (path: string) => void
) => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {inputFields.map((input: any, index: any) => {
            if (input.type === "text") {
              return (
                <TextField
                  key={index}
                  margin="normal"
                  required
                  fullWidth
                  id={input.name}
                  label={input.labelName}
                  name={input.name}
                  autoComplete={input.name}
                  type={input.name}
                  defaultValue={input.default}
                  autoFocus
                >
                  {renderErrorMessage(input.errorName, errorMessages)}
                </TextField>
              );
            }
            if (input.type === "href") {
              return (
                <Grid 
                  item 
                  xs
                  key={index}
                >
                  <Link 
                    onClick={() => handleRedirect(input.name)}
                  >
                    {input.labelName}
                  </Link>
                </Grid>
              );
            }
            if (input.type === "checkbox") {
              return (
                <FormControlLabel
                  control={<Checkbox value={input.name} color="primary" />}
                  key={index}
                  label={input.labelName}
                />
              );
            }
          })}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {title}
          </Button>
        </Box>
      </Box>
    </Container>
);
