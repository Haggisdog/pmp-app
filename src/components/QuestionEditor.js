// File: /src/components/QuestionEditor.js
import React, { useEffect, useState } from "react";
import { useQuizStore } from "../store/quizStore";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function QuestionEditor() {
  const navigate = useNavigate();
  const questions = useQuizStore((state) => state.questions);
  const setQuestions = useQuizStore((state) => state.setQuestions);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showWipOnly, setShowWipOnly] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase.from("questions").select("*");
      if (error) {
        console.error("❌ Failed to fetch questions from Supabase:", error);
      } else {
        setQuestions(data);
      }
    };

    if (!questions || questions.length === 0) {
      fetchQuestions();
    }
  }, [questions, setQuestions]);

  const isQuestionComplete = (question) => {
    const hasValidAnswer = question.type === "multiple-response"
      ? Array.isArray(question.answer) && question.answer.length > 0
      : typeof question.answer === "string" && question.answer.trim() !== "";
    return (
      question.question.trim() !== "" &&
      question.phase.trim() !== "" &&
      Object.values(question.options).every((opt) => opt.trim() !== "") &&
      hasValidAnswer &&
      question.explanation.trim() !== ""
    );
  };

  const saveToSupabase = async (question) => {
    const { data, error } = await supabase
      .from("questions")
      .upsert(question, { onConflict: ["id"] });
    if (error) console.error("❌ Failed to save question:", error);
  };

  const handleFieldChange = (field, value) => {
    const updated = [...questions];
    updated[selectedIndex][field] = value;
    updated[selectedIndex].status = isQuestionComplete(updated[selectedIndex]) ? undefined : "wip";
    setQuestions(updated);
    saveToSupabase(updated[selectedIndex]);
  };

  const handleOptionChange = (key, value) => {
    const updated = [...questions];
    updated[selectedIndex].options = {
      ...updated[selectedIndex].options,
      [key]: value,
    };
    setQuestions(updated);
    saveToSupabase(updated[selectedIndex]);
  };

  const handleAnswerToggle = (key) => {
    const updated = [...questions];
    const currentAnswer = updated[selectedIndex].answer;
    if (updated[selectedIndex].type === "multiple-response") {
      const answers = Array.isArray(currentAnswer) ? [...currentAnswer] : [currentAnswer];
      const index = answers.indexOf(key);
      if (index >= 0) {
        answers.splice(index, 1);
      } else {
        answers.push(key);
      }
      updated[selectedIndex].answer = answers;
    } else {
      updated[selectedIndex].answer = key;
    }
    setQuestions(updated);
    saveToSupabase(updated[selectedIndex]);
  };

  const handleAddOption = () => {
    const updated = [...questions];
    const currentOptions = updated[selectedIndex].options;
    const nextChar = String.fromCharCode(
      Math.max(...Object.keys(currentOptions).map((k) => k.charCodeAt(0))) + 1
    );
    updated[selectedIndex].options[nextChar] = "";
    setQuestions(updated);
    saveToSupabase(updated[selectedIndex]);
  };

  const handleAddQuestion = async () => {
    const newQuestion = {
      id: questions.length + 1,
      type: "single-response",
      phase: "",
      question: "New question",
      options: {
        A: "",
        B: "",
        C: "",
        D: "",
      },
      answer: "A",
      explanation: "",
      status: "wip",
    };
    const updated = [...questions, newQuestion];
    setQuestions(updated);
    setSelectedIndex(updated.length - 1);
    await saveToSupabase(newQuestion);
  };

  const handleDeleteQuestion = async () => {
    const questionToDelete = questions[selectedIndex];
    if (questions.length <= 1) return;
    const updated = [...questions];
    updated.splice(selectedIndex, 1);
    setQuestions(updated);
    setSelectedIndex(Math.max(0, selectedIndex - 1));
    await supabase.from("questions").delete().eq("id", questionToDelete.id);
  };

  const handleSave = () => {
    questions.forEach((q) => saveToSupabase(q));
  };

  const handleImportFromJson = async () => {
    try {
      const res = await fetch("/questions.json");
      const data = await res.json();
      setQuestions(data);
      for (const q of data) {
        await supabase.from("questions").upsert(q, { onConflict: ["id"] });
      }
      alert("✅ Imported questions.json to Supabase");
    } catch (err) {
      console.error("❌ Failed to import JSON:", err);
      alert("❌ Import failed. Check console for details.");
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="p-6 text-center text-red-600 font-sharemono">
        ⚠️ No questions loaded.
      </div>
    );
  }

  const current = questions[selectedIndex];
  const filteredQuestions = questions.filter((q) => {
    const idMatch = q.id.toString().includes(searchTerm.trim());
    const textMatch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    const wipMatch = showWipOnly ? q.status === "wip" : true;
    return (idMatch || textMatch) && wipMatch;
  });

  const isMultiple = current.type === "multiple-response";
  const currentAnswers = Array.isArray(current.answer) ? current.answer : [current.answer];

  return (
    <div className="flex h-screen font-sharemono">
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto border-r border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">🗂️ Questions</h2>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded"
            >
              🏠 Home
            </button>
            <button
              onClick={handleAddQuestion}
              className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
            >
              ➕ Add
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search by ID or text..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <label className="block mb-4 text-sm">
          <input
            type="checkbox"
            checked={showWipOnly}
            onChange={(e) => setShowWipOnly(e.target.checked)}
            className="mr-1"
          />
          Show only WIP questions
        </label>
        <ul className="space-y-2">
          {filteredQuestions.map((q) => {
            const realIndex = questions.findIndex((x) => x.id === q.id);
            return (
              <li
                key={q.id}
                className={`cursor-pointer p-2 rounded border text-sm hover:bg-gray-200 ${
                  realIndex === selectedIndex ? "bg-yellow-200 font-bold" : "bg-white"
                }`}
                onClick={() => setSelectedIndex(realIndex)}
              >
                #{q.id} — {q.question.slice(0, 40)}...
              </li>
            );
          })}
        </ul>
      </div>

      <div className="w-2/3 p-6 space-y-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">✏️ Edit Question #{current.id}</h2>

        <div>
          <label className="font-bold">Question Type:</label>
          <select
            value={current.type || "single-response"}
            onChange={(e) => handleFieldChange("type", e.target.value)}
            className="w-full border p-2 rounded mb-4"
          >
            <option value="single-response">Single Response</option>
            <option value="multiple-response">Multiple Response</option>
          </select>
        </div>

        <div>
          <label className="font-bold">Question:</label>
          <textarea
            value={current.question}
            onChange={(e) => handleFieldChange("question", e.target.value)}
            className="w-full border p-2 rounded"
            rows={3}
          />
        </div>

        <div>
          <label className="font-bold">Phase:</label>
          <input
            type="text"
            value={current.phase}
            onChange={(e) => handleFieldChange("phase", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="font-bold">Options:</label>
          {current.options && typeof current.options === "object" ? (
            <>
              {Object.entries(current.options).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 mb-1">
                  <span className="w-6 font-bold">{key}</span>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleOptionChange(key, e.target.value)}
                    className="flex-1 border p-1 rounded"
                  />
                  {isMultiple && (
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={currentAnswers.includes(key)}
                        onChange={() => handleAnswerToggle(key)}
                        className="mr-1"
                      />
                      Correct
                    </label>
                  )}
                </div>
              ))}
              <button
                onClick={handleAddOption}
                className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
              >
                ➕ Add Option
              </button>
            </>
          ) : (
            <div className="text-red-500 text-sm">⚠️ Invalid options format</div>
          )}
        </div>

        {!isMultiple && (
          <div>
            <label className="font-bold">Answer:</label>
            <select
              value={current.answer}
              onChange={(e) => handleFieldChange("answer", e.target.value)}
              className="w-full border p-2 rounded"
            >
              {current.options &&
                Object.keys(current.options).map((optKey) => (
                  <option key={optKey} value={optKey}>
                    {optKey}
                  </option>
                ))}
            </select>
          </div>
        )}

        <div>
          <label className="font-bold">Explanation:</label>
          <textarea
            value={current.explanation}
            onChange={(e) => handleFieldChange("explanation", e.target.value)}
            className="w-full border p-2 rounded"
            rows={2}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={handleDeleteQuestion}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
          >
            🗑️ Delete
          </button>
          <button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
          >
            🔄 Save to Supabase
          </button>
          <button
            onClick={handleImportFromJson}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded shadow"
          >
            📥 Import from JSON
          </button>
        </div>
      </div>
    </div>
  );
}
