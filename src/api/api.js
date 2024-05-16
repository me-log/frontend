import axios from "axios";
//import { SERVER_URL } from "./constants";

axios.defaults.withCredentials = true;

const API = axios.create({
	baseURL: "http://localhost:8080",
	headers: {
		"Content-type": "application/json",
	},
});

export default API;
