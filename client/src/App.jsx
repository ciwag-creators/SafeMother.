import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Tips from "./pages/Tips";
import AskQuestion from "./pages/AskQuestion";
import Tracker from "./pages/Tracker";
import Reminders from "./pages/Reminders";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-pink-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/ask" element={<AskQuestion />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/reminders" element={<Reminders />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
