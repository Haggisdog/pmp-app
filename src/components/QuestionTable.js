// File: /pixel-pm/src/components/QuestionTable.js
import React from "react";

export default function QuestionTable({ questionStates, questions, onJumpTo }) {
  if (
    !questions ||
    !questionStates ||
    !questions.length ||
    !questionStates.length
  ) {
    return <div className="text-black">Loading questions...</div>;
  }

  return (
    <div className="text-sm">
      {/* 🧭 Section Title */}
      <h3 className="text-base sm:text-lg mb-3 font-bold font-sharemono">
        Question Status
      </h3>

      {/* 🧮 Responsive Grid of Status Circles */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(2rem,1fr))] gap-1.5 p-3 rounded bg-black border border-green-700">

        {questionStates.map((state, index) => {
          const base =
  "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border text-[10px] sm:text-xs leading-none font-arial hover:scale-105 transition-transform";


          const stateStyle =
            state === "answered"
              ? "bg-green-500 text-white border-green-600"
              : state === "incorrect"
              ? "bg-red-500 text-white border-red-600"
              : state === "skipped"
              ? "bg-yellow-300 text-black border-yellow-400"
              : "bg-white text-black border-gray-400";

          return (
            <button
              key={index}
              onClick={() => onJumpTo(index)}
              className={`${base} ${stateStyle}`}
              title={`Q${index + 1} (ID: ${questions?.[index]?.id || "?"})`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* 🗂️ Legend with better contrast */}
      <div className="flex flex-wrap gap-3 mt-4 text-xs text-white bg-black bg-opacity-70 p-2 rounded">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          Answered
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          Incorrect
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-300 rounded-full" />
          Skipped
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-white border border-gray-400 rounded-full" />
          Unseen
        </div>
      </div>
    </div>
  );
}
