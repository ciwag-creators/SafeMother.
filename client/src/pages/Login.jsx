import { useState } from "react";
import API from "../api";
import "../styles/auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.loginUser(form);

      alert("✅ Login successful!");

      if (res.data.token) localStorage.setItem("token", res.data.token);

      setForm({ email: "", password: "" });

      setTimeout(() => (window.location.href = "/dashboard"), 1000);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2 className="auth-title">Welcome Back</h2>

        <input
          type="email"
          name="email"
          className="auth-input"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          className="auth-input"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="auth-btn">
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
          Don’t have an account?
          <a href="/register" style={{ color: "#d6336c", marginLeft: "5px" }}>
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
