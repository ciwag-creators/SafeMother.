// client/src/api/index.js
import axios from "axios";

// 🛑 CRITICAL FIX: Use relative path (/) in development for proxy redirection.
const baseURL = import.meta.env.DEV 
    ? "/" // This makes the request go to http://localhost:5173, which is forwarded by the proxy to http://localhost:5000/
    : import.meta.env.VITE_API_URL || "https://safemother-api.onrender.com"; 

const API = axios.create({
    baseURL: baseURL,
});

// Example functions
export const registerUser = (data) => API.post("/api/users/register", data);
export const loginUser = (data) => API.post("/api/users/login", data);

export default API;