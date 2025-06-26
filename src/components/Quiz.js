import React from "react";
import { QuizProvider } from "./quiz/QuizProvider";
import QuizScreen from "./quiz/QuizScreen";

export default function Quiz() {
  const quizLength = parseInt(localStorage.getItem("quizLength") || "10", 10);
  const isMockExam = localStorage.getItem("isMockExam") === "true";

  return (
    <QuizProvider quizLength={quizLength} isMockExam={isMockExam}>
      <QuizScreen />
    </QuizProvider>
  );
}
