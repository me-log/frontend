import React, { useEffect, useState } from "react";
import {
	MainHeader,
	Calendar,
	ViewDiary,
	MainButton,
	CreateEmotion,
	CreateSong,
} from "../components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiEdit2Fill } from "react-icons/ri";
import buttonImage1 from "../assets/select-all.png";
import buttonImage2 from "../assets/profile.png";
//import { findDiaryByDate } from "../utils/findDiaryByDate";
import { fetchGetDiaryByDate } from "../api/diaryService";

export default function MainPage() {
	let navigate = useNavigate();
	let selectedDate = useSelector((state) => state.selectedDate.currentDate);

	// const diary = useMemo(() => findDiaryByDate(selectedDate), [selectedDate]);
	// console.log(diary);

	// const diary = useMemo(() => {
	// 	if (!selectedDate) return null;
	// 	try {
	// 		return fetchGetDiaryByDate(selectedDate);
	// 	} catch (error) {
	// 		console.error(
	// 			"Failed to fetch diary from API. Trying local method."
	// 		);
	// 		return findDiaryByDate(selectedDate);
	// 	}
	// }, [selectedDate]);

	const [diary, setDiary] = useState(null);

	useEffect(() => {
		const fetchDiary = async () => {
			try {
				const fetchedDiary = await fetchGetDiaryByDate(selectedDate);
				setDiary(fetchedDiary);
			} catch (error) {
				console.error(error);
			}
		};
		fetchDiary();
	}, [selectedDate]);

	console.log(diary);

	return (
		<Main>
			<MainHeader
				children1={buttonImage1}
				children2={buttonImage2}
				onClick1={() => {
					navigate("/diary-list");
				}}
				onClick2={() => {
					navigate("/user/info");
				}}
				imgWidth="48px"
			></MainHeader>
			<Calendar />

			{diary ? (
				<div>
					<ViewDiary
						diaryId={diary[0].id}
						diaryTitle={diary[0].title}
						diaryContents={diary[0].contents}
						diaryDate={diary[0].date}
						emotion={diary[0].mostEmotion}
					/>
					<CreateEmotion />
					<CreateSong />
				</div>
			) : (
				<div className="no-diary">
					<MainButton
						onClick={() => {
							navigate("/diary-create");
						}}
					>
						<RiEdit2Fill className="drop-icon" />
						<span>일기 쓰러가기</span>
					</MainButton>
				</div>
			)}
		</Main>
	);
}

const Main = styled.div`
	.no-diary {
		margin-top: 70px;
	}

	.drop-icon {
		padding-right: 5px;
		position: relative;
		top: 2px;
	}
`;
