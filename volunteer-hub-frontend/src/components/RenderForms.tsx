/* eslint-disable array-callback-return */
import React from "react";
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
import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";

// Generates a form based on the input parameters.
export const renderForm = (
  handleSubmit: (event: any) => void, // Function to handle form submission
  errorMessages: any, // Error messages for form validation (not used in this code)
  inputFields: any, // List of input fields to be generated in the form
  title: string, // Title of the form
  handleRedirect: (path: string) => void, // Function to handle redirection (used for links)
  updateErrorMessage?, // Function to update error messages (not used in this code)
  handleSelect?, // Function to handle radio button selection
  handleCheckbox? // Function to handle checkbox selection
) => {
  return (
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
              // Generate a text input field
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
                  {/* {updateErrorMessage(input.errorName, errorMessages)} */}
                </TextField>
              );
            }
            if (input.type === "href") {
              // Generate a hyperlink
              return (
                <Grid item xs key={index}>
                  <Link 
                    onClick={() => handleRedirect(input.name)}>
                    {input.labelName}
                  </Link>
                </Grid>
              );
            }
            if (input.type === "radio") {
              // Generate a radio button group
              return (
                <FormControl component="fieldset" key={index}>
                  <FormLabel component="legend">{input.labelName}</FormLabel>
                  <RadioGroup
                    aria-label={input.name}
                    name={input.name}
                    onChange={(event) => handleSelect(event.target.value)}
                  >
                    {input.choices.map((choice: string, choiceIndex: number) => (
                      <FormControlLabel
                        key={choiceIndex}
                        value={choice}
                        control={<Radio />}
                        label={choice}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              );
            }
            if (input.type === "checkbox") {
              // Generate a checkbox
              return (
                <FormControlLabel
                  control={
                    <Checkbox 
                      value={input.name} 
                      color="primary" 
                      onChange={handleCheckbox}
                    />
                  }
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
};
