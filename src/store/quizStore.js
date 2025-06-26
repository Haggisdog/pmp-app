// File: /src/store/quizStore.js
import { create } from "zustand";

export const useQuizStore = create((set) => ({
  questions: [],
  questionStates: [],

  setQuestions: (questions) => set({ questions }),
  setQuestionStates: (questionStates) => set({ questionStates }),

  resetQuiz: () =>
    set({
      questions: [],
      questionStates: [],
    }),
}));
