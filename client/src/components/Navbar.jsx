import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">SafeMother</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/tips">Tips</Link>
        <Link to="/questions">Questions</Link>
        <Link to="/reminders">Reminders</Link>
        <Link to="/login" className="login-btn">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
