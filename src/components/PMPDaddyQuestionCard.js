import { useState } from "react";

function MultipleResponseQuestion({ questionData, onAnswer }) {
  const { question, options, answer, explanation } = questionData;
  const [selected, setSelected] = useState([]);

  const toggleOption = (option) => {
    setSelected(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const checkAnswer = () => {
    const correct = arraysEqual(
      [...selected].sort(),
      [...answer].sort()
    );
    onAnswer(correct, explanation);
  };

  const arraysEqual = (a, b) =>
    a.length === b.length && a.every((val, i) => val === b[i]);

  return (
    <div className="p-4">
      <p className="text-lg font-semibold mb-4">{question}</p>
      <ul className="space-y-2">
        {options.map((opt, idx) => (
          <li key={idx}>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-500"
                checked={selected.includes(opt)}
                onChange={() => toggleOption(opt)}
              />
              <span className="ml-2 text-base">{opt}</span>
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={checkAnswer}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Submit
      </button>
    </div>
  );
}
