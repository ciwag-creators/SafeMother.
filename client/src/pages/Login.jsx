import { useState } from "react";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  // Handle input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.loginUser(form);
      alert("✅ Login successful!");

      // Save token to localStorage
      if (res.data.token) localStorage.setItem("token", res.data.token);

      // ✅ Clear form after success
      setForm({ email: "", password: "" });

      // ✅ Redirect to dashboard or homepage
      setTimeout(() => (window.location.href = "/dashboard"), 1500);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center py-10 bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-2xl w-96">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Welcome Back</h2>

        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:ring-2 focus:ring-pink-400"
          name="email"
          placeholder="Email Address"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:ring-2 focus:ring-pink-400"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold w-full py-3 rounded-md transition duration-200">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-pink-600 hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}
