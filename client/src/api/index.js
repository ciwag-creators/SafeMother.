import axios from "axios";

const API_URL = "https://safemother.onrender.com/api";

const API = {
  registerUser: (data) => axios.post(`${API_URL}/users/register`, data),
  loginUser: (data) => axios.post(`${API_URL}/users/login`, data),
  getTips: () => axios.get(`${API_URL}/tips`),
  getQuestions: () => axios.get(`${API_URL}/questions`),
  addReminder: (data) => axios.post(`${API_URL}/reminders`, data),
};

export default API;
