import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-pink-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">SafeMother</Link>
        <div className="space-x-4">
          <Link to="/tips">Health Tips</Link>
          <Link to="/ask">Ask Question</Link>
          <Link to="/login">Login</Link>
          <Link to="/tracker">Tracker</Link>
          <Link to="/reminders">Reminders</Link>
        </div>
      </div>
    </nav>
  );
}
