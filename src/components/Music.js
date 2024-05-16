import React from "react";
import styled from "styled-components";
import cover from "../assets/cover.png";
import LP from "../assets/LP.png";

export default function Music({ musicTitle, musicArtist }) {
	return (
		<MusicContainer>
			<div>
				<AlbumCover>
					<LPImg src={LP} alt="Album Cover" />
				</AlbumCover>
			</div>

			<SongContainer>
				<div className="music-item-title">
					<strong>{musicTitle}</strong>
				</div>
				<div className="music-item-artist">
					<span className="contents">{musicArtist}</span>
				</div>
			</SongContainer>
		</MusicContainer>
	);
}

const MusicContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const AlbumCover = styled.div`
	background: url(${cover});
	background-size: cover;
	box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.8);
	width: 200px;
	height: 200px;
`;

const LPImg = styled.img`
	position: relative;
	top: 20px;
	left: 100px;

	width: 150px;
	hieght: 150px;

	z-index: -1;
`;

const SongContainer = styled.div`
	margin-left: 80px;

	display: inline-flex;
	flex-direction: column;
	justify-content: center;

	min-width: 200px;
	min-height: 200px;

	.music-item-title {
		font-size: 25px;
	}

	.music-item-artist {
	}
`;
