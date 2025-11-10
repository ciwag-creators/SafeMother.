import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="nav">
      <h1 className="nav-logo">SafeMother</h1>

      {/* Hamburger button */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`line ${isOpen ? "open" : ""}`}></div>
        <div className={`line ${isOpen ? "open" : ""}`}></div>
        <div className={`line ${isOpen ? "open" : ""}`}></div>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/tips" onClick={() => setIsOpen(false)}>Tips</Link></li>
        <li><Link to="/questions" onClick={() => setIsOpen(false)}>Questions</Link></li>
        <li><Link to="/reminders" onClick={() => setIsOpen(false)}>Reminders</Link></li>
        <li><Link to="/login" className="login-btn" onClick={() => setIsOpen(false)}>Login</Link></li>
      </ul>
    </nav>
  );
}
