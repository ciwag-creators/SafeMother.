import { useEffect, useState } from "react";
import API from "../api";

export default function Tips() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    API.get("/tips")
      .then((res) => setTips(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-pink-700 mb-4">Maternal Health Tips</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip) => (
          <div key={tip._id} className="p-4 border rounded-lg shadow-sm bg-white">
            <h3 className="font-semibold text-lg">{tip.title}</h3>
            <p className="text-gray-600 mt-2">{tip.content}</p>
            <p className="text-sm text-pink-500 mt-1">Category: {tip.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
