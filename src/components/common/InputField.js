import React from "react";
import styled from "styled-components";

export default function InputField({
	children,
	type,
	value,
	onChange,
	placeholder,
}) {
	return (
		<div style={divStyle}>
			<Styledlabel>{children}</Styledlabel>
			<StyledInput
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}

const StyledInput = styled.input`
	width: 243px;
	height: 38px;
	border: 1px solid #c6cdd7;
	border-radius: 50px;

	padding-left: 30px;
	outline: none;

	&:focus {
		border: 2px solid #803fea;
	}
`;

const Styledlabel = styled.label`
	font-family: "Josefin Slab";
	font-style: normal;

	line-height: 30px;
	padding-left: 30px;
	font-size: 15px;
	font-weight: 500;
`;

const divStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	marginBottom: "20px",
};
