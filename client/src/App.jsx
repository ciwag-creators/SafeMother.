import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import "./styles/global.css";
import Home from "./pages/Home";
import Tips from "./pages/Tips";
import Questions from "./pages/Questions";
import Reminders from "./pages/Reminders";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              <Home />
            </AppLayout>
          }
        />

        <Route
          path="/tips"
          element={
            <AppLayout>
              <Tips />
            </AppLayout>
          }
        />

        <Route
          path="/questions"
          element={
            <AppLayout>
              <Questions />
            </AppLayout>
          }
        />

        <Route
          path="/reminders"
          element={
            <AppLayout>
              <Reminders />
            </AppLayout>
          }
        />

        {/* Auth Pages (No bottom nav) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
