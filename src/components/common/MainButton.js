import React from "react";
import styled, { css } from "styled-components";

export default function MainButton({
	children,
	onClick,
	buttonStyle,
	disabled,
}) {
	const basicButtonStyle = STYLES[buttonStyle];
	return (
		<StyledButton
			$basicButtonStyle={basicButtonStyle}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</StyledButton>
	);
}

const StyledButton = styled.button`
	${({ $basicButtonStyle }) => $basicButtonStyle}
	border: none;
	cursor: pointer;

	font-size: 15px;
	font-weight: 700;
	border-radius: 24px;

	padding: 8px 12px;
	background: var(--button-bg-color, #915cff);
	color: var(--button-color, #ffffff);

	&:hover {
		color: var(--button-hover-color, #ffffff);
		background: var(--button-hover-bg-color, #572ba0);
	}

	&:disabled {
		cursor: default;
		opacity: 0.5;
		background: var(--button-bg-color, #4a2689);
	}

	min-width: var(--button-width, 70px);
	min-height: 25px;
	margin: var(--button-margin, 10px 6px);
`;

const STYLES = {
	purple: css`
		--button-color: #ffffff;
		--button-bg-color: #915cff;
		--button-hover-bg-color: #572ba0;
	`,
	gray: css`
		--button-color: #222;
		--button-bg-color: #e9e9e9;
		--button-hover-bg-color: #ababab;
	`,
	small: css`
		--button-width: 30px;
		--button-margin: 0px;
	`,
	red: css`
		--button-color: #333;
		--button-bg-color: #e9e9e9;
		--button-hover-bg-color: #f6321f;
	`,
};
