import React from "react";
import styled from "styled-components";
import recordLogo from "../assets/record-logo.png";

export default function MainHeader({
	children1,
	children2,
	onClick1,
	onClick2,
	imgWidth,
}) {
	return (
		<MainHeaderContainer>
			<img
				src={recordLogo}
				width="40px"
				height="40px"
				alt="로고이미지"
				className="header-logo-img"
			/>
			<a href="/main" className="proj-name">
				Melog
			</a>
			{children1 && (
				<div className="nav-button">
					<button className="button-img" onClick={onClick1}>
						<img
							src={children1}
							alt="button-image1"
							style={{ width: imgWidth }}
						/>
					</button>
					<button className="button-img" onClick={onClick2}>
						<img
							src={children2}
							alt="button-image2"
							style={{ width: "30px" }}
						/>
					</button>
				</div>
			)}
			{!children1 && children2 && (
				<div className="nav-button">
					<div style={{ width: "50px" }}></div>
					<button className="button-img" onClick={onClick2}>
						<img
							src={children2}
							alt="button-image2"
							style={{ width: "30px" }}
						/>
					</button>
				</div>
			)}
		</MainHeaderContainer>
	);
}

const MainHeaderContainer = styled.div`
	width: 100%;
	height: 50px;

	display: flex;
	padding: 5px 0px 20px 5px;

	.header-logo-img {
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
		font-weight: 650;

		font-size: 35px;
		line-height: 50px;

		color: #915cff;
	}

	.nav-button {
		position: absolute;
		top: 14px;
		right: 40px;

		display: flex;
		align-items: center;

		min-width: 102px;
		min-height: 53px;
	}

	.button-img {
		border: none;
		background: none;
		cursor: pointer;
		min-width: 50px;
	}
`;
