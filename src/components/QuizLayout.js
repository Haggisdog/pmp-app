// File: /src/components/QuizLayout.js

import React from "react";
import QuestionTable from "./QuestionTable";

export default function QuizLayout({
  onBack,
  isMockExam,
  timer,
  questionStates,
  setCurrent,
  setSelected,
  setShowAnswer,
  questions,
  currentQuestion,
  children,
  onFinish,
}) {
  const hasSkippedOrUnseen = questionStates.some(
    (state) => state === "skipped" || state === "unseen"
  );

  const handleFinishClick = () => {
    if (hasSkippedOrUnseen) {
      const confirmFinish = window.confirm(
        "There are skipped or unseen questions. Are you sure you want to finish the exam?"
      );
      if (!confirmFinish) return;
    }
    onFinish();
  };

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen bg-yellow-100 text-black font-arcade">
      {/* 📋 Main Question Panel */}
      <div className="flex-grow p-4 sm:p-6 pb-20 min-w-[0]">
        {/* 🔙 Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="bg-gray-700 text-white px-4 py-2 rounded text-sm sm:text-base"
          >
            ← Back
          </button>

          {isMockExam && (
            <div className="text-base sm:text-lg lg:text-xl font-mono text-green-500 bg-black px-3 sm:px-4 py-1 sm:py-2 rounded shadow-md border border-green-500 animate-pulse">
              🕒 {timer}
            </div>
          )}

          <div className="text-sm sm:text-md text-gray-700 font-semibold">
            {questionStates.filter((s) => s !== "unseen").length} / {questionStates.length}
          </div>
        </div>

        {/* 🧠 Question Content */}
        <div className="max-w-4xl mx-auto w-full">{children}</div>

        {/* 🏁 Finish Exam */}
        <div className="mt-8 flex justify-center sm:justify-start">
          <button
            onClick={handleFinishClick}
            className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded text-sm sm:text-base"
          >
            🏁 Finish Exam
          </button>
        </div>
      </div>

      {/* 📊 Sidebar for Mock Exams */}
      {isMockExam && (
        <aside className="w-full lg:w-[480px] xl:w-[520px] bg-yellow-200 px-4 py-4 border-t lg:border-t-0 lg:border-l border-yellow-300 shrink-0">
          <QuestionTable
            questionStates={questionStates}
            questions={questions}
            onJumpTo={(index) => {
              setCurrent(index);
              setSelected([]);
              setShowAnswer(false);
            }}
          />
        </aside>
      )}

      {/* 🆔 Fixed Question ID */}
      <div className="absolute bottom-1 left-4 text-xs text-gray-600 font-bold">
        ID: {currentQuestion?.id ?? "?"}
      </div>
    </div>
  );
}
