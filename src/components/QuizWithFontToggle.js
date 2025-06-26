// File: /src/components/QuizWithFontToggle.js
import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";

const fontOptions = [
  { name: "arcade", label: "Arcade" },
  { name: "arial", label: "Arial" },
  { name: "times", label: "Times" },
  { name: "courier", label: "Courier" },
  { name: "georgia", label: "Georgia" },
];

export default function QuizWithFontToggle({ questionProps }) {
  const [font, setFont] = useState("arcade");
  const [greenScreen, setGreenScreen] = useState(false);

  useEffect(() => {
    const savedFont = localStorage.getItem("quizFont");
    const savedGreen = localStorage.getItem("greenScreen");

    if (savedFont) setFont(savedFont);
    if (savedGreen === "true") setGreenScreen(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("quizFont", font);
  }, [font]);

  useEffect(() => {
    localStorage.setItem("greenScreen", greenScreen);
  }, [greenScreen]);

  return (
    <div className="space-y-6">
      {/* 🎨 Font Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
        <label className="font-bold">Pick your font:</label>
        <div className="flex flex-wrap gap-2">
          {fontOptions.map((f) => (
            <button
              key={f.name}
              onClick={() => setFont(f.name)}
              className={`px-3 py-1 rounded border ${
                font === f.name ? "bg-black text-white" : "bg-white"
              } font-${f.name}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🖥️ Green Screen Toggle */}
      <div className="flex items-center gap-2 text-sm">
        <input
          id="greenScreenToggle"
          type="checkbox"
          checked={greenScreen}
          onChange={() => setGreenScreen((prev) => !prev)}
          className="form-checkbox h-4 w-4 text-green-600"
        />
        <label htmlFor="greenScreenToggle" className="font-bold">
          Green Screen Mode
        </label>
      </div>

      {/* 📋 QuestionCard with styling */}
      <div className={`p-4 rounded shadow ${greenScreen ? "bg-black text-green-500" : "bg-white text-black"} font-${font}`}>
        <QuestionCard {...questionProps} />
      </div>
    </div>
  );
}
