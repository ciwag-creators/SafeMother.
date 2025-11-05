import { useState, useEffect } from "react";
import API from "../api";

export default function AskQuestion() {
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const res = await API.get("/questions");
    setQuestions(res.data);
  };

  useEffect(() => { fetchQuestions(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/questions", { question });
      setQuestion("");
      fetchQuestions();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-pink-700 mb-4">Ask a Health Worker</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="border p-2 w-full rounded-md"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button className="bg-pink-600 text-white px-4 py-2 rounded-md mt-2">Submit</button>
      </form>

      <h3 className="font-semibold text-lg mb-2">Recent Questions</h3>
      {questions.map((q) => (
        <div key={q._id} className="border-b py-2">
          <p className="text-gray-800">{q.question}</p>
          {q.answer ? (
            <p className="text-green-600 text-sm">Answer: {q.answer}</p>
          ) : (
            <p className="text-gray-500 text-sm">Awaiting response...</p>
          )}
        </div>
      ))}
    </div>
  );
}
