// File: /pixel-pm/src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import QuestionEditor from "./components/QuestionEditor";
import GuestBook from "./components/GuestBook";
import TestResponsive from './components/TestResponsive';
import AdminPortal from "./components/AdminPortal";
import UserDashboard from "./pages/UserDashboard"; // ⬅️ NEW

import "./index.css";

function App() {
  const [quizLength, setQuizLength] = useState(null);
  const [isMockExam, setIsMockExam] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-yellow-100 text-black font-arcade p-4">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setQuizLength={setQuizLength}
                setIsMockExam={setIsMockExam}
              />
            }
          />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/test" element={<TestResponsive />} />
          <Route
            path="/quiz"
            element={
              <Quiz
                length={quizLength}
                isMockExam={isMockExam}
                onBack={() => setQuizLength(null)}
              />
            }
          />
          <Route path="/editor" element={<QuestionEditor />} />
          <Route path="/guestbook" element={<GuestBook />} />

          {/* ✅ NEW ROUTE */}
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
