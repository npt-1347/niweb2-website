import axios from "axios";

const BACKEND_URL =
	import.meta.env.VITE_BACKEND_URL ||
	"http://localhost:8000";

export const signin = async (payload) => {
	const response = await axios.post(`${BACKEND_URL}/signin`, payload);
	return response.data;
};

export const signup = async (payload) => {
	const response = await axios.post(`${BACKEND_URL}/signup`, payload);
	return response.data;
};

