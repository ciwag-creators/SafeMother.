import { useEffect, useState } from "react";
import axios from "axios";

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const userId = "sample_user_id"; // Later replace with logged-in user’s ID

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
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-pink-700 mb-4 text-center">
        Antenatal Reminder System
      </h2>

      <form onSubmit={addReminder} className="bg-white p-4 rounded-md shadow mb-6">
        <input
          type="text"
          placeholder="Reminder title (e.g. Antenatal Visit)"
          className="border p-2 w-full mb-3 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 w-full mb-3 rounded-md"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          className="border p-2 w-full mb-3 rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className="bg-pink-600 text-white w-full py-2 rounded-md">
          Add Reminder
        </button>
      </form>

      <div className="bg-white shadow p-4 rounded-md">
        <h3 className="font-semibold text-gray-700 mb-3">Upcoming Reminders</h3>
        {reminders.length === 0 ? (
          <p className="text-gray-500">No reminders yet.</p>
        ) : (
          reminders.map((r) => (
            <div
              key={r._id}
              className={`p-3 mb-2 rounded-md border ${
                r.isCompleted ? "bg-green-50 border-green-400" : "bg-pink-50 border-pink-400"
              }`}
            >
              <p className="font-medium text-gray-800">{r.title}</p>
              <p className="text-sm text-gray-600">
                {new Date(r.date).toLocaleDateString()} — {r.description}
              </p>
              {!r.isCompleted && (
                <button
                  onClick={() => markDone(r._id)}
                  className="text-sm mt-2 text-white bg-pink-600 px-2 py-1 rounded-md"
                >
                  Mark Completed
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
