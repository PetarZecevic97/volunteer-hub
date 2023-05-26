import React, {useState} from "react";
import {StyledCheckBox, StyledCheckMark} from "./styles/DebugPanelSC";

export const CheckBox = ({p_id, p_label, p_checked, p_index, p_handle_change, ...props}) => {
    const [isChecked, setIsChecked] = useState(p_checked);

    const handleOnChange = (isChecked,index) => {
        setIsChecked(!isChecked);
        p_handle_change(isChecked, p_index);
    };

    return (
        <>
            {p_label}
            <StyledCheckBox
                type="checkbox"
                checked={isChecked}
                onChange={() => handleOnChange(isChecked,p_index)}
            />
            <StyledCheckMark/>
        </>
    )

}