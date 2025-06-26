// File: /src/components/ResultsSummary.js
import React from "react";
import { useQuiz } from "./quiz/QuizProvider"; // 👈 import from context
import { useNavigate } from "react-router-dom";

export default function ResultsSummary({ onReturn }) {
  const navigate = useNavigate();
  const { questions, questionStates } = useQuiz(); // 👈 grab from context

  const counts = {
    correct: 0,
    incorrect: 0,
    skipped: 0,
  };

  questionStates.forEach((state) => {
    if (state === "answered") counts.correct++;
    else if (state === "incorrect") counts.incorrect++;
    else if (state === "skipped") counts.skipped++;
  });

  const total = questionStates.length;
  const percent = total > 0 ? Math.round((counts.correct / total) * 100) : 0;

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto text-center font-sharemono">
      <h1 className="text-2xl font-bold">📘 Quiz Summary</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm sm:text-base">
        <div className="bg-white p-6 rounded shadow flex flex-col items-center justify-center">
          <div className="text-xl font-bold">{counts.correct}</div>
          <div className="text-xs text-gray-600 mt-1">Correct</div>
        </div>

        <div className="bg-white p-6 rounded shadow flex flex-col items-center justify-center">
          <div className="text-xl font-bold">{counts.incorrect}</div>
          <div className="text-xs text-gray-600 mt-1">Incorrect</div>
        </div>

        <div className="bg-white p-6 rounded shadow flex flex-col items-center justify-center">
          <div className="text-xl font-bold">{counts.skipped}</div>
          <div className="text-xs text-gray-600 mt-1">Skipped</div>
        </div>

        <div className="bg-white p-6 rounded shadow flex flex-col items-center justify-center">
          <div className="text-xl font-bold">{percent}%</div>
          <div className="text-xs text-gray-600 mt-1">Score</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
        <button
          onClick={onReturn || (() => navigate("/"))}
          className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded shadow"
        >
          🏠 Return to Home
        </button>
      </div>
    </div>
  );
}
