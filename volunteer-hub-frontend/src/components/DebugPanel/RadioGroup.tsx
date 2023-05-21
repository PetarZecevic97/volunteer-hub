import React, {useState} from "react";
import {StyledCheckBox, StyledRadioBox} from "../Debug/styles/DebugStyles";

export const RadioGroup = ({p_id, p_options, ...props}) => {
	const [isChecked, setIsChecked] = useState(false);

	const capitalizeFirstLetter = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1)
	}

	return(
		<>
			{p_options.map((option)=>(
				<StyledRadioBox
					className="container">
					{capitalizeFirstLetter(option)}
					<input
						id={p_id}
						name={option}
						type="radio"
						onChange={() => setIsChecked((prev) => !prev)}
						{...props}
					/>
					<span className="checkmark"></span>
				</StyledRadioBox>
			))}
		</>
	)
}