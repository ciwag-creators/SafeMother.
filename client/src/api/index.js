import axios from "axios";

const API_URL = "https://safemother.onrender.com/api/users";

export const registerUser = (data) => axios.post(`${API_URL}/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/login`, data);
