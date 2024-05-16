import React, { useState } from "react";
import {
	MyHeader,
	MyFooter,
	Login,
	Signup,
	BasicModal,
	Diary,
	EmotionGraph,
	MainButton,
	ScrollAnimationContainer,
} from "../components/index";
import styled from "styled-components";
import recordLogoBig from "../assets/landing-logo.svg";
import recordPlayer from "../assets/record-player.png";
import { updateRandomEmotion } from "../utils/updateRandomEmotion";
import { useSelector, useDispatch } from "react-redux";
import { setAllEmotionData, setHighestEmotion } from "../store";

export default function LandingPage() {
	let emotion = useSelector((state) => state.highestEmotion.emotion);
	console.log(emotion);
	const [loginModal, setLoginModal] = useState(false);
	const [signupModal, setSignupModal] = useState(false);

	const toggleModal = (modalType) => {
		if (modalType === "login") {
			setLoginModal(!loginModal);
		} else if (modalType === "signup") {
			setSignupModal(!signupModal);
		}
	};

	if (loginModal || signupModal) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "auto";
	}

	const dispatch = useDispatch();
	const data = useSelector((state) => state.allEmotionData);
	const handleUpdateEmotion = () => {
		const newData = updateRandomEmotion(data);
		dispatch(setAllEmotionData(newData));

		const highestValueEmotion = newData.reduce((max, cur) =>
			max.value > cur.value ? max : cur
		);
		dispatch(setHighestEmotion(highestValueEmotion.id));
	};

	console.log(data);

	return (
		<Landing>
			{(loginModal || signupModal) && (
				<div
					className="modal-background"
					onClick={() => toggleModal(loginModal ? "login" : "signup")}
				></div>
			)}
			{loginModal && (
				<BasicModal closeModal={() => toggleModal("login")}>
					<Login></Login>
				</BasicModal>
			)}
			{signupModal && (
				<BasicModal closeModal={() => toggleModal("signup")}>
					<Signup></Signup>
				</BasicModal>
			)}
			<MyHeader
				children1="로그인"
				children2="회원가입"
				position="fixed"
				onClick1={() => {
					toggleModal("login");
				}}
				onClick2={() => {
					toggleModal("signup");
				}}
			></MyHeader>
			<Section1>
				<Logo src={recordLogoBig} />
			</Section1>
			<Section2>
				<div className="description">
					<ScrollAnimationContainer>
						마음을 담을 수 있는 특별한 공간, Melog입니다. <br />
						하루의 감정을 기록하고 나를 발견하는 여정을 함께하세요.
					</ScrollAnimationContainer>
				</div>
				<div className="diary-container">
					<Diary
						diaryTitle="Today I Feel"
						diaryContents="오늘은 2024년 2월 23일 금요일이다. 이게 과연 프로젝트 발표회를 하는 날까지 완성이 되었을지?"
						diaryDate={"2024-02-23"}
						emotion={emotion}
					></Diary>
				</div>
				<div>
					<MainButton onClick={handleUpdateEmotion}>
						Today's Feeling
					</MainButton>
					<EmotionGraph
						width={800}
						height={500}
						data={data}
					></EmotionGraph>
				</div>
			</Section2>
			<Section3>
				<LogoText>
					Love this <br />
					quiet moment
				</LogoText>
			</Section3>
			<MyFooter></MyFooter>
		</Landing>
	);
}

const Landing = styled.div`
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 5;

		overflow: hidden;
	}
`;

const Section1 = styled.div`
	height: 1080px;
	background: linear-gradient(
		180deg,
		rgba(120, 78, 189, 1) 10%,
		rgba(168, 74, 187, 0.46) 70%,
		rgba(255, 255, 255, 0) 90%
	);
`;

const Logo = styled.img`
	width: 850px;
	height: 445px;
	position: absolute;
	top: 45%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Section2 = styled.div`
	height: 1080px;
	background: white;
	display: flex;
	align-items: center;
	justify-content: center;

	.description {
		font-family: "NanumSquareNeo-Variable";
		font-size: 35px;
		position: absolute;
		top: 105%;
		font-weight: bold;
		color: #8154e7;
		line-height: 100px;
	}

	.diary-container {
		margin-left: 120px;
	}
`;

const Section3 = styled.div`
	height: 850px;

	background: url(${recordPlayer});
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
	margin: 0 0 -5px 0;
	padding: 0;
`;

const LogoText = styled.span`
	position: absolute;
	top: 45%;
	left: 30%;
	transform: translate(-50%, -50%);

	text-align: left;

	font-family: "Italiana";
	font-style: normal;
	font-weight: 400;
	font-size: 128px;
	line-height: 151px;
	color: #fff;
`;
