// src/utils/PerformanceUtils.js

export function analyzePerformanceByPhase(questionStates, questions) {
  const phaseData = {};

  questions.forEach(({ id, phase }) => {
    if (!phaseData[phase]) phaseData[phase] = { total: 0, correct: 0 };
    phaseData[phase].total += 1;
    const state = questionStates[id];
    if (state && state.selected === state.answer) {
      phaseData[phase].correct += 1;
    }
  });

  return Object.entries(phaseData).map(([phase, data]) => ({
    phase,
    total: data.total,
    correct: data.correct,
    percent: Math.round((data.correct / data.total) * 100)
  }));
}
