import React from "react";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { HiDotsVertical } from "react-icons/hi";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { fetchDeleteDiary } from "../../api/diaryService";
import { useNavigate } from "react-router-dom";

export default function DropdownMenu({
	dotButtonLeft,
	dropdownTop,
	dropdownLeft,
	diaryId,
}) {
	let navigate = useNavigate();

	const handleDeleteDiary = async () => {
		try {
			const response = await fetchDeleteDiary(diaryId); // 다이어리 아이디 사용
			if (response.status === 200) {
				navigate(-1);
				console.log("일기가 성공적으로 삭제되었습니다.");
			} else {
				console.error("일기 삭제 중 오류가 발생했습니다.");
			}
		} catch (error) {
			console.error("일기 삭제 중 오류가 발생했습니다:", error);
		}
	};

	const handleEditDiary = () => {
		// 다이어리 수정 폼 페이지로 이동하고 다이어리 ID 전달
		navigate(`/diary-edit/${diaryId}`);
	};

	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		window.addEventListener("click", handleOutsideClick);

		return () => {
			window.removeEventListener("click", handleOutsideClick);
		};
	}, []);

	return (
		<DropdownContainer
			ref={dropdownRef}
			$dotButtonLeft={dotButtonLeft}
			$dropdownTop={dropdownTop}
			$dropdownLeft={dropdownLeft}
		>
			<HiDotsVertical className="dotButton" onClick={toggleMenu} />

			{isOpen && (
				<div className="dropdown">
					<div className="edit" onClick={handleEditDiary}>
						<RiEdit2Fill className="drop-icon" />
						<span>수정하기</span>
					</div>

					<div className="delete" onClick={handleDeleteDiary}>
						<MdDelete className="drop-icon" />
						<span>삭제하기</span>
					</div>
				</div>
			)}
		</DropdownContainer>
	);
}

const DropdownContainer = styled.div`
	.dotButton {
		width: 20px;
		height: 20px;
		padding: 3px 3px;
		position: relative;
		left: ${({ $dotButtonLeft }) => $dotButtonLeft || "130px"};
		cursor: pointer;
		border-radius: 100%;
		color: rgba(0, 0, 0, 0.7);
		&:hover {
			background: #915cff;
			color: #ffffff;
		}
	}

	.dropdown {
		position: absolute;
		top: ${({ $dropdownTop }) => $dropdownTop || "56px"};
		left: ${({ $dropdownLeft }) => $dropdownLeft || "203px"};
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		z-index: 1;
		display: flex;
		flex-direction: column;
		font-size: 15px;

		.edit {
			color: #979a98;
			padding: 10px;
			text-decoration: none;
		}

		.delete {
			color: #f53536;
			padding: 10px;
			text-decoration: none;
		}

		.drop-icon {
			padding-right: 5px;
			position: relative;
			top: 2px;
		}
	}
`;
