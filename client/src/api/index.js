import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://your-backend-url.onrender.com",
});

// Example functions
export const registerUser = (data) => API.post("/api/users/register", data);
export const loginUser = (data) => API.post("/api/users/login", data);

export default API;
