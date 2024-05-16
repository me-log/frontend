import API from "./api";

export const fetchRegister = async (user) => {
	const { id, password, confirmPassword, nickname } = user;

	const requestBody = {
		profileId: id,
		password: password,
		passwordCheck: confirmPassword,
		name: nickname,
	};

	try {
		const response = await API.post("/user/join", requestBody);
		if (response.status === 201) {
			// 계정 생성 성공 시 알림 띄우고 /으로 페이지 이동
			alert("계정이 성공적으로 생성되었습니다.");
			window.location.href = "/";
		}
	} catch (error) {
		if (error.response && error.response.data) {
			// 서버로부터의 에러 응답이 있는 경우 해당 메시지를 띄움
			alert(error.response.data);
		} else {
			console.log(error);
			alert("서버와의 통신 중 문제가 발생했습니다.");
		}
	}
};

export const fetchLogin = async (user) => {
	const { id, password } = user;

	const requestBody = {
		profileId: id,
		password: password,
	};

	try {
		const response = await API.post("/user/login", requestBody);
		if (response.status === 200) {
			// 로그인 성공 시 /main으로 페이지 이동
			window.location.href = "/main";
		}
	} catch (error) {
		if (error.response && error.response.data) {
			// 서버로부터의 에러 응답이 있는 경우 해당 메시지를 띄움
			alert(error.response.data);
		} else {
			console.log(error);
			alert("서버와의 통신 중 문제가 발생했습니다.");
		}
	}
};

export const fetchLogout = async () => {
	try {
		const response = await API.post("/user/logout");
		if (response.status === 200) {
			// 로그아웃 성공 시 /으로 페이지 이동
			window.location.href = "/";
		}
	} catch (error) {
		if (error.response && error.response.data) {
			// 서버로부터의 에러 응답이 있는 경우 해당 메시지를 띄움
			alert(error.response.data);
		} else {
			console.log(error);
			alert("서버와의 통신 중 문제가 발생했습니다.");
		}
	}
};

export const fetchGetUserInfo = async (user) => {
	try {
		const response = await API.get("/user/info/check");
		if (response.status === 200) {
			console.log(response.data);
			return response.data;
		}
	} catch (error) {
		if (error.response && error.response.data) {
			// 서버로부터의 에러 응답이 있는 경우 해당 메시지를 띄움
			alert(error.response.data);
		} else {
			console.log(error);
			alert("서버와의 통신 중 문제가 발생했습니다.");
		}
	}
};

export const fetchEditUserInfo = async (user) => {
	const { nickname } = user;

	const requestBody = {
		name: nickname,
	};

	try {
		const response = await API.post("/user/info/edit/profile", requestBody);
		if (response.status === 200) {
			window.location.href = "/user/info";
		}
	} catch (error) {
		if (error.response && error.response.data) {
			// 서버로부터의 에러 응답이 있는 경우 해당 메시지를 띄움
			alert(error.response.data);
		} else {
			console.log(error);
			alert("서버와의 통신 중 문제가 발생했습니다.");
		}
	}
};

export const fetchEditUserPassword = async (user) => {
	const { cur_password, new_password, confirm_newPassword } = user;

	const requestBody = {
		presPassword: cur_password,
		newPassword: new_password,
		newPasswordCheck: confirm_newPassword,
	};

	try {
		const response = await API.post(
			"/user/info/edit/password",
			requestBody
		);
		if (response.status === 200) {
			alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인하세요.");
			fetchLogout();
			window.location.href = "/";
		}
	} catch (error) {
		if (error.response && error.response.data) {
			// 서버로부터의 에러 응답이 있는 경우 해당 메시지를 띄움
			alert(error.response.data);
		} else {
			console.log(error);
			alert("서버와의 통신 중 문제가 발생했습니다.");
		}
	}
};

export const fetchUserOut = async () => {
	try {
		const response = await API.delete("/user/delete");
		if (response.status === 200) {
			// 회원탈퇴 성공 시 /으로 페이지 이동
			window.location.href = "/";
		}
	} catch (error) {
		console.log(error);
	}
};
