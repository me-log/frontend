import React from "react";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

export default function PeriodMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedPeriod, setSelectedPeriod] = useState("전체기간");
	const dropdownRef = useRef(null);
	const calendarRef = useRef(null);

	const startDateRef = useRef(null);
	const endDateRef = useRef(null);

	const handleCalendarClick = (event) => {
		// 달력 클릭 시 닫힘 방지
		event.stopPropagation();
		startDateRef.current.value = "2024-02-01";
		endDateRef.current.value = "2024-02-15";
	};

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handlePeriodSelection = (period) => {
		setSelectedPeriod(period);
		setIsOpen(false);
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
		<PeriodMenuContainer ref={dropdownRef}>
			<div className="period-menu" onClick={toggleMenu}>
				{selectedPeriod}
			</div>

			{isOpen && (
				<div className="dropdown" ref={calendarRef}>
					<div
						onClick={() => handlePeriodSelection("전체기간")}
						className="select-all-period"
					>
						전체기간
					</div>
					<div
						onClick={() => handlePeriodSelection("선택기간")}
						className="select-period"
					>
						기간 입력
						<form onClick={handleCalendarClick}>
							<input
								type="date"
								ref={startDateRef}
								placeholder="시작일"
							/>
							<input
								type="date"
								ref={endDateRef}
								placeholder="종료일"
							/>
							<button>설정</button>
						</form>
					</div>
				</div>
			)}
		</PeriodMenuContainer>
	);
}

const PeriodMenuContainer = styled.div`
	.period-menu {
		border: none;
		border-radius: 15px;
		border: 1px solid #eaeaea;

		padding: 5px 20px;
		cursor: pointer;
		font-size: 15px;

		display: inline-flex;
		position: absolute;
		top: 98px;
		left: 230px;
	}

	.dropdown {
		position: absolute;
		top: 135px;
		left: 230px;

		border-radius: 15px;
		border: 1px solid #eaeaea;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		z-index: 1;

		display: flex;
		flex-direction: column;
		justify=content: flex-start;
		font-size: 15px;
	}

	.select-all-period {
		cursor: pointer;
		border-bottom: 1px solid #ccc;
		padding: 20px;
		text-align: left;
	}

	.select-period {
		padding: 20px;
		text-align: left;

		input {
			margin-top: 8px;
			margin-right: 8px;
		}

		button {
			height: 23px;
			cursor: pointer;
			border: 1px solid #b88fff;

			color: #ffffff;
			background: #915cff;
			font-weight: 400;

			&:hover {
				background: #572ba0;
			}
		}
	}
`;
