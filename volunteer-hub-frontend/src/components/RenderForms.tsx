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
} from "./Login/styles/LoginStyles";

  export const renderErrorMessage = (name: string, errorMessages: any) => {
    if (errorMessages && name === errorMessages.name) {
      return (
          <LoginError>{errorMessages.message}</LoginError>
      );
    } else {
        return (<></>);
    }
  };

  export const renderForm = (handleSubmit: (event: any) => void, errorMessages: any, inputFields: any, title: string) => (
    <LoginContainer>
        <LoginForm>
            <LoginTitle>{title}</LoginTitle>
            <form onSubmit={handleSubmit}>
                {inputFields.map((input: any, index: any) => {
                    return (
                        <LoginInputContainer key={index}>
                            <label>{input.labelName} </label>
                            <LoginInputText name={input.name} required />
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