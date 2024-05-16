import API from "./api";

export const fetchCreateDiary = async (diary) => {
	const { date, title, contents } = diary;

	const requestBody = {
		title,
		contents,
		date,
	};

	try {
		const response = await API.post("/diary", requestBody);
		if (response.status === 201) {
			alert("일기가 성공적으로 저장되었습니다.");
			//window.location.href = "/main";
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

export const fetchGetDiaryByDate = async (date) => {
	try {
		const response = await API.get("/diary", { params: { date } });
		if (response.status === 200) {
			console.log(response.data);
			return response.data;
		}
	} catch (error) {
		console.log(error);
	}
};

export const fetchGetDiaryList = async () => {
	try {
		const response = await API.get("/main");
		if (response.status === 200) {
			console.log(response.data);
			return response.data;
		}
	} catch (error) {
		console.log(error);
	}
};

export const fetchGetDiaryById = async (diaryId) => {
	try {
		const response = await API.get(`/diary/${diaryId}`);
		if (response.status === 200) {
			console.log(response.data);
			return response.data;
		}
	} catch (error) {
		console.log(error);
	}
};

export const fetchDeleteDiary = async (diaryId) => {
	try {
		const response = await API.delete(`/diary/${diaryId}`);
		if (response.status === 201) {
			alert("일기가 성공적으로 삭제되었습니다.");
			window.location.reload(); // 페이지 새로고침
		}
	} catch (error) {
		console.log(error);
	}
};

export const fetchEditDiary = async (diary, diaryId) => {
	const { date, title, contents } = diary;

	const requestBody = {
		title,
		contents,
		date,
	};

	try {
		const response = await API.put(`/diary/${diaryId}`, requestBody);
		if (response.status === 201) {
			alert("일기가 성공적으로 수정되었습니다.");
			//window.location.href = "/main";
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

export const fetchHighEmoByDate = async (date) => {
	try {
		const response = await API.get("/diary/emotion", { params: { date } });
		if (response.status === 200) {
			console.log(response.data);
			return response.data;
		}
		if (response.status === 400) {
			console.log(response.data);
			return response.data;
		}
	} catch (error) {
		//console.log(error);
	}
};
