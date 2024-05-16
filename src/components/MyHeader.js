import React from "react";
import styled from "styled-components";
import { MainButton } from "./index";
import recordLogo from "../assets/record-logo.png";

export default function MyHeader({
	children1,
	children2,
	position,
	onClick1,
	onClick2,
}) {
	const extraStyles =
		position === "fixed" ? { background: "white", zIndex: "1" } : {};
	return (
		<HeaderContainer style={{ position, ...extraStyles }}>
			<img src={recordLogo} width="40px" height="40px" alt="로고이미지" />
			<a href="/main" className="proj-name">
				Melog
			</a>
			{children1 && (
				<div className="nav-button">
					<MainButton onClick={onClick1} buttonStyle={"purple"}>
						{children1}
					</MainButton>
					<MainButton onClick={onClick2} buttonStyle={"gray"}>
						{children2}
					</MainButton>
				</div>
			)}
		</HeaderContainer>
	);
}

const HeaderContainer = styled.div`
	width: 100%;
	height: 50px;

	display: flex;
	padding: 5px 0px 20px 5px;

	img {
		position: absolute;
		top: 20px;
		left: 35px;
	}

	.proj-name {
		text-decoration-line: none;
		position: absolute;
		top: 13px;
		left: 83px;

		font-family: "Quicksand", sans-serif;
		font-weight: 550;

		font-size: 35px;
		line-height: 50px;

		color: #915cff;
	}

	.nav-button {
		position: absolute;
		top: 14px;
		right: 15px;
	}

	.button-image {
		width: 10px;
	}
`;
