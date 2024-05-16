import React, { useState } from "react";
import styled from "styled-components";
import { InputField, MainButton } from "./index";
import { fetchRegister } from "../api/userService";

export default function Signup() {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [nickname, setNickname] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchRegister({ id, password, confirmPassword, nickname });
	};

	return (
		<SignupContainer>
			<div className="login-div">
				<span>JOIN US</span>
				<Gap size={40} />
				<form onSubmit={handleSubmit}>
					<InputField
						type="text"
						name="id"
						placeholder="아이디를 입력해주세요"
						value={id}
						onChange={(e) => {
							setId(e.target.value);
						}}
					>
						아이디
					</InputField>
					<InputField
						type="password"
						name="password"
						placeholder="비밀번호를 입력해주세요"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					>
						비밀번호
					</InputField>
					<InputField
						type="password"
						name="confirmPassword"
						placeholder="비밀번호를 다시 한 번 입력해주세요"
						value={confirmPassword}
						onChange={(e) => {
							setConfirmPassword(e.target.value);
						}}
					>
						비밀번호 확인
					</InputField>
					<InputField
						type="text"
						name="nickname"
						placeholder="이름을 입력해주세요"
						value={nickname}
						onChange={(e) => {
							setNickname(e.target.value);
						}}
					>
						이름
					</InputField>
					<Gap size={20} />
					<MainButton type="submit">회원가입</MainButton>
				</form>
			</div>
		</SignupContainer>
	);
}

const SignupContainer = styled.div`
	.login-div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	span {
		margin: 20px 0 0 0;
		font-weight: 700;
		font-size: 30px;
		text-align: center;
		color: #915cff;
	}
`;

const Gap = styled.div`
	height: ${(props) => props.size}px;
`;
