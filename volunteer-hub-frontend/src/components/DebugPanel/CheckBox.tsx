import React, {useState} from "react";
import {StyledCheckBox, StyledCheckBoxContainer, StyledCheckMark} from "../Debug/styles/DebugStyles";

export const CheckBox = ({p_id, p_label, p_checked, ...props}) => {
    const [isChecked, setIsChecked] = useState(p_checked);

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            {p_label}
            <StyledCheckBox
                type="checkbox"
                checked={isChecked}
                onChange={handleOnChange}
            />
            <StyledCheckMark/>
        </>
    )

}