// File: /src/pages/UserDashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../components/quiz/QuizProvider";
import PerformanceDashboard from "../components/PerformanceDashboard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function UserDashboard() {
  const navigate = useNavigate();
  const {
    questions,
    questionStates,
  } = useQuiz();

  // Defensive guard: check if data is missing or empty
  if (
    !questions ||
    !questionStates ||
    questions.length === 0 ||
    questionStates.length === 0
  ) {
    return (
      <div className="p-6 text-xl text-center text-red-600 font-sharemono">
        ⚠️ No quiz data found. Please complete a quiz first.
      </div>
    );
  }

  const counts = {
    answered: 0,
    incorrect: 0,
    skipped: 0,
  };

  questionStates.forEach((state) => {
    if (state === "answered") counts.answered++;
    else if (state === "incorrect") counts.incorrect++;
    else if (state === "skipped") counts.skipped++;
  });

  const pieData = [
    { name: "Correct", value: counts.answered },
    { name: "Incorrect", value: counts.incorrect },
    { name: "Skipped", value: counts.skipped },
  ];

  const pieColors = ["#16a34a", "#dc2626", "#facc15"];

  const phaseColors = {
    Initiating: "#0ea5e9",
    Planning: "#8b5cf6",
    Executing: "#10b981",
    Monitoring: "#f59e0b",
    Closing: "#ef4444",
  };

  const shortLabels = {
    Initiating: "Init",
    Planning: "Plan",
    Executing: "Exec",
    Monitoring: "Mon",
    Closing: "Close",
  };

  const getPhasePerformance = () => {
    const phaseMap = {};

    questions.forEach((q, index) => {
      const phase = q.phase || "Unspecified";
      const state = questionStates[index] || "skipped";

      if (!phaseMap[phase]) {
        phaseMap[phase] = { total: 0, correct: 0 };
      }

      phaseMap[phase].total += 1;
      if (state === "answered") phaseMap[phase].correct += 1;
    });

    return Object.entries(phaseMap).map(([phase, data]) => ({
      phase,
      shortLabel: shortLabels[phase] || phase,
      percent: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      fill: phaseColors[phase] || "#9ca3af",
    }));
  };

  const totalQuestions = questionStates.length;
  const correctAnswers = counts.answered;
  const totalScorePercent = totalQuestions > 0
    ? Math.round((correctAnswers / totalQuestions) * 100)
    : 0;

  const totalTimeInSeconds = parseInt(localStorage.getItem("quizDuration") || "0", 10);
  const quizMaxTime = parseInt(localStorage.getItem("quizMaxTime") || "0", 10);
  const averageTime = totalQuestions > 0
    ? Math.round(totalTimeInSeconds / totalQuestions)
    : 0;
  const timeRemaining = Math.max(quizMaxTime - totalTimeInSeconds, 0);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleRetake = () => {
    const quizLength = localStorage.getItem("quizLength") || "10";
    const isMockExam = localStorage.getItem("isMockExam") || "false";

    localStorage.setItem("quizLength", quizLength);
    localStorage.setItem("isMockExam", isMockExam);

    navigate("/", { replace: true });
    setTimeout(() => {
      navigate("/quiz");
    }, 50);
  };

  const phasePerformance = getPhasePerformance();

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto font-sharemono">
      <h1 className="text-2xl font-bold mb-2">🎓 Exam Review Dashboard</h1>

      {/* 📊 Summary Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm sm:text-base mb-2">
        <div className="bg-white p-6 rounded shadow text-xl font-bold">{correctAnswers} Correct</div>
        <div className="bg-white p-6 rounded shadow text-xl font-bold flex flex-col items-center">
          <div>{totalScorePercent}%</div>
          <div className={`text-xs mt-1 ${totalScorePercent >= 80 ? "text-green-600" : "text-red-600"}`}>
            {totalScorePercent >= 80 ? "✅ Pass" : "🔁 Try Again"}
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow text-xl font-bold flex flex-col items-center">
          <div>{formatTime(timeRemaining)}</div>
          <div className="text-xs text-gray-600 mt-1">⏱ Time Remaining</div>
        </div>
        <div className="bg-white p-6 rounded shadow text-xl font-bold flex flex-col items-center">
          <div>{counts.skipped}</div>
          <div className="text-xs text-gray-600 mt-1">Skipped</div>
        </div>
      </div>

      {/* 📈 Charts */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 h-72 bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-2">📊 Score Breakdown</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-1/2 h-72 bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-2">📚 PMI Phase Performance</h2>
          {phasePerformance.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={phasePerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="shortLabel" />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip />
                <Bar dataKey="percent">
                  {phasePerformance.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-500 mt-6">No phase data to display.</div>
          )}
        </div>
      </div>

      {/* 📋 Table */}
      <PerformanceDashboard
        questionStates={questionStates}
        questions={questions}
      />

      {/* 🔁 Buttons */}
      <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4 text-center">
        <button
          onClick={handleRetake}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded shadow"
        >
          🔁 Retake Exam
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded shadow"
        >
          🏠 Return to Home
        </button>
      </div>
    </div>
  );
}
