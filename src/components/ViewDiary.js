import React from "react";
import styled, { css } from "styled-components";
import DropdownMenu from "./common/DropdownMenu";
import EmotionGraph from "./EmotionGraph";
import { useSelector } from "react-redux";

export default function ViewDiary({
	diaryId,
	diaryTitle,
	diaryContents,
	diaryDate,
	emotion,
}) {
	const formattedDate = formatDate(diaryDate);
	const emotionStyle = Emotions[emotion];

	console.log(diaryTitle);

	//임시 데이터
	const data = useSelector((state) => state.allEmotionData);

	return (
		<ViewDiaryContainer>
			<DropdownMenu
				dotButtonLeft={"330px"}
				dropdownTop={"98px"}
				dropdownLeft={"652px"}
				diaryId={diaryId}
			></DropdownMenu>
			<EmotionComponent
				$emotionStyle={emotionStyle}
				className="emotion"
			/>
			<span className="diary-item-date">{formattedDate}</span>
			<span className="diary-item-title">
				<strong>{diaryTitle}</strong>
			</span>
			<div className="diary-item-content">
				<span className="contents">{diaryContents}</span>
			</div>
			<EmotionGraph width={600} height={400} data={data}></EmotionGraph>
		</ViewDiaryContainer>
	);
}

const EmotionComponent = styled.span`
	${({ $emotionStyle }) => $emotionStyle}
`;

const ViewDiaryContainer = styled.div`
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 16px;

	width: 800px;
	height: 900px;
	margin: 20px;
	padding: 10px;

	box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.1);

	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	position: relative;

	.emotion {
		width: 30px;
		height: 10px;
		position: relative;
		top: -20px;
		border-radius: 10px;
		background: var(--button-bg-color, #b8bbb8);
	}

	.diary-item-date {
		font-size: 13px;
		color: #999;
	}

	.diary-item-title {
		display: inline-block;
		height: 50px;
		color: #333;
		font-size: 20px;
		line-height: 2;
		padding: 15px 200px;
		border-bottom: 1px solid #c6cdd7;
	}

	.diary-item-content {
		width: 80%;
		height: 200px;
		line-height: 1.7;

		color: #999;
		font-size: 17px;
		text-align: left;

		padding-top: 45px;
	}
`;

const Emotions = {
	all: css`
		--button-bg-color: #b8bbb8;
	`,
	happiness: css`
		--button-bg-color: #f2d665;
	`,
	neutral: css`
		--button-bg-color: #89d8aa;
	`,
	sadness: css`
		--button-bg-color: #6ba3d8;
	`,
	anger: css`
		--button-bg-color: #f35b59;
	`,
	surprise: css`
		--button-bg-color: #7fccde;
	`,
	fear: css`
		--button-bg-color: #e3aedd;
	`,
};

const formatDate = (dateString) => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}.${month}.${day}`;
};
