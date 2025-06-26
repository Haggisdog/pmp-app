// File: /src/components/AdminPortal.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../store/quizStore";

export default function AdminPortal() {
  const navigate = useNavigate();
  const setQuestions = useQuizStore((state) => state.setQuestions);
  const setQuestionStates = useQuizStore((state) => state.setQuestionStates);

  const [selectedSample, setSelectedSample] = useState("");
  const [loadError, setLoadError] = useState(null);

  const handleLoadSample = async () => {
    setLoadError(null);
    if (!selectedSample) return;

    try {
      const res = await fetch(`/${selectedSample}`);
      const data = await res.json();

      console.log("📥 Loaded sample data:", data);
      console.log("📥 Questions:", data.questions?.length);
      console.log("📥 Question States:", data.questionStates?.length);
      console.log("📥 Sample question:", data.questions?.[0]);

      if (
        Array.isArray(data.questions) &&
        Array.isArray(data.questionStates) &&
        data.questions.length === data.questionStates.length
      ) {
        setQuestions(data.questions);
        setQuestionStates(data.questionStates);
        navigate("/dashboard");
      } else {
        console.error("❌ Invalid sample structure or length mismatch");
        setLoadError("Invalid sample format. Please check the file.");
      }
    } catch (err) {
      console.error("❌ Failed to load sample test data:", err);
      setLoadError("Failed to load sample file.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800 font-sharemono">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-6">🛠️ Admin Portal</h1>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/editor")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded shadow"
          >
            ✏️ Edit Questions
          </button>

          <button
            onClick={() => navigate("/preview-fonts")}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded shadow"
          >
            🎨 Preview Fonts & Colors
          </button>

          {/* 🧪 Load Sample Results */}
          <div className="space-y-2">
            <label className="block font-bold">🧪 Load Sample Results</label>
            <select
              value={selectedSample}
              onChange={(e) => setSelectedSample(e.target.value)}
              className="w-full p-2 rounded border border-gray-300"
            >
              <option value="">Select a sample file...</option>
              <option value="testResults_sampleMinimal.json">🎯 Sample Mini Exam</option>
              <option value="testResults_strong.json">✅ Strong Performance</option>
              <option value="testResults_mixed.json">⚖️ Mixed Performance</option>
              <option value="testResults_weakPlanning.json">🔴 Weak Planning Focus</option>
              <option value="testResults_withUserAnswers.json">🧠 Sample with User Answers</option>
<option value="testResults_verifiedSample.json">✅ Verified Sample Exam</option>

            </select>

            {loadError && (
              <div className="text-red-600 text-sm">{loadError}</div>
            )}

            <button
              onClick={handleLoadSample}
              disabled={!selectedSample}
              className={`w-full px-4 py-3 rounded shadow text-white ${
                selectedSample
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              🚀 Load & View Dashboard
            </button>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white px-4 py-3 rounded shadow"
          >
            ⬅️ Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
