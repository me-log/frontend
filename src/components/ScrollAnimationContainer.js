import React from "react";
import useScrollAnimation from "../utils/useScrollAnimation";
import styled, { keyframes } from "styled-components";

export const ScrollAnimationContainer = ({ children }) => {
	const { ref, isInViewport } = useScrollAnimation();
	return (
		<ScrollContainer ref={ref} className={isInViewport ? "frame-in" : ""}>
			{children}
		</ScrollContainer>
	);
};

const frameInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10%);
  }

  100%{
    opacity: 1;
    transform: translateY(0%);
  }
`;

const ScrollContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 500px;

	&.frame-in {
		animation: ${frameInAnimation} 5s forwards;
	}
`;
