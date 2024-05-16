import MainButton from "./common/MainButton";
import Music from "./Music";
import { MusicList } from "../data";
import { styled } from "styled-components";

export default function CreateSong() {
	const songData = MusicList;
	//const songData = null;
	return (
		<div>
			<Gap size={200} />
			<MainButton
				children="오늘의 노래 추천 받아오기"
				buttonStyle={"purple"}
				type="submit"
			/>
			<Gap size={150} />

			<div>
				{songData &&
					songData.map((music, index) => {
						return (
							<div>
								<Music
									key={index}
									musicTitle={music.musicTitle}
									musicArtist={music.musicArtist}
								></Music>
								<Gap size={80} />
							</div>
						);
					})}
			</div>

			<Gap size={100} />
			<MainButton
				children="저장"
				buttonStyle={"purple"}
				disabled={!songData}
			/>
			<Gap size={100} />
		</div>
	);
}

const Gap = styled.div`
	height: ${(props) => props.size}px;
`;
