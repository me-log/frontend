import MainButton from "./common/MainButton";
import EmotionGraph from "./EmotionGraph";
import { styled } from "styled-components";
import { useSelector } from "react-redux";

export default function CreateEmotion() {
	//임시 데이터
	const emotionData = useSelector((state) => state.allEmotionData);
	//const emotionData = null;
	return (
		<div>
			<form>
				<Gap size={100} />
				<MainButton
					children="오늘의 감정 분석 받아오기"
					buttonStyle={"purple"}
					type="submit"
				/>
				<Gap size={100} />
				{emotionData && (
					<EmotionGraph width={600} height={400} data={emotionData} />
				)}
				<Gap size={100} />
			</form>

			<MainButton
				children="저장"
				buttonStyle={"purple"}
				disabled={!emotionData}
			/>
			<Gap size={100} />
		</div>
	);
}

const Gap = styled.div`
	height: ${(props) => props.size}px;
`;
