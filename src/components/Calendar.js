import styled, { css } from "styled-components";
import React, { useRef, useEffect, useState } from "react";
import {
	format,
	addMonths,
	subMonths,
	startOfMonth,
	endOfMonth,
	isSameDay,
	addDays,
} from "date-fns";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "./../store";
//import { findDiaryByDate } from "../utils/findDiaryByDate";
import { fetchHighEmoByDate } from "../api/diaryService";

export default function Calendar() {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	let selectedDate = useSelector((state) => state.selectedDate.currentDate);
	let dispatch = useDispatch();

	const prevMonth = () => {
		setCurrentMonth(subMonths(currentMonth, 1));
	};
	const nextMonth = () => {
		setCurrentMonth(addMonths(currentMonth, 1));
	};
	const onDateClick = (date) => {
		dispatch(setSelectedDate(format(date, "yyyy-MM-dd")));
	};

	useEffect(() => {
		console.log(selectedDate);
	}, [selectedDate]);

	return (
		<CalendarDiv>
			<RenderHeader
				currentMonth={currentMonth}
				setCurrentMonth={setCurrentMonth}
				prevMonth={prevMonth}
				nextMonth={nextMonth}
			/>
			<RenderCells
				currentMonth={currentMonth}
				selectedDate={selectedDate}
				onDateClick={onDateClick}
			/>
		</CalendarDiv>
	);
}

function RenderHeader({
	currentMonth,
	setCurrentMonth,
	prevMonth,
	nextMonth,
	// selectedDate,
	// onDateClick,
}) {
	const [modalCalendar, setModalCalendar] = useState(false);
	const modalCalendarHandler = () => {
		setModalCalendar(!modalCalendar);
	};

	return (
		<CalendarHeaderDiv>
			<button
				className="recentButton"
				onClick={() => {
					setCurrentMonth(new Date());
				}}
			>
				최근
			</button>

			<MdArrowBackIos onClick={prevMonth} />
			<div className="headerDate">{format(currentMonth, "yyyy.MM")}</div>
			<MdArrowForwardIos onClick={nextMonth} />

			<CiCalendar
				onClick={modalCalendarHandler}
				className="headerCalendar"
			/>
			{/* {modalCalendar && (
				<>
					<Overlay onClick={modalCalendarHandler}>
						<ModalContainer>
							<ModalCalendar
								currentMonth={currentMonth}
								selectedDate={selectedDate}
								onDateClick={onDateClick}
							/>
						</ModalContainer>
					</Overlay>
				</>
			)} */}
		</CalendarHeaderDiv>
	);
}

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
	const monthStart = startOfMonth(currentMonth);
	const monthEnd = endOfMonth(monthStart);

	const selectedDateRef = useRef(null);
	const [daysArray, setDaysArray] = useState([]);

	useEffect(() => {
		const fetchDataAndProcess = async (day) => {
			try {
				const highEmotion = await fetchHighEmoByDate(
					format(day, "yyyy-MM-dd")
				);
				let hasDiary = false;
				let emotionStyles = null;
				if (highEmotion === "no emotion") {
					hasDiary = true;
					emotionStyles = Emotions["all"];
				} else if (highEmotion) {
					hasDiary = true;
					emotionStyles = Emotions[highEmotion];
				}
				return { hasDiary, emotionStyles };
			} catch (error) {
				console.error("Error fetching high emotion data:", error);
				return { hasDiary: false, emotionStyles: null };
			}
		};

		const buildDaysArray = async () => {
			let days = [];
			for (let day = monthStart; day <= monthEnd; day = addDays(day, 1)) {
				const { hasDiary, emotionStyles } = await fetchDataAndProcess(
					day
				);
				days.push(
					<DayDiv
						ref={
							isSameDay(day, selectedDate)
								? selectedDateRef
								: null
						}
						key={day}
						onClick={() => {
							onDateClick(day);
						}}
						className={`${
							isSameDay(day, selectedDate) ? "selected" : ""
						}`}
					>
						<span className="oneday">
							<EmotionStyles
								$hasDiary={hasDiary}
								$emotionStyles={emotionStyles}
							/>
							<span className="eee">{format(day, "eee")}</span>
							<span className="ddd">{format(day, "d")}</span>
						</span>
					</DayDiv>
				);
			}
			return days;
		};

		buildDaysArray().then((days) => {
			setDaysArray(days);
		});
	}, [currentMonth, selectedDate, onDateClick, monthStart, monthEnd]);

	return <DayBody>{daysArray}</DayBody>;
};

// const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
// 	const monthStart = startOfMonth(currentMonth); // 오늘이 속한 달의 시작일
// 	const monthEnd = endOfMonth(monthStart); // 오늘이 속한 달의 마지막일

// 	const selectedDateRef = useRef(null);
// 	const scrollToSelectedDate = () => {
// 		if (selectedDateRef.current) {
// 			selectedDateRef.current.scrollIntoView({
// 				behavior: "smooth",
// 				block: "center",
// 				inline: "center",
// 			});
// 		}
// 	};

// 	useEffect(() => {
// 		scrollToSelectedDate();
// 	}, [selectedDate]);

// 	let days = [];

// 	let hasDiary = false;
// 	let emotionStyles = null;
// 	async function fetchDataAndProcess(day) {
// 		try {
// 			const highEmotion = await fetchHighEmoByDate(
// 				format(day, "yyyy-MM-dd")
// 			);
// 			if (highEmotion === "no emotion") {
// 				hasDiary = true;
// 				emotionStyles = Emotions["all"];
// 			} else if (highEmotion) {
// 				hasDiary = true;
// 				emotionStyles = Emotions[highEmotion];
// 			} else {
// 				hasDiary = false;
// 			}
// 		} catch (error) {
// 			console.error("Error fetching high emotion data:", error);
// 		}
// 	}

// 	for (let day = monthStart; day <= monthEnd; day = addDays(day, 1)) {
// 		//console.log(day);
// 		//const diary = findDiaryByDate(format(day, "yyyy-MM-dd"));

// 		// if (diary !== null) {
// 		// 	hasDiary = true;
// 		// 	diaryEmotion = diary.mostEmotion;
// 		// 	emotionStyles = Emotions[diaryEmotion];
// 		// }

// 		fetchDataAndProcess(day);

// 		days.push(
// 			<DayDiv
// 				ref={isSameDay(day, selectedDate) ? selectedDateRef : null}
// 				key={day}
// 				onClick={() => {
// 					onDateClick(day);
// 				}}
// 				className={`${isSameDay(day, selectedDate) ? "selected" : ""}`}
// 			>
// 				<span className="oneday">
// 					<EmotionStyles
// 						$hasDiary={hasDiary}
// 						$emotionStyles={emotionStyles}
// 					/>
// 					<span className="eee">{format(day, "eee")}</span>
// 					<span className="ddd">{format(day, "d")}</span>
// 				</span>
// 			</DayDiv>
// 		);
// 	}

// 	return <DayBody>{days}</DayBody>;
// };

// 캘린더 전체
let CalendarDiv = styled.div``;

// 캘린더 헤더
let CalendarHeaderDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	margin: 50px auto;
	padding: 0 400px;

	.recentButton {
		cursor: pointer;
		height: 27px;
		padding: 0 10px;
		border: 1px solid #eaeaea;
		border-radius: 100px;
		color: black;
		background-color: #fff;
		font-weight: 600;
		font-size: 12px;
	}

	.headerDate {
		font-weight: 800;
		font-size: 25px;
		color: #000;
		border-radius: 50%;
	}

	.headerCalendar {
		cursor: pointer;
		height: 25px;
		width: 25px;
		padding: 0 10px;
	}
`;

// 캘린더 바디
let DayBody = styled.div`
	display: flex;
	margin: 20px 400px;
	overflow-x: auto;

	&::-webkit-scrollbar {
		display: none;
	}
`;

let DayDiv = styled.div`
	cursor: pointer;
	padding: 8px;
	display: list-item;
	list-style: none;

	.oneday {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		padding: 5px 0;
		min-width: 40px;
	}

	.eee {
		line-height: 14px;
		font-size: 12px;
		letter-spacing: -0.28px;
	}

	.ddd {
		font-weight: 500;
		font-size: 20px;
		padding: 3px;
	}

	&.selected {
		color: #8561d6;
		font-weight: bold;
		border: 2px solid #8561d6;
		border-radius: 16px;
	}
`;

const EmotionStyles = styled.span`
	${({ $emotionStyles }) =>
		css`
			${$emotionStyles}
		`}
	${({ $hasDiary }) =>
		$hasDiary &&
		css`
			display: block;
			border: 3px solid var(--color, #8561d6);
			border-radius: 100%;
			position: relative;
			top: -7px;
			left: 13px;
		`}
`;

const Emotions = {
	all: css`
		--color: #b8bbb8;
	`,
	happiness: css`
		--color: #f2d665;
	`,
	neutral: css`
		--color: #89d8aa;
	`,
	sadness: css`
		--color: #6ba3d8;
	`,
	anger: css`
		--color: #f35b59;
	`,
	surprise: css`
		--color: #7fccde;
	`,
	fear: css`
		--color: #e3aedd;
	`,
};

// const Overlay = styled.div`
// 	position: fixed;
// 	top: 0;
// 	left: 0;
// 	width: 100%;
// 	height: 100%;
// 	background: rgba(0, 0, 0, 0.5);
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	z-index: 1000;
// `;

// const ModalContainer = styled.div`
// 	background: white;
// 	padding: 10px;
// 	border-radius: 30px;
// 	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;
