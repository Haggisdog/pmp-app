// File: /pixel-pm/src/components/Home.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PMPWalkCycle from "./PMPWalkCycle";
import pmPixelAvatar from "../assets/PM_Pixel.png";
import pmPixelThumbsUp from "../assets/PM_Pixel_ThumbsUp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const navigate = useNavigate();
  const [walkFinished, setWalkFinished] = useState(false);

  const bubbleQuotes = [
    "🏆 +100 XP — Exam Ready!",
    "🎯 Final Boss: PMP Certification!",
    "💾 Mission: Pass Initiated.",
    "🧠 Insert Confidence. Press Start!",
    "📈 Critical Path Achieved!",
    "📚 Power-Up: Study Mode!"
  ];
  const [quote, setQuote] = useState("");

useEffect(() => {
  const handler = (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "A") {
      navigate("/admin");
    }
  };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, []);


  useEffect(() => {
    setQuote(bubbleQuotes[Math.floor(Math.random() * bubbleQuotes.length)]);
  }, []);

  const startQuiz = (length, isMock) => {
    localStorage.setItem("quizLength", length.toString());
    localStorage.setItem("isMockExam", isMock ? "true" : "false");
    navigate("/quiz");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-yellow-100 text-black font-arcade p-6 overflow-hidden">

      {/* 🚶 PM Pixel walk animation */}
      {!walkFinished ? (
        <div
          className="absolute bottom-28 left-[-90px] animate-pmp-walk z-40"
          onAnimationEnd={() => setWalkFinished(true)}
        >
          <PMPWalkCycle />
        </div>
      ) : (
        <>
          {/* 👍 PM Pixel thumbs-up with quote (bottom-right) */}
          <div className="absolute bottom-40 sm:bottom-28 right-2 sm:right-6 z-40 flex flex-col items-end space-y-2 scale-90 sm:scale-100">
            <img
              src={pmPixelThumbsUp}
              alt="PM Pixel Thumbs Up"
              className="w-28 sm:w-36 h-auto"
              style={{ imageRendering: "pixelated" }}
            />
            <div className="bg-white border-2 border-black p-2 text-xs sm:text-sm font-mono shadow-lg w-36 sm:w-44 text-right leading-tight">
              {quote}
            </div>
          </div>

{/* 🌍 Visitor map (bottom-left) */}
<div className="absolute bottom-40 sm:bottom-28 left-2 sm:left-6 z-40 flex flex-col items-start space-y-2 scale-90 sm:scale-100">
  <a
    href="https://clustrmaps.com/site/1c6o2"
    title="Visitor Map"
    className="block"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="https://clustrmaps.com/map_v2.png?d=Nwke78G_atU5sGYD958LAFjClYqgD_mV48hKhjcq7j0&cl=ffffff"
      alt="ClustrMaps Visitor Map"
      className="w-28 sm:w-36 border-2 border-black rounded shadow-lg"
    />
  </a>
</div>

        
        </>
      )}

      {/* 🧍 PM Pixel logo and typewriter title */}
      <img
        src={pmPixelAvatar}
        alt="PM Pixel Avatar"
        className="w-48 h-auto mx-auto mt-14 sm:mt-4 mb-6"
        style={{ imageRendering: "pixelated" }}
      />
      <h1 className="text-4xl mb-2 typewriter">Pixel PM</h1>
      <p className="text-md mb-8 italic text-gray-800">
        Retro Style, Real Exam Power
      </p>
      <p className="text-md mb-8 italic text-gray-800">
        Real world practice exam questions for the PMI PMP certification.
      </p>

      {/* 🎯 Quiz buttons */}
      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <button
          onClick={() => startQuiz(180, true)}
          className="w-full bg-green-600 hover:bg-green-700 text-white retro-button p-3 rounded shadow-lg shadow-green-400 hover:shadow-xl transition-all animate-glow"
        >
          🕹️ Full Exam (180 Questions)
        </button>
        <button
          onClick={() => startQuiz(10, false)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white retro-button p-3 rounded shadow-lg shadow-blue-400 hover:shadow-xl transition-all animate-glow"
        >
          🎯 Quick Quiz (10 Questions)
        </button>
        <button
          onClick={() => navigate("/guestbook")}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white retro-button p-3 rounded shadow-lg shadow-yellow-300 hover:shadow-xl transition-all animate-glow"
        >
          📜 Sign Guest Book
        </button>
      </div>

      {/* 🔗 External links */}
      <div className="mt-10 flex flex-wrap justify-center items-center gap-4 px-4 w-full max-w-md">
        <a
          href="https://www.linkedin.com/in/bryancampbell/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-200 hover:bg-blue-300 text-blue-900 px-4 py-2 rounded border-2 border-blue-500 shadow-lg flex items-center text-lg font-bold retro-button animate-glow w-full sm:w-auto text-center"
        >
          🕹️ LinkedIn
        </a>
        <a
          href="https://7c-consulting.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-200 hover:bg-green-300 text-green-900 px-4 py-2 rounded border-2 border-green-500 shadow-lg flex items-center text-lg font-bold retro-button animate-glow w-full sm:w-auto text-center"
        >
          💾 7C Consulting
        </a>
      </div>

{/* 📘 README link - Top Left Corner */}
<div className="absolute top-4 left-4 z-50">
  <a
    href="/readme.html"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center bg-white text-yellow-800 hover:text-yellow-600 border border-yellow-500 px-3 py-2 rounded shadow-lg font-arcade text-sm"
  >
    <FontAwesomeIcon icon={faClipboard} className="mr-2" />
    README
  </a>
</div>


      {/* 🧮 Counter - Top right */}
      <div className="absolute top-4 right-4 z-50 opacity-80">
        <a href="https://www.freecounterstat.com" title="free website counter">
          <img
            src="https://counter1.optistats.ovh/private/freecounterstat.php?c=hsp2ux1twass9w6yms5sl74nrmdajq74"
            alt="Visitor Counter"
            className="w-24"
          />
        </a>
      </div>
    </div>
  );
}
