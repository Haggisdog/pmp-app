# 📘 Changelog

All notable changes to the PM Pixel Quiz App will be documented in this file.

---

## [v1.2.0] - 2025-06-26
### Added
- ⏱ Countdown timer for mock exams starting at 230 minutes (13,800 seconds)
- 📦 Timer state stored in `localStorage` (`quizMaxTime` and `quizDuration`)
- ✅ Exam Review Dashboard now correctly shows time remaining at finish
- 🛑 Timer halts when user submits exam and review screen is shown
- 🚫 Prevents accidental double-save in Question Editor
- 🔄 After saving a new question, editor loads a blank template automatically

### Improved
- 🧠 Phase field in question editor is now a dropdown for valid PMI phases
- ✨ Cleaner and more intuitive Exam Review summary layout
- 🛡️ Local validation prevents saving empty or invalid questions

---

## [v1.1.0] - 2025-06-20
### Added
- 📊 Exam Review Dashboard (UserDashboard.js)
- 🎯 Score breakdown pie chart (correct/incorrect/skipped)
- 📚 Bar chart showing performance by PMI phase
- 📝 Summary table with question status, answers, and explanations
- 🔁 Retake Exam and Return to Home options

---

## [v1.0.0] - 2025-06-01
### Initial Release
- 👨‍🏫 PMP Daddy app launched
- 🎮 Full-length mock exam and short quiz support
- 🧩 QuestionEditor with multi-answer, explanation, and metadata support
- 💾 Supabase integration for question storage and persistence
- 🖥️ Responsive design for desktop and mobile
