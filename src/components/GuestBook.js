// File: /src/components/GuestBook.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function GuestBook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot field
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // 🧠 Cooldown timer: limit submissions every 10 seconds
  const cooldownKey = "guestbookLastSubmit";

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Failed to fetch guestbook entries:", error.message);
        setError("Could not load guestbook.");
      } else {
        setEntries(data);
      }
      setLoading(false);
    };

    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;

    // Honeypot: if filled, likely a bot
    if (website.trim() !== "") {
      console.warn("🕵️ Bot detected (honeypot)");
      return;
    }

    // Cooldown logic
    const lastSubmit = localStorage.getItem(cooldownKey);
    const now = Date.now();
    if (lastSubmit && now - parseInt(lastSubmit, 10) < 10000) {
      alert("⏳ Please wait a few seconds before submitting again.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("guestbook").insert({
      name: name.trim(),
      message: message.trim(),
      website: "", // always empty from honeypot
    });

    if (error) {
      console.error("❌ Supabase insert error:", error.message);
      alert("Failed to post comment.");
    } else {
      setName("");
      setMessage("");
      setWebsite("");
      localStorage.setItem(cooldownKey, now.toString());
      const { data } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false });
      setEntries(data);
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-yellow-100 text-black font-arcade p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl text-pink-700">📖 Pixel PM Guest Book</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            ⬅️ Home
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-6 bg-yellow-200 p-4 rounded border border-yellow-400">
          <label className="block mb-2 font-bold">Your Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-2 border border-yellow-400 rounded bg-yellow-50"
            placeholder="CoolPM123"
            required
          />

          <label className="block mb-2 font-bold">Your Comment</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-yellow-400 rounded bg-yellow-50"
            placeholder="Loving this retro PMP prep!"
            maxLength={300}
            required
          />

          {/* 🕵️ Honeypot: hidden from users, shown to bots */}
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            tabIndex="-1"
            autoComplete="off"
          />

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2 rounded shadow"
          >
            {submitting ? "Submitting..." : "Sign Guest Book ✍️"}
          </button>
        </form>

        <div>
          <h2 className="text-xl mb-4">📝 Previous Entries</h2>
          {loading ? (
            <p>Loading entries...</p>
          ) : entries.length === 0 ? (
            <p className="text-gray-600">No one has signed yet. Be the first!</p>
          ) : (
            <ul className="space-y-4">
              {entries.map((entry, i) => (
                <li key={entry.created_at + i} className="bg-white p-4 border border-yellow-300 rounded">
                  <p className="font-bold text-lg text-green-700">{entry.name}</p>
                  <p className="italic text-sm text-gray-600">
                    {new Date(entry.created_at).toLocaleString()}
                  </p>
                  <p className="mt-2">{entry.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
