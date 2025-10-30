import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 👇 Check for token when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to view this page.");
      navigate("/login");
      return;
    }

    // Optionally, you could decode or fetch user data from backend
    setUser({ email: "user@example.com" }); // Placeholder
  }, [navigate]);

  // 👇 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out.");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Welcome to SafeMother 💖</h1>
        <p className="text-gray-700 mb-6">
          {user ? `Logged in as ${user.email}` : "Loading user data..."}
        </p>

        <button
          onClick={handleLogout}
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
