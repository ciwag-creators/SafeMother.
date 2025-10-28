import { useState } from "react";
import dayjs from "dayjs";

export default function Tracker() {
  const [lmp, setLmp] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!lmp) return alert("Please select your last menstrual period (LMP).");

    const startDate = dayjs(lmp);
    const today = dayjs();

    const weeksPregnant = today.diff(startDate, "week");
    const dueDate = startDate.add(280, "day"); // 40 weeks (280 days)

    const progress = Math.min((weeksPregnant / 40) * 100, 100);

    const messages = [
      "Your pregnancy journey begins! Eat healthy and rest well.",
      "Your baby’s heart is forming — stay hydrated.",
      "Your baby’s organs are developing — include folic acid daily.",
      "Your baby is moving more — try gentle exercises.",
      "You’re getting closer! Schedule your antenatal visits regularly.",
    ];

    const tipIndex = Math.floor(weeksPregnant / 8);
    const tip = messages[tipIndex] || "Keep up the good work — you’re almost there!";

    setResult({ weeksPregnant, dueDate, progress, tip });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-pink-700 mb-4 text-center">
        Pregnancy Tracker
      </h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-md">
        <label className="block mb-2 text-gray-700">Select your last menstrual period (LMP):</label>
        <input
          type="date"
          className="border p-2 w-full mb-4 rounded-md"
          value={lmp}
          onChange={(e) => setLmp(e.target.value)}
        />
        <button
          type="submit"
          className="bg-pink-600 text-white w-full py-2 rounded-md"
        >
          Calculate
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-pink-50 p-4 rounded-md text-center">
          <p className="text-lg font-semibold text-gray-700">
            You are approximately <span className="text-pink-600">{result.weeksPregnant} weeks</span> pregnant.
          </p>
          <p className="text-gray-600 mt-1">
            Estimated Due Date: <span className="font-medium">{result.dueDate.format("MMMM D, YYYY")}</span>
          </p>

          <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-pink-600 h-4 rounded-full"
              style={{ width: `${result.progress}%` }}
            ></div>
          </div>

          <p className="mt-4 text-pink-700 font-medium">{result.tip}</p>
        </div>
      )}
    </div>
  );
}
