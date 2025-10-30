import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Settings() {
  const [form, setForm] = useState({ name: "", email: "", password: "", photo: "" });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Default profile image (a soft natural mother-themed placeholder)
  const defaultPhoto =
    "https://cdn.pixabay.com/photo/2017/01/31/13/14/woman-2027668_1280.png";

  // ✅ Load user info (mock for now)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Simulate loading user data
    const mockUser = {
      name: "SafeMother User",
      email: "safemother@example.com",
      photo: "", // empty means default
    };
    setForm(mockUser);
    setPreview(mockUser.photo || defaultPhoto);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, photo: file });
      setPreview(URL.createObjectURL(file)); // preview selected image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = form.photo;

      // 👉 If the user selected a new image, upload it to backend or Cloudinary
      if (form.photo && typeof form.photo !== "string") {
        const data = new FormData();
        data.append("file", form.photo);
        data.append("upload_preset", "safemother_uploads");

        const uploadRes = await fetch(
          "https://api.cloudinary.com/v1_1/demo/image/upload", // replace with your Cloudinary account
          { method: "POST", body: data }
        );
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.secure_url;
      }

      // 👉 Send update to backend
      await API.put("/users/update", {
        name: form.name,
        email: form.email,
        password: form.password,
        photo: imageUrl,
      });

      alert("
