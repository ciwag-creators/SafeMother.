import React from "react";
import "./Tips.css";

const Tips = () => {
  const tipsList = [
    {
      title: "Eat Healthy",
      message: "Include fruits, vegetables, lean protein and drink enough water daily."
    },
    {
      title: "Attend Antenatal Care",
      message: "Regular check-ups help track your health and baby’s development."
    },
    {
      title: "Get Enough Rest",
      message: "Sleep and rest are very important during pregnancy. Avoid stress."
    },
    {
      title: "Avoid Harmful Substances",
      message: "Stay away from alcohol, smoking, and drugs not prescribed by a doctor."
    },
    {
      title: "Mild Exercises",
      message: "Engage in activities like walking or light stretching to improve circulation."
    }
  ];

  return (
    <div className="tips-container">
      <h2 className="tips-title">Pregnancy Tips</h2>

<ul className="tips-list">
  {tipsList.map((tip, index) => (
    <li key={index} className="tip-item">
      <h3>{tip.title}</h3>
      <p>{tip.message}</p>
    </li>
  ))}
</ul>

    </div>
  );
};

export default Tips;
