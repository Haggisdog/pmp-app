// File: /pixel-pm/src/components/QuestionCard.js
import React, { useState } from "react";

// Renders a single quiz question with green screen toggle
export default function QuestionCard({
  question,
  current,
  selected,
  showAnswer,
  handleSelect,
  handleSubmit,
  handleSkip,
  handleNext,
  font // ✅ Accept font as a prop
}) {
  const [greenMode, setGreenMode] = useState(false); // 🌱 Green Screen Mode Toggle

  if (!question) return null;

  const { type, question: text, options, answer, explanation } = question;
  const isMultipleResponse = type === "multiple-response";

  // ✅ Determine if option is selected
  const isChecked = (opt) =>
    isMultipleResponse ? selected.includes(opt) : selected[0] === opt;

  // 🎨 Base styles for card container (Green Mode vs Normal)
  const baseCardClasses = greenMode
    ? "bg-black text-green-400 drop-shadow-[0_0_2px_#00FF00]"
    : "bg-white text-black";

  // 🖌️ Determine the style for each answer option
  const getOptionClasses = (opt) => {
    if (!showAnswer) return "";

    const isCorrect = isMultipleResponse
      ? answer.includes(opt)
      : answer === opt;

    const isSelected = isChecked(opt);

    if (isCorrect)
      return greenMode
        ? "bg-green-900 text-green-200 font-bold"
        : "bg-green-100 text-green-800 font-bold";

    if (isSelected && !isCorrect)
      return greenMode
        ? "bg-red-900 text-red-200"
        : "bg-red-100 text-red-800";

    return "";
  };

  return (
    <div
      className={`${baseCardClasses} p-6 rounded shadow-md w-full max-w-3xl mx-auto text-sm`}
    >
      {/* 🌱 Toggle for Green Screen Mode */}
      <div className="flex justify-end mb-4">
        <label className="flex items-center space-x-2 cursor-pointer text-xs">
          <input
            type="checkbox"
            checked={greenMode}
            onChange={() => setGreenMode(!greenMode)}
            className="form-checkbox"
          />
          <span>Green Screen Mode</span>
        </label>
      </div>

      {/* 📦 Apply font to entire content */}
      <div className={font}>
        {/* 🧠 Question Text */}
        <div className="mb-6">
          <p className="font-semibold">
            <span className="mr-2 text-gray-500 opacity-80">
              Q{current + 1}:
            </span>
            <span>{text}</span>
          </p>
          {isMultipleResponse && (
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full inline-block mt-2">
              Select all that apply
            </span>
          )}
        </div>

        {/* 🔘 Options */}
        <ul className="space-y-3 mb-6">
          {Object.entries(options).map(([key, value]) => (
            <li key={key} className={getOptionClasses(key)}>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type={isMultipleResponse ? "checkbox" : "radio"}
                  name={`question-${current}`}
                  className={`form-${isMultipleResponse ? "checkbox" : "radio"} text-green-600`}
                  checked={isChecked(key)}
                  onChange={() => handleSelect(key)}
                  disabled={showAnswer}
                />
                <span>{`${key}: ${value}`}</span>
              </label>
            </li>
          ))}
        </ul>

        {/* 📩 Controls */}
        {!showAnswer ? (
          <div className="flex space-x-4">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
            <button
              onClick={handleSkip}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Skip
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <p className="font-semibold">Explanation:</p>
            <p className="mt-2">{explanation}</p>
            <button
              onClick={handleNext}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
