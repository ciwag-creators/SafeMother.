import { useState, useEffect } from "react";
import API from "../api";
import "../styles/auth.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "mother",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://safemother.onrender.com/api/test")
      .then((res) => res.json())
      .then((data) => console.log("Backend Connected ✅", data))
      .catch(() => console.log("Backend Connection Failed ❌"));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/api/users/register", form);

      toast.success("Account Created Successfully 🎉", { autoClose: 2000 });

      localStorage.setItem("token", res.data.token);

      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2 className="auth-title">Create Account</h2>

        <input
          name="name"
          className="auth-input"
          placeholder="Full Name"
          onChange={handleChange}
          value={form.name}
          required
        />

        <input
          name="email"
          type="email"
          className="auth-input"
          placeholder="Email Address"
          onChange={handleChange}
          value={form.email}
          required
        />

        <input
          name="password"
          type="password"
          className="auth-input"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          required
        />

        <select
          name="role"
          className="auth-input"
          onChange={handleChange}
          value={form.role}
        >
          <option value="mother">Mother</option>
          <option value="health_worker">Health Worker</option>
        </select>

        <button className="auth-btn" disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
}
