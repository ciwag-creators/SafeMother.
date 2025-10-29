import axios from "axios";

const API = axios.create({
  baseURL: "https://safemother.onrender.com/api", // 👈 change this to your backend URL
});

export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);
