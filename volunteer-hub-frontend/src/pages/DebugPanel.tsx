import React, {useState} from "react";
import {
    DebugInputContainer,
    DebugTitle,
    DebugForm,
    DebugError,
    DebugSubmit,
    DebugInputText,
    DebugContainer,
    ButtonWrapper,
    Form, CheckBoxContainer,
} from "../components/Debug/styles/DebugStyles";
import SessionService from "../utility/Services/SessionService";
import {WebRequestsInterface} from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import {useNavigate} from "react-router-dom";
import "../components/DebugPanel/styles/DebugPanel.css";
import {CheckBox} from "../components/DebugPanel/CheckBox";
import {TextInput} from "../components/DebugPanel/TextInput";
import {RadioGroup} from "../components/DebugPanel/RadioGroup";

interface IErrorMessages {
    name?: string;
    email?: string;
    password?: string;
    message?: string;
}

const DebugPanel = () => {
    const [errorMessages, setErrorMessages] = useState<IErrorMessages>();
    const [sessionInfo, setSessionInfo] = useState(SessionService.getUserInfo());
    const navigate = useNavigate();

    const userService: WebRequestsInterface = getWebRequest();

    const handleSubmit = (event: any) => {
        setDebugValues(event);
    };

    const setDebugValues = async (event: any) => {
        //Prevent page reload
        event.preventDefault();

        const pass = event.currentTarget.pass.value;
        const username = event.currentTarget.username.value;

        // if () {

        // } else {
        //   // email not found
        //   setErrorMessages({ name: "Debug", message: "Sranje ti Debug" });
        // }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name: string) => {
        if (errorMessages) {
            return (
                name === errorMessages.name && (
                    <DebugError>{errorMessages.message}</DebugError>
                )
            );
        }
    };

    // Generate JSX code for Debug form
    const renderForm = (
        <Form onSubmit={handleSubmit}>
            <TextInput
                p_label={"Username"}
                p_name={"username"}
                p_isRequired={true}
                p_renderErrorMessage={renderErrorMessage}/>
            <TextInput
                p_label={"Email"}
                p_name={"email"}
                p_isRequired={true}
                p_renderErrorMessage={renderErrorMessage}/>

            {/* Select type of account */}
            Account flags:

            <CheckBoxContainer>
                <CheckBox
                    p_id="admin_toggle"
                    p_label="Admin"
                    p_checked={true}
                />
                <CheckBox
                    p_id="jwt_toggle"
                    p_label="Require JWT token"
                    p_checked={true}

                />
                <CheckBox
                    p_id="all_visibility_toggle"
                    p_label="All content visible"
                    p_checked={true}

                />
                <CheckBox
                    p_id="security_toggle"
                    p_label="Security checks"
                    p_checked={true}

                />

                {/*<RadioGroup*/}
                {/*    p_id="type_of_account"*/}
                {/*    p_options={["volunteer","organization"]}*/}

                {/*/>*/}
            </CheckBoxContainer>

            <ButtonWrapper>
                <DebugSubmit type="submit" value="Update Info"/>
            </ButtonWrapper>
        </Form>
    );
    if (SessionService.checkIsLoggedIn()) {
        navigate("/profile", {replace: true});
        return <></>;
    } else {
        return (
            <DebugContainer>
                <DebugForm>
                    <DebugTitle>Manually set user info</DebugTitle>
                    {renderForm}
                </DebugForm>
            </DebugContainer>
        );
    }
};

export default DebugPanel;
