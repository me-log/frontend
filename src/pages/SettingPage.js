import React, { useState, useEffect } from "react";
import { MainHeader } from "../components";
import { InputField, MainButton } from "../components";
import { styled } from "styled-components";
import buttonImage from "../assets/sign-out.png";
import {
	fetchLogout,
	fetchGetUserInfo,
	fetchEditUserInfo,
	fetchEditUserPassword,
	fetchUserOut,
} from "../api/userService";

export default function SettingPage() {
	const [activeTab, setActiveTab] = useState("profile");
	const [userInfo, setUserInfo] = useState([]);
	const [name, setName] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleNameChange = (e) => {
		setName(e.target.value);
	};
	const handleCurrentPasswordChange = (e) => {
		setCurrentPassword(e.target.value);
	};
	const handleNewPasswordChange = (e) => {
		setNewPassword(e.target.value);
	};
	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};

	const handleProfileUpdate = async () => {
		try {
			const updatedUserInfo = await fetchEditUserInfo({ nickname: name });
			setUserInfo(updatedUserInfo);
			console.log("프로필이 성공적으로 수정되었습니다:", updatedUserInfo);
		} catch (error) {
			console.log("프로필 수정에 실패했습니다:", error);
		}
	};

	const handlePasswordUpdate = async () => {
		try {
			const success = await fetchEditUserPassword({
				cur_password: currentPassword,
				new_password: newPassword,
				confirm_newPassword: confirmPassword,
			});
			if (success) {
				console.log("비밀번호가 성공적으로 수정되었습니다");
			}
		} catch (error) {
			console.log("비밀번호 수정에 실패했습니다:", error);
		}
	};

	useEffect(() => {
		const getUserInfo = async () => {
			try {
				const userData = await fetchGetUserInfo();
				setUserInfo(userData);
			} catch (error) {
				console.error("Error fetching user info:", error);
			}
		};
		getUserInfo();
	}, []);

	return (
		<div>
			<MainHeader children2={buttonImage} onClick2={fetchLogout} />

			<Gap size={30} />
			<div>
				<TabButton
					$active={activeTab === "profile"}
					onClick={() => setActiveTab("profile")}
				>
					프로필 수정
				</TabButton>
				<TabButton
					$active={activeTab === "password"}
					onClick={() => setActiveTab("password")}
				>
					비밀번호 수정
				</TabButton>
			</div>
			<Gap size={50} />
			{activeTab === "profile" && (
				<InfoDiv className="profile-edit">
					<h2>프로필 수정</h2>
					<p>
						현재 아이디 :{" "}
						{userInfo ? userInfo.profileId : "로딩 중..."}
					</p>
					<p>현재 이름 : {userInfo ? userInfo.name : "로딩 중..."}</p>
					<InputField
						type="name"
						placeholder="새로운 이름"
						value={name}
						onChange={handleNameChange}
					>
						새로운 이름
					</InputField>
					<div className="button-group">
						<MainButton
							buttonStyle={"purple"}
							disabled={!name}
							onClick={handleProfileUpdate}
						>
							수정
						</MainButton>
						<MainButton buttonStyle={"gray"}>취소</MainButton>
					</div>
				</InfoDiv>
			)}
			{activeTab === "password" && (
				<InfoDiv className="profile-edit">
					<h2>비밀번호 수정</h2>
					<InputField
						type="password"
						placeholder="기존 비밀번호"
						value={currentPassword}
						onChange={handleCurrentPasswordChange}
					>
						현재 비밀번호
					</InputField>
					<InputField
						type="password"
						placeholder="새로운 비밀번호"
						value={newPassword}
						onChange={handleNewPasswordChange}
					>
						새로운 비밀번호
					</InputField>
					<InputField
						type="password"
						placeholder="새로운 비밀번호 확인"
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
					>
						새로운 비밀번호 확인
					</InputField>
					<div className="button-group">
						<MainButton
							buttonStyle={"purple"}
							disabled={
								!currentPassword ||
								!newPassword ||
								!confirmPassword ||
								newPassword !== confirmPassword
							}
							onClick={handlePasswordUpdate}
						>
							수정
						</MainButton>
						<MainButton buttonStyle={"gray"}>취소</MainButton>
					</div>
				</InfoDiv>
			)}
			<Gap size={50} />
			<MainButton buttonStyle={"red"} onClick={fetchUserOut}>
				회원 탈퇴
			</MainButton>
			<Gap size={200} />
		</div>
	);
}

const InfoDiv = styled.div`
	border: 1px solid #c6cdd7;
	border-radius: 20px;

	display: inline-flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	min-width: 350px;
	min-height: 300px;
	padding: 40px;

	text-align: center;

	background-color: rgb(255, 255, 255);
	box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

	h2 {
		margin-bottom: 50px;
	}

	p {
		margin-top: -10px;
	}

	div.button-group {
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
	}
`;

const TabButton = styled.button`
	background-color: ${({ $active }) => ($active ? "#915cff" : "#fff")};
	color: ${({ $active }) => ($active ? "#fff" : "#888")};
	border: none;
	padding: 10px 20px;
	cursor: pointer;
	outline: none;

	transition: all 0.3s ease;
	border-radius: 5px;
	margin-right: 10px;

	font-size: 15px;
	font-weight: 700;

	&:hover {
		background-color: #f0f0f0;
	}
`;

const Gap = styled.div`
	height: ${(props) => props.size}px;
`;
