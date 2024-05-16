import { configureStore, createSlice } from "@reduxjs/toolkit";
import dummy from "./data/emotionData";
import { format } from "date-fns";

let allEmotionData = createSlice({
	name: "allEmotionData",
	initialState: dummy,
	reducers: {
		setAllEmotionData(state, action) {
			return action.payload;
		},
	},
});

let highestEmotion = createSlice({
	name: "highestEmotion",
	initialState: {
		emotion: "happiness",
	},
	reducers: {
		setHighestEmotion(state, action) {
			state.emotion = action.payload;
		},
	},
});

let selectedDate = createSlice({
	name: "selectedDate",
	initialState: {
		currentDate: format(new Date(), "yyyy-MM-dd"),
	},
	reducers: {
		setSelectedDate(state, action) {
			state.currentDate = action.payload;
		},
	},
});

export default configureStore({
	reducer: {
		selectedDate: selectedDate.reducer,
		allEmotionData: allEmotionData.reducer,
		highestEmotion: highestEmotion.reducer,
	},
});

export const { setSelectedDate } = selectedDate.actions;
export const { setAllEmotionData } = allEmotionData.actions;
export const { setHighestEmotion } = highestEmotion.actions;
