// client/src/api/index.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// AUTH
export const registerUser = (data) => API.post("/api/users/register", data);
export const loginUser = (data) => API.post("/api/users/login", data);

export default API;
