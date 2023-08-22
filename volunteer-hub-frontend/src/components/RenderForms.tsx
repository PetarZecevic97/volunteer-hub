import React from "react";
import {
    LoginTitle,
    LoginForm,
    LoginContainer,
    LoginInputContainer,
    LoginError,
    LoginSubmit,
    LoginInputText,
    ButtonWrapper,
} from "./Login/styles/LoginSC";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";


  export const renderErrorMessage = (name: string, errorMessages: any) => {
    if (errorMessages && name === errorMessages.name) {
      return (
          <LoginError>{errorMessages.message}</LoginError>
      );
    } else {
        return (<></>);
    }
  };
  const defaultTheme = createTheme();


//   // Pass the title and list of input fields you want generated and you shall receive th form.
//   // One object of that list should contain name, labelName and default value (default value is optional)
//   // Iterate through list and generate labels and input fields.
//   export const renderForm = (handleSubmit: (event: any) => void, errorMessages: any, inputFields: any, title: string) => (
//     <LoginContainer>
//         <LoginForm>
//             <LoginTitle>{title}</LoginTitle>
//             <form onSubmit={handleSubmit}>
//                 {inputFields.map((input: any, index: any) => {
//                     return (
//                         <LoginInputContainer key={index}>
//                             <label>{input.labelName} </label>
//                             <LoginInputText name={input.name} id={input.name} required defaultValue={input.default} />
//                             {renderErrorMessage(input.errorName, errorMessages)}
//                         </LoginInputContainer>
//                     );
//                 })}
//                 <ButtonWrapper>
//                     <LoginSubmit type="submit" value="Submit" />
//                 </ButtonWrapper>
//             </form>
//          </LoginForm>
//     </LoginContainer>
//   );

  // Pass the title and list of input fields you want generated and you shall receive th form.
  // One object of that list should contain name, labelName and default value (default value is optional)
  // Iterate through list and generate labels and input fields.
  export const renderForm = (handleSubmit: (event: any) => void, errorMessages: any, inputFields: any, title: string) => (
<ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
          {inputFields.map((input: any, index: any) => {
                    if(input.type === "text"){
                        return (

                            <TextField
                            key={index}
                            margin="normal"
                            required
                            fullWidth
                            id={input.name}
                            label={input.labelNamFe}
                            name={input.name}
                            autoComplete={input.name}
                            type={input.name}
                            defaultValue = {input.default}
                            autoFocus
                          >
                            {renderErrorMessage(input.errorName, errorMessages)}
                          </TextField>
                        )
                    }
                    if(input.type === "href"){
                        return (
                            <Grid item xs>
                                <Link  variant="body2">
                                {input.labelName}
                                </Link>
                            </Grid>
                        )
                    }
                    if(input.type === "checkbox"){
                        return (
                            <FormControlLabel
                            control={<Checkbox value={input.name} color="primary" />}
                            label={input.labelName}
                            />
                        )
                    }
                    
                }
            )}
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
    </ThemeProvider>
  );