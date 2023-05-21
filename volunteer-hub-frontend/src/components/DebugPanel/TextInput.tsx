import {DebugInputContainer, DebugInputText} from "../Debug/styles/DebugStyles";
import React from "react";

export const TextInput = ({p_label, p_name, p_renderErrorMessage, p_isRequired}) => {
	const requiredAttr = {required: p_isRequired}
	return (
		<DebugInputContainer>
			<label>{p_label} </label>
			<DebugInputText
				name={p_name}
				{...requiredAttr}
			/>
			{p_renderErrorMessage(p_name)}
		</DebugInputContainer>
	)
}