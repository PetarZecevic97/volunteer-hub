import React, {useState} from "react";
import {StyledCheckBox} from "../Debug/styles/DebugStyles";
export const CheckBox = ({p_id, p_label, p_checked, ...props}) => {
	const [isChecked, setIsChecked] = useState(false);

		return (
			<StyledCheckBox
				className="container">
				{p_label}
				<input
					id={p_id}
					type="checkbox"
					onChange={() => setIsChecked((prev) => {
						console.log("Hello");
						return !prev;
					})}
					{...props}
				/>
				<span className="checkmark"></span>
			</StyledCheckBox>
		)
}