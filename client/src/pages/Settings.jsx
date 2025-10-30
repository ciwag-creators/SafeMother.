import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Settings() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch existing user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Replace this simulated user with a backend call later
    const mockUser = {
      name: "SafeMother User",
      email: "safemother@example.com",
    };
    setForm({ ...form, ...mockUser });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 👉 Call backend API to update user info
      await API.put("/users/update", form); // Update this route if needed
      alert("✅ Profile updated successfully!");
      setForm({ ...form, password: "" }); // clear password field only
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          ⚙️ Account Settings
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-3 focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-3 focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
              className="border border-gray-300 rounded-md w-full p-3 focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold text-white transition duration-200 ${
              loading
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700"
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate("/profile")}
            className="text-pink-500 hover:underline"
          >
            ← Back to Profile
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="text-gray-500 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>

      <footer className="mt-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} SafeMother. All Rights Reserved.
      </footer>
    </div>
  );
}
