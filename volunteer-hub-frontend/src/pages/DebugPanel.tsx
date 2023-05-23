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
import {checkIsLoggedIn, getUserInfo, setDebugValue, setUserInfo} from "../utility/Services/SessionService";

interface IErrorMessages {
    name?: string;
    email?: string;
    password?: string;
    message?: string;
}

const DebugPanel = () => {
    const [errorMessages, setErrorMessages] = useState<IErrorMessages>();

    const [flags, setFlags] = useState([
        {id: "debug_admin_toggle", label: "Admin", checked: true},
        {id: "debug_jwt_toggle", label: "Require JWT Token", checked: true},
        {id: "debug_all_visibility_toggle", label: "All content visible", checked: true},
        {id: "debug_auth_toggle", label: "Authorization checks", checked: true},
        {id: "debug_volunteer_toggle", label: "Volunteer account", checked: true},
        {id: "debug_organization_toggle", label: "Organization account", checked: true},
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

    const setDebugValues = (event: any) => {
        //Prevent page reload
        event.preventDefault();

        const username = event.currentTarget.username.value;
        const email = event.currentTarget.email.value;

        setUserInfo(username, email);
        console.log(getUserInfo())

        flags.map(({id, label, checked}, i) => {
            setDebugValue(checked,label)
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
