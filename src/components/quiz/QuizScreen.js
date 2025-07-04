// File: /src/components/quiz/QuizScreen.js

import React, { useEffect, useRef, useState } from "react";
import QuizLayout from "../QuizLayout";
import QuizWithFontToggle from "../QuizWithFontToggle";
import ResultsSummary from "../ResultsSummary";
import UserDashboard from "../../pages/UserDashboard";
import { useQuiz } from "./QuizProvider";

function formatTime(totalSeconds) {
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function QuizScreen() {
  const {
    questions,
    questionStates,
    current,
    selected,
    showAnswer,
    showResults,
    isMockExam,
    correctCount,
    incorrectCount,
    skippedCount,
    setCurrent,
    setSelected,
    setShowAnswer,
    handleSelect,
    handleSkip,
    handleNext,
    handleSubmit,
    handleFinish,
  } = useQuiz();

  const totalExamTime = 230 * 60;
  const [remainingTime, setRemainingTime] = useState(totalExamTime);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!showResults) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [showResults]);

  useEffect(() => {
    localStorage.setItem("quizMaxTime", totalExamTime.toString());
    localStorage.setItem("quizDuration", (totalExamTime - remainingTime).toString());
  }, [remainingTime, totalExamTime]);

  const currentQuestion = questions[current];

  if (!questions.length || !currentQuestion) {
    return (
      <div className="text-black p-6 text-xl text-center">
        📦 Loading questions...
      </div>
    );
  }

  if (showResults) {
    return isMockExam ? (
      <UserDashboard />
    ) : (
      <ResultsSummary
        correct={correctCount}
        incorrect={incorrectCount}
        skipped={skippedCount}
        total={questions.length}
        onReturn={() => (window.location.href = "/")}
      />
    );
  }

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-yellow-100 text-black font-arcade">
      <div className="w-full sm:w-11/12 max-w-screen-xl mx-auto p-4 sm:p-6">
        <QuizLayout
          onBack={() => (window.location.href = "/")}
          isMockExam={isMockExam}
          timer={formatTime(remainingTime)}
          questionStates={questionStates}
          setCurrent={setCurrent}
          setSelected={setSelected}
          setShowAnswer={setShowAnswer}
          onFinish={handleFinish}
          questions={questions}
          currentQuestion={currentQuestion}
        >
          <QuizWithFontToggle
            questionProps={{
              current,
              question: currentQuestion,
              selected,
              showAnswer,
              handleSelect,
              handleSkip,
              handleNext,
              handleSubmit,
            }}
          />
        </QuizLayout>
      </div>
    </div>
  );
}
