// src/utils/PerformanceUtils.js

export function analyzePerformanceByPhase(questionStates, questions) {
  const phaseData = {};

  questions.forEach((question, index) => {
    const phase = question.phase || "Unspecified";

    if (!phaseData[phase]) {
      phaseData[phase] = { total: 0, correct: 0 };
    }

    phaseData[phase].total += 1;

    // We assume "answered" means CORRECT, "incorrect" means WRONG
    if (questionStates[index] === "answered") {
      phaseData[phase].correct += 1;
    }
  });

  return Object.entries(phaseData).map(([phase, data]) => ({
    phase,
    total: data.total,
    correct: data.correct,
    percent: Math.round((data.correct / data.total) * 100),
  }));
}
