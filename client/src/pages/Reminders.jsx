import { useEffect, useState } from "react";
import axios from "axios";
import "./Reminders.css";

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const userId = "sample_user_id"; 

  const fetchReminders = async () => {
    const res = await axios.get(`http://localhost:5000/api/reminders?userId=${userId}`);
    setReminders(res.data);
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const addReminder = async (e) => {
    e.preventDefault();
    if (!title || !date) return alert("Please enter a title and date");

    await axios.post("http://localhost:5000/api/reminders", {
      userId,
      title,
      date,
      description,
    });
    fetchReminders();
    setTitle("");
    setDate("");
    setDescription("");
  };

  const markDone = async (id) => {
    await axios.put(`http://localhost:5000/api/reminders/${id}/complete`);
    fetchReminders();
  };

  return (
    <div className="reminder-page">
      <h2>Antenatal Reminder System</h2>

      <form className="reminder-form" onSubmit={addReminder}>
        <input
          type="text"
          placeholder="Reminder title (e.g. Antenatal Visit)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit">Add Reminder</button>
      </form>

      <div className="reminder-list">
        <h3>Upcoming Reminders</h3>

        {reminders.length === 0 ? (
          <p className="empty">No reminders yet.</p>
        ) : (
          reminders.map((r) => (
            <div key={r._id} className={`reminder-item ${r.isCompleted ? "done" : ""}`}>
              <div>
                <strong>{r.title}</strong>
                <p>{new Date(r.date).toLocaleDateString()} • {r.description}</p>
              </div>

              {!r.isCompleted && (
                <button onClick={() => markDone(r._id)}>✓ Done</button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
