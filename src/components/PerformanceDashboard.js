// src/components/PerformanceDashboard.js
import React from "react";
import { analyzePerformanceByPhase } from "../utils/PerformanceUtils";

export default function PerformanceDashboard({ questionStates, questions }) {
  const performance = analyzePerformanceByPhase(questionStates, questions);

  return (
    <div className="p-4 bg-white rounded shadow-md font-sharemono">
      <h2 className="text-lg font-bold mb-4">📊 Performance by PMI Phase</h2>
      <table className="w-full text-sm text-left">
        <thead>
          <tr>
            <th>Phase</th>
            <th>Correct</th>
            <th>Total</th>
            <th>Score</th>
            <th>Suggestion</th>
          </tr>
        </thead>
        <tbody>
          {performance.map(({ phase, correct, total, percent }) => (
            <tr key={phase}>
              <td>{phase}</td>
              <td>{correct}</td>
              <td>{total}</td>
              <td>{percent}%</td>
              <td>
                {percent < 70 ? (
                  <span className="text-red-500">Review {phase} concepts</span>
                ) : (
                  <span className="text-green-600">Strong</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
