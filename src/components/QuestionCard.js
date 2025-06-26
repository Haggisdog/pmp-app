// File: /src/components/QuestionCard.js
import React from "react";

export default function QuestionCard({
  current,
  question,
  selected,
  showAnswer,
  handleSelect,
  handleSubmit,
  handleSkip,
  handleNext,
}) {
  const isMulti = question.type === "multiple-response";
  const options = question.options || {};

  const isChecked = (letter) =>
    isMulti ? selected.includes(letter) : selected[0] === letter;

  const isCorrectAnswer = (letter) => {
    if (!showAnswer) return false;
    return isMulti
      ? question.answer.includes(letter)
      : question.answer === letter;
  };

  return (
    <div className="space-y-4 text-xs sm:text-sm">
      {/* 🔢 Question Number */}
      <div className="text-xs text-gray-500 font-bold">
        Question {current + 1}
      </div>

      {/* ❓ Question Text */}
      <h2 className="text-sm sm:text-base font-bold">{question.question}</h2>

      {/* 🅰️ Options */}
      <div className="space-y-3 mt-4">
        {Object.entries(options).map(([letter, text]) => {
          const isSelected = isChecked(letter);
          const isCorrect = isCorrectAnswer(letter);

          const baseStyle =
            "flex items-center p-2 sm:p-3 rounded border cursor-pointer transition-all";
          let selectedStyle = "border border-gray-300";

if (isSelected && !showAnswer) {
  selectedStyle = "border-2 border-blue-600 bg-blue-100 ring-2 ring-blue-400";
}

if (isSelected && showAnswer && !isCorrect) {
  selectedStyle = "border-2 border-red-600 bg-red-100 ring-2 ring-red-400";
}

          const answerStyle =
            showAnswer && isCorrect ? "border-green-600 bg-green-100" : "";

          return (
            <label
              key={letter}
              className={`${baseStyle} ${selectedStyle} ${answerStyle}`}
            >
              <input
                type={isMulti ? "checkbox" : "radio"}
                name="option"
                value={letter}
                checked={isSelected}
                onChange={() => handleSelect(letter)}
                className="mr-2 accent-blue-600"
              />
              <span className="font-bold mr-2">{letter}.</span>
              <span>{text}</span>
            </label>
          );
        })}
      </div>

      {/* 🎯 Explanation */}
      {showAnswer && question.explanation && (
        <div className="mt-4 bg-yellow-100 border border-yellow-400 p-3 rounded text-sm">
          <strong>Explanation:</strong> {question.explanation}
        </div>
      )}

      {/* 🧭 Navigation */}
      <div className="flex gap-4 pt-4">
        {!showAnswer ? (
          <>
            <button
              onClick={handleSubmit}
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded shadow"
            >
              ✅ Submit
            </button>
            <button
              onClick={handleSkip}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow"
            >
              ⏭️ Skip
            </button>
          </>
        ) : (
          <button
            onClick={handleNext}
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded shadow"
          >
            ➡️ Next
          </button>
        )}
      </div>
    </div>
  );
}
