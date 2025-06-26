// File: /src/components/quiz/QuizProvider.js
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase";

const QuizContext = createContext();

export function QuizProvider({ children, quizLength = 10, isMockExam = false }) {
  const [questions, setQuestions] = useState([]);
  const [questionStates, setQuestionStates] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch questions from Supabase on load
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("questions")
          .select("*")
          .or("status.is.null,status.neq.wip");

        if (error) throw error;

        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, quizLength);
        const stateArray = Array(selectedQuestions.length).fill("unseen");

        setQuestions(selectedQuestions);
        setQuestionStates(stateArray);
        setStartTime(Date.now());
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching questions:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizLength]);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const handleSelect = (value) => {
    if (showAnswer) return;

    const currentQuestion = questions[current];
    const isMulti = currentQuestion?.type === "multiple-response";

    if (isMulti) {
      const alreadySelected = selected.includes(value);
      const updated = alreadySelected
        ? selected.filter((v) => v !== value)
        : [...selected, value];
      setSelected(updated);
    } else {
      setSelected([value]);
    }
  };

  const handleSubmit = () => {
    if (showAnswer) return;

    const currentQuestion = questions[current];
    const isMulti = currentQuestion?.type === "multiple-response";
    let isCorrect = false;

    if (isMulti) {
      const correctAnswers = [...currentQuestion.answer].sort();
      const userAnswers = [...selected].sort();
      isCorrect =
        correctAnswers.length === userAnswers.length &&
        correctAnswers.every((val, idx) => val === userAnswers[idx]);
    } else {
      const correct = currentQuestion.answer;
      const user = selected[0];
      isCorrect = user === correct;
    }

    const newStates = [...questionStates];
    newStates[current] = isCorrect ? "answered" : "incorrect";
    setQuestionStates(newStates);
    setShowAnswer(true);

    isCorrect
      ? setCorrectCount((c) => c + 1)
      : setIncorrectCount((c) => c + 1);
  };

  const handleSkip = () => {
    const newStates = [...questionStates];
    newStates[current] = "skipped";
    setQuestionStates(newStates);
    setSkippedCount((c) => c + 1);
    setSelected([]);
    setShowAnswer(false);
    setCurrent((prev) => prev + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setShowResults(true);
    } else {
      setCurrent((prev) => prev + 1);
      setSelected([]);
      setShowAnswer(false);
    }
  };

  const handleFinish = () => {
    setShowResults(true);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        questionStates,
        current,
        selected,
        showAnswer,
        showResults,
        timer,
        correctCount,
        incorrectCount,
        skippedCount,
        loading,
        error,
        isMockExam,
        setCurrent,
        setSelected,
        setShowAnswer,
        setShowResults,
        setQuestionStates,
        handleSelect,
        handleSubmit,
        handleSkip,
        handleNext,
        handleFinish,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  return useContext(QuizContext);
}
