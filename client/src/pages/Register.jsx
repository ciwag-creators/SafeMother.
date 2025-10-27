import { useState } from "react";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "mother" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/register", form);
      alert("Registration successful!");
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-md w-80">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Create Account</h2>
        <input className="border p-2 w-full mb-3" name="name" placeholder="Name" onChange={handleChange} />
        <input className="border p-2 w-full mb-3" name="email" placeholder="Email" onChange={handleChange} />
        <input className="border p-2 w-full mb-3" type="password" name="password" placeholder="Password" onChange={handleChange} />
        <select className="border p-2 w-full mb-3" name="role" onChange={handleChange}>
          <option value="mother">Mother</option>
          <option value="health_worker">Health Worker</option>
        </select>
        <button className="bg-pink-600 text-white w-full py-2 rounded-md">Register</button>
      </form>
    </div>
  );
}
