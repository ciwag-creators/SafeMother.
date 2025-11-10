import React from "react";
import Navbar from "../components/Navbar";
import "../styles/global.css"; // global styles

export default function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      {/* Main content with proper class */}
      <main className="page-content">{children}</main>
    </div>
  );
}
