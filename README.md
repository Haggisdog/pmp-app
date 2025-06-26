# 🎮 PM Pixel – PMP Exam Prep App

Welcome to **PM Pixel**, an interactive web-based PMP® exam prep app with a retro pixel-art theme and an AI-powered assistant named **PMP Daddy**. Whether you're studying for a full-length mock exam or want quick question drills, this app makes it fun and focused.

---

## 🚀 Features

- ✅ **Mock Exam Mode** with a realistic 230-minute countdown timer
- 🎯 **Exam Review Dashboard** with performance breakdowns
- 📊 **Visual charts**: Score pie chart & PMI Phase bar graph
- 💡 **Question Editor** with autosave, validation, and WIP tracking
- 🧠 **Multiple-answer support** for complex questions
- 🧪 Import/export from JSON for easy data management
- 🖥️ Fully responsive layout for desktop and mobile

---

## 🧱 Tech Stack

- **Frontend:** React + TailwindCSS
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **State Management:** Zustand
- **Hosting:** Netlify

---

## 📂 Project Structure

```bash
/src
  /components
    Home.js
    QuizLayout.js
    QuestionEditor.js
    UserDashboard.js
    ...
  /quiz
    QuizScreen.js
    QuizProvider.js
  /pages
    ResultsSummary.js
/public
  testResults_*.json
  questions.json
