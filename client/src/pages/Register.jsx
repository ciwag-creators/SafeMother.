import { useState, useEffect } from "react";
import API from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "mother",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Test backend connection
  useEffect(() => {
    fetch("https://safemother-backend.onrender.com/api/test")
      .then((res) => res.json())
      .then((data) => console.log("Backend says:", data))
      .catch((err) => console.error("Error connecting to backend:", err));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/users/register", form);

      toast.success("🎉 Registration successful!", {
        position: "top-center",
        autoClose: 2500,
      });

      if (res.data.token) localStorage.setItem("token", res.data.token);

      // ✅ Clear form
      setForm({ name: "", email: "", password: "", role: "mother" });

      // ✅ Redirect after short delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 2500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 bg-gray-50 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-2xl w-96 transition-transform duration-300 hover:scale-[1.02]"
      >
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          Create Account
        </h2>

        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:ring-2 focus:ring-pink-400"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          value={form.name}
          required
        />

        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:ring-2 focus:ring-pink-400"
          name="email"
          placeholder="Email Address"
          type="email"
          onChange={handleChange}
          value={form.email}
          required
        />

        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:ring-2 focus:ring-pink-400"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          required
        />

        <select
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:ring-2 focus:ring-pink-400"
          name="role"
          onChange={handleChange}
          value={form.role}
        >
          <option value="mother">Mother</option>
          <option value="health_worker">Health Worker</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md font-semibold transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700 text-white"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* ✅ Toast Container */}
      <ToastContainer />
    </div>
  );
}
