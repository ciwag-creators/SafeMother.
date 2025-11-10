import AppLayout from "../layout/AppLayout";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="container">

        <h2 className="page-title">Welcome 👋</h2>

        <p style={{ marginBottom: "20px", color: "#444" }}>
          Your maternal health companion is here to guide you.
        </p>

        {/* Quick Cards */}
        <div className="grid">
          <Link to="/tips" className="card">
            <h3>Health Tips 💡</h3>
            <p>Learn how to stay healthy during pregnancy.</p>
          </Link>

          <Link to="/reminders" className="card">
            <h3>Reminders ⏰</h3>
            <p>Set antenatal and medication reminders.</p>
          </Link>

          <Link to="/tracker" className="card">
            <h3>Tracker 📊</h3>
            <p>Track symptoms & progress weekly.</p>
          </Link>

          <Link to="/questions" className="card">
            <h3>Ask Questions ❓</h3>
            <p>Get health answers from verified experts.</p>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
