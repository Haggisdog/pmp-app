// File: /src/components/AdminPortal.js
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPortal() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800 font-sharemono">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🛠️ Admin Portal</h1>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/editor")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded shadow"
          >
            ✏️ Edit Questions
          </button>

          <button
            onClick={() => navigate("/preview-fonts")}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded shadow"
          >
            🎨 Preview Fonts & Colors
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white px-4 py-3 rounded shadow"
          >
            ⬅️ Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
