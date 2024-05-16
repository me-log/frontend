import React from "react";
import styled from "styled-components";

export default function BasicModal(props) {
	const closeModal = () => {
		props.closeModal();
	};

	return (
		<ModalContainer className="Modal" onClick={closeModal}>
			<div className="modalBody" onClick={(e) => e.stopPropagation()}>
				<button id="modalCloseBtn" onClick={closeModal}>
					x
				</button>
				{props.children}
			</div>
		</ModalContainer>
	);
}

const ModalContainer = styled.div`
	.Modal {
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	/* modal창 */
	.modalBody {
		width: auto;
		height: auto;
		min-width: 330px;
		min-height: 300px;
		padding: 40px;
		text-align: center;
		background-color: rgb(255, 255, 255);
		border-radius: 20px;
		box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		z-index: 6;
	}

	#modalCloseBtn {
		position: absolute;
		top: 10px;
		right: 15px;
		border: none;
		color: rgba(0, 0, 0, 0.7);
		background-color: transparent;
		font-size: 25px;
	}

	#modalCloseBtn:hover {
		cursor: pointer;
	}
`;
