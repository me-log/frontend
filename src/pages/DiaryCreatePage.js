import React from "react";
import styled from "styled-components";
import { MyHeader, DiaryForm } from "../components";
import { useSelector } from "react-redux";

export default function DiaryCreatePage() {
	let selectedDate = useSelector((state) => state.selectedDate.currentDate);

	return (
		<DiaryPageContainer>
			<MyHeader></MyHeader>
			<DiaryForm date={selectedDate} />
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
