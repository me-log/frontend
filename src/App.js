import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
	LandingPage,
	MainPage,
	SettingPage,
	DiaryListPage,
	DiaryCreatePage,
	DiaryEditPage,
} from "./pages/index";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/main" element={<MainPage />} />
				<Route path="/diary-list" element={<DiaryListPage />} />
				<Route path="/diary-create" element={<DiaryCreatePage />} />
				<Route
					path="/diary-edit/:diaryId"
					element={<DiaryEditPage />}
				/>
				<Route path="/user/info" element={<SettingPage />} />
			</Routes>
		</div>
	);
}

export default App;
