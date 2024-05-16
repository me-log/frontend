import { DiaryList } from "../data";

export const findDiaryByDate = (selectedDate) => {
	// 다이어리 리스트에서 선택된 날짜와 동일한 날짜를 가진 다이어리를 찾음
	const foundDiary = DiaryList.find((diary) => diary.date === selectedDate);

	// 만약 찾은 다이어리가 없다면 null을 반환
	if (!foundDiary) {
		console.log(`다이어리가 없습니다. 선택된 날짜: ${selectedDate}`);
		return null;
	}

	// 찾은 다이어리가 있다면 해당 다이어리를 반환
	return foundDiary;
};
