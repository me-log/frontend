import API from "./api";

export const fetchCreateSong = async (diaryId) => {
	try {
		const response = await API.post(`/${diaryId}/song`);
		if (response.status === 200) {
		}
	} catch (error) {
		console.log(error);
	}
};
