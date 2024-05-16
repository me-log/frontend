import React, { useState } from "react";
import styled from "styled-components";
import { InputField, MainButton } from "./index";
import { fetchLogin } from "../api/userService";

export default function Login() {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchLogin({ id, password });
	};

	return (
		<LoginContainer>
			<div className="login-div">
				<span>LOGIN</span>
				<Gap size={40} />
				<form onSubmit={handleSubmit}>
					<InputField
						type="id"
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
						placeholder="비밀번호를 입력해주세요"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					>
						비밀번호
					</InputField>
					<Gap size={20} />
					<MainButton type="submit">로그인</MainButton>
				</form>
			</div>
		</LoginContainer>
	);
}

const LoginContainer = styled.div`
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
