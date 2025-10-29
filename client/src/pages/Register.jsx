import { useState, useEffect } from "react";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "mother" });

  // 👇 Test connection to backend when the page loads
  useEffect(() => {
    fetch("https://safemother-backend.onrender.com/api/test")  // ✅ use your live backend URL
      .then((res) => res.json())
      .then((data) => console.log("Backend says:", data))
      .catch((err) => console.error("Error connecting to backend:", err));
  }, []);

  // Handle input change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/users/register", form);
    alert("🎉 Registration successful!");

    // Save token if backend returns it
    if (res.data.token) localStorage.setItem("token", res.data.token);

    // ✅ Clear form fields
    setForm({ name: "", email: "", password: "", role: "mother" });

    // ✅ Optional: redirect to login page after 2 seconds
    setTimeout(() => {
      window.location.href = "/login"; // change to your actual login route
    }, 2000);
  } catch (error) {
    alert(error.response?.data?.message || "Registration failed");
  }
};

  return (
    <div className="flex justify-center items-center py-10 bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-2xl w-96">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Create Account</h2>

        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:ring-2 focus:ring-pink-400"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:ring-2 focus:ring-pink-400"
          name="email"
          placeholder="Email Address"
          type="email"
          onChange={handleChange}
          required
        />

        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:ring-2 focus:ring-pink-400"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <select
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:ring-2 focus:ring-pink-400"
          name="role"
          onChange={handleChange}
        >
          <option value="mother">Mother</option>
          <option value="health_worker">Health Worker</option>
        </select>

        <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold w-full py-3 rounded-md transition duration-200">
          Register
        </button>
      </form>
    </div>
  );
}
