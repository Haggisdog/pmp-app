// File: /src/components/quiz/QuizEngine.js
import { useState, useEffect } from "react";
import { supabase } from "../../supabase";

export function useQuizEngine(quizLength, isMockExam) {
  const [questions, setQuestions] = useState([]);
  const [questionStates, setQuestionStates] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [timer, setTimer] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .or("status.is.null,status.neq.wip");

      if (error) {
        console.error("❌ Supabase fetch error:", error);
      } else {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, quizLength);
        setQuestions(selectedQuestions);
        setQuestionStates(Array(selectedQuestions.length).fill("unseen"));
        setStartTime(Date.now());
      }
    };

    fetchQuestions();
  }, [quizLength]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds) => {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};



  const handleSelect = (value) => {
    if (showAnswer) return;
    const isMulti = questions[current].type === "multiple-response";
    setSelected((prev) =>
      isMulti
        ? prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
        : [value]
    );
  };

  const handleSubmit = () => {
    if (showAnswer) return;
    const currentQ = questions[current];
    const isMulti = currentQ.type === "multiple-response";

    const correctAnswers = Array.isArray(currentQ.answer)
      ? [...currentQ.answer].sort()
      : [currentQ.answer];
    const userAnswers = [...selected].sort();

    const isCorrect =
      correctAnswers.length === userAnswers.length &&
      correctAnswers.every((val, idx) => val === userAnswers[idx]);

    const updatedStates = [...questionStates];
    updatedStates[current] = isCorrect ? "answered" : "incorrect";
    setQuestionStates(updatedStates);
    setShowAnswer(true);
    isCorrect ? setCorrectCount((c) => c + 1) : setIncorrectCount((c) => c + 1);
  };

  const handleSkip = () => {
    const updatedStates = [...questionStates];
    updatedStates[current] = "skipped";
    setQuestionStates(updatedStates);
    setSkippedCount((c) => c + 1);
    setSelected([]);
    setShowAnswer(false);
    setCurrent((prev) => prev + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setShowResults(true);
    } else {
      setSelected([]);
      setShowAnswer(false);
      setCurrent((prev) => prev + 1);
    }
  };

  return {
    questions,
    questionStates,
    current,
    selected,
    showAnswer,
    showResults,
    timer: formatTime(timer),
    correctCount,
    incorrectCount,
    skippedCount,
    handleSelect,
    handleSubmit,
    handleSkip,
    handleNext,
    setCurrent,
    setSelected,
    setShowAnswer,
    setShowResults,
  };
}
