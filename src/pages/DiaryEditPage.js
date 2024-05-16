import React from "react";
import styled from "styled-components";
import { MyHeader, DiaryEdit } from "../components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function DiaryEditPage() {
	const { diaryId } = useParams();
	console.log(diaryId);

	let selectedDate = useSelector((state) => state.selectedDate.currentDate);

	return (
		<DiaryPageContainer>
			<MyHeader></MyHeader>
			<DiaryEdit curDate={selectedDate} diaryId={diaryId} />
			<Gap size={25} />
		</DiaryPageContainer>
	);
}

const DiaryPageContainer = styled.div`
	align-items: center;
`;

const Gap = styled.div`
	height: ${(props) => props.size}px;
`;
