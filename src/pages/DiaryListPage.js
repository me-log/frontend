import React from "react";
import {
	MainHeader,
	EmotionButton,
	Diary,
	BasicModal,
	PeriodMenu,
} from "../components";
import { useState, useEffect } from "react";
import Isotope from "isotope-layout";
//import { emotions, DiaryList } from "../data";
import { emotions } from "../data";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import buttonImage1 from "../assets/select-one.png";
import buttonImage2 from "../assets/profile.png";
import { fetchGetDiaryList } from "../api/diaryService";

export default function DiaryListPage() {
	let navigate = useNavigate();

	const [isotope, setIsotope] = useState(null);
	const [filterKey, setFilterKey] = useState("*");
	const [diaryModal, setDiaryModal] = useState(false);
	const [viewDiary, setViewDiary] = useState(null);

	const [diaryList, setDiaryList] = useState([]);
	const fetchDiaryList = async () => {
		try {
			const diaryListData = await fetchGetDiaryList();
			setDiaryList(diaryListData);
		} catch (error) {
			console.error(error);
		}
	};

	if (diaryModal) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "auto";
	}

	const handleDiaryClick = (diary) => {
		setViewDiary(diary);
		setDiaryModal(true);
	};

	useEffect(() => {
		if (!isotope) {
			setIsotope(
				new Isotope(".filter-container", {
					itemSelector: ".filter-item",
					layoutMode: "fitRows",
				})
			);
		}
	}, [diaryList, isotope]);

	useEffect(() => {
		fetchDiaryList();
		//setDiaryList(DiaryList);
		if (isotope) {
			filterKey === "*"
				? isotope.arrange({ filter: `*` })
				: isotope.arrange({ filter: `.${filterKey}` });
		}
	}, [isotope, filterKey]);

	return (
		<DiaryListContainer>
			{diaryModal && (
				<div
					className="modal-background"
					onClick={() => setDiaryModal(false)}
				>
					<BasicModal closeModal={() => setDiaryModal(false)}>
						<Diary
							diaryTitle={viewDiary.diaryTitle}
							diaryContents={viewDiary.diaryContents}
							diaryDate={viewDiary.diaryDate}
							emotion={viewDiary.mostEmotion}
							className={`filter-item all ${viewDiary.emotion}`}
						></Diary>
					</BasicModal>
				</div>
			)}
			<MainHeader
				children1={buttonImage1}
				children2={buttonImage2}
				onClick1={() => {
					navigate("/main");
				}}
				onClick2={() => {
					navigate("/user/info");
				}}
				imgWidth="32px"
			></MainHeader>
			<PeriodMenu />
			<div
				style={{
					display: "flex",
					padding: "20px",
					justifyContent: "center",
				}}
			>
				{emotions.map(function (emotion, i) {
					return (
						<EmotionButton
							key={i}
							emotion={emotion}
							onClick={() => setFilterKey(emotion)}
						></EmotionButton>
					);
				})}
			</div>
			<div
				className="diart-list"
				style={{
					marginLeft: "12.4%",
				}}
			>
				<div className="filter-container">
					{diaryList &&
						diaryList.map((diary) => (
							<Diary
								key={diary.id}
								diaryId={diary.id}
								diaryTitle={diary.title}
								diaryContents={diary.contents}
								diaryDate={diary.date}
								emotion={diary.mostEmotion}
								className={`filter-item all ${diary.mostEmotion}`}
								onClick={() => handleDiaryClick(diary)}
							/>
						))}
				</div>
			</div>
		</DiaryListContainer>
	);
}

const DiaryListContainer = styled.div`
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
