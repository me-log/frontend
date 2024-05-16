import React from "react";
import styled, { css } from "styled-components";

export default function EmotionButton({ emotion, onClick }) {
	const emotionButtonStyle = Emotions[emotion];
	return (
		<StyledButton
			$emotionButtonStyle={emotionButtonStyle}
			onClick={onClick}
		></StyledButton>
	);
}

const StyledButton = styled.button`
	${({ $emotionButtonStyle }) => $emotionButtonStyle}
	margin: 5px;
	border: none;
	cursor: pointer;

	padding: var(--button-padding, 12px 12px);
	border-radius: var(--button-radius, 50px);
	background: var(--button-bg-color, #d9d9d9);

	opacity: 0.5;

	&:hover,
	&:active,
	&:focus {
		opacity: 1;
		box-shadow: -3px -3px var(--button-hover-bg-color) inset;
	}
`;

const Emotions = {
	all: css`
		--button-bg-color: #b8bbb8;
		--button-hover-bg-color: #999c9a;
	`,
	happiness: css`
		--button-bg-color: #f2d665;
		--button-hover-bg-color: #d8c159;
	`,
	neutral: css`
		--button-bg-color: #89d8aa;
		--button-hover-bg-color: #75b891;
	`,
	sadness: css`
		--button-bg-color: #6ba3d8;
		--button-hover-bg-color: #5a88b4;
	`,
	anger: css`
		--button-bg-color: #f35b59;
		--button-hover-bg-color: #db5251;
	`,
	surprise: css`
		--button-bg-color: #7fccde;
		--button-hover-bg-color: #6eb6c4;
	`,
	fear: css`
		--button-bg-color: #e3aedd;
		--button-hover-bg-color: #b489af;
	`,
};
