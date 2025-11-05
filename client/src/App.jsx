import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Tips from "./pages/Tips";
import Questions from "./pages/Questions";
import Reminders from "./pages/Reminders";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
