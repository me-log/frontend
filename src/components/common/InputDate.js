import React, { useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";

export default function InputDate(props) {
	const [currentDate, setcurrentDate] = useState(
		props.date ? props.date : format(new Date(), "yyyy-MM-dd")
	);
	return (
		<StyledInputDate
			value={currentDate}
			onChange={(e) => setcurrentDate(e.target.value)}
			type="date"
			required
		/>
	);
}

const StyledInputDate = styled.input`
	border: none;
	border-radius: 15px;
	border: 1px solid rgba(0, 0, 0, 0.1);

	padding: 5px 20px;
	cursor: pointer;
	font-size: 15px;

	&:focus {
		outline: none;
		border: 1px solid #8642f7;
	}
`;
