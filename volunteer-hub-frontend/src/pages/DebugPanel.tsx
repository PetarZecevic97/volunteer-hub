import React, {useState} from "react";
import {
    DebugTitle,
    DebugForm,
    DebugError,
    DebugSubmit,
    DebugContainer,
    ButtonWrapper,
    Form, CheckBoxContainer, StyledCheckBoxContainer,
} from "../components/Debug/styles/DebugStyles";
import {WebRequestsInterface} from "../webRequests/webRequests-int";
import getWebRequest from "../webRequests/webRequestsProvider";
import {useNavigate} from "react-router-dom";
import "../components/DebugPanel/styles/DebugPanel.css";
import {CheckBox} from "../components/DebugPanel/CheckBox";
import {TextInput} from "../components/DebugPanel/TextInput";
import {checkIsLoggedIn, getUserInfo} from "../utility/Services/SessionService";

interface IErrorMessages {
    name?: string;
    email?: string;
    password?: string;
    message?: string;
}

const DebugPanel = () => {
    const [errorMessages, setErrorMessages] = useState<IErrorMessages>();

    const [flags, setFlags] = useState([
        {id: "admin_toggle", label: "Admin", checked: true},
        {id: "jwt_toggle", label: "Require JWT Token", checked: true},
        {id: "all_visibility_toggle", label: "All content visible", checked: true},
        {id: "auth_toggle", label: "Authorization checks", checked: true},
        {id: "volunteer_toggle", label: "Volunteer account", checked: true},
        {id: "organization_toggle", label: "Organization account", checked: true},
    ]);


    const [sessionInfo, setSessionInfo] = useState(getUserInfo());
    const navigate = useNavigate();

    const userService: WebRequestsInterface = getWebRequest();

    const handleSubmit = (event: any) => {
        setDebugValues(event);
    };

    const handleChange = (isChecked, i) => {
        let tmp = flags[i];
        tmp.checked = !isChecked;
        let flagsClone = [...flags];
        flagsClone[i] = tmp;
        setFlags([...flagsClone]);
        console.log(flags)
    };

    const setDebugValues = async (event: any) => {
        //Prevent page reload
        event.preventDefault();

        const pass = event.currentTarget.pass.value;
        const username = event.currentTarget.username.value;

        flags.map(({id, label, checked}, i) => {

        });
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
                {flags.map(({id, label, checked}, i) => (
                    <CheckBox
                        p_id={id}
                        p_label={label}
                        p_checked={checked}
                        p_index={i}
                        p_handle_change={handleChange}
                    />
                ))}


            </CheckBoxContainer>

            <ButtonWrapper>
                <DebugSubmit type="submit" value="Update Info"/>
            </ButtonWrapper>
        </Form>
    );
    if (checkIsLoggedIn()) {
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
