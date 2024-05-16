import React from "react";
import styled, { css } from "styled-components";
import DropdownMenu from "./common/DropdownMenu";

export default function Diary({
	diaryId,
	diaryTitle,
	diaryContents,
	diaryDate,
	emotion,
	className,
	onClick,
}) {
	const formattedDate = formatDate(diaryDate);
	const emotionStyle = Emotions[emotion];
	return (
		<DiaryContainer className={className}>
			<DropdownMenu diaryId={diaryId}></DropdownMenu>
			<EmotionComponent
				$emotionStyle={emotionStyle}
				className="emotion"
			/>

			<span className="diary-item-date">{formattedDate}</span>
			<span className="diary-item-title" onClick={onClick}>
				<strong>{diaryTitle}</strong>
			</span>
			<div className="diary-item-content">
				<span className="contents">{diaryContents}</span>
			</div>
		</DiaryContainer>
	);
}

const EmotionComponent = styled.span`
	${({ $emotionStyle }) => $emotionStyle}
`;

const DiaryContainer = styled.div`
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 16px;

	width: 300px;
	height: 340px;
	margin: 20px;
	padding: 10px;
	box-shadow: 0 10px 25px -10px rgba(0, 0, 0, 0.1);

	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

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
		height: 40px;
		color: #333;
		font-size: 17px;
		line-height: 2;
		padding: 5px 40px;
		border-bottom: 1px solid #c6cdd7;

		cursor: pointer;
		transition: color 0.2s ease-in-out;

		&:hover {
			color: #803fea;
		}
	}

	.diary-item-content {
		display: -webkit-box;
		-webkit-line-clamp: 8;
		-webkit-box-orient: vertical;

		width: 80%;
		height: 145px;
		line-height: 1.4;
		overflow: hidden;
		text-overflow: ellipsis;

		color: #999;
		font-size: 15px;
		text-align: left;

		padding: 25px;
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
