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

  export const renderErrorMessage = (name: string, errorMessages: any) => {
    if (errorMessages && name === errorMessages.name) {
      return (
          <LoginError>{errorMessages.message}</LoginError>
      );
    } else {
        return (<></>);
    }
  };

  // Pass the title and list of input fields you want generated and you shall receive th form.
  // One object of that list should contain name, labelName and default value (default value is optional)
  // Iterate through list and generate labels and input fields.
  export const renderForm = (handleSubmit: (event: any) => void, errorMessages: any, inputFields: any, title: string) => (
    <LoginContainer>
        <LoginForm>
            <LoginTitle>{title}</LoginTitle>
            <form onSubmit={handleSubmit}>
                {inputFields.map((input: any, index: any) => {
                    return (
                        <LoginInputContainer key={index}>
                            <label>{input.labelName} </label>
                            <LoginInputText name={input.name} id={input.name} required defaultValue={input.default} />
                            {renderErrorMessage(input.errorName, errorMessages)}
                        </LoginInputContainer>
                    );
                })}
                <ButtonWrapper>
                    <LoginSubmit type="submit" value="Submit" />
                </ButtonWrapper>
            </form>
         </LoginForm>
    </LoginContainer>
  );