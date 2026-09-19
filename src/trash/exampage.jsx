import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaClock, FaBars } from "react-icons/fa";
import { PieChart, Pie, Cell } from "recharts";
import { useLocation, useNavigate } from "react-router-dom";

// Helper function to remove ugly HTML entities like &quot; and &#039; from API questions
const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export default function ExamSite() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { category, subject, difficulty } = state || {};

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(600);
  const [submitted, setSubmitted] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const examTitle = `${category || ""} ${subject || ""} CBT - ${difficulty || ""}`;

  /* 🚫 protect */
  useEffect(() => {
    /* if (!category) navigate("/"); */
  }, []);

  /* 📥 fetch */
  useEffect(() => {
    const fetchQ = async () => {
      try {
        const res = await axios.get(
          "https://opentdb.com/api.php?amount=15&type=multiple"
        );

        const data = res.data.results.map((q) => {
          const decodedQuestion = decodeHTML(q.question);
          const decodedCorrect = decodeHTML(q.correct_answer);
          const decodedIncorrect = q.incorrect_answers.map(item => decodeHTML(item));

          return {
            question: decodedQuestion,
            correct: decodedCorrect,
            options: [...decodedIncorrect, decodedCorrect].sort(
              () => Math.random() - 0.5
            ),
          };
        });

        setQuestions(data);
      } catch (err) {
        console.error("Error loading questions", err);
        toast.error("Failed to load questions from server");
      }
    };

    fetchQ();
  }, []);

  /* ⏱ timer */
  useEffect(() => {
    if (submitted) return;

    if (time === 0) {
      toast.error("Time up!");
      handleSubmit(true);
      return;
    }

    const t = setInterval(() => setTime((x) => x - 1), 1000);
    return () => clearInterval(t);
  }, [time, submitted]);

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const selectAnswer = (opt) => {
    setAnswers((prev) => ({ ...prev, [index]: opt }));
  };

  /* ✅ submit */
  const handleSubmit = async (auto = false) => {
    if (!auto) {
      const ok = window.confirm("Submit exam?");
      if (!ok) return;
    }

    setSubmitted(true);

    const score = questions.filter(
      (q, i) => answers[i] === q.correct
    ).length;

    try {
      // 🌟 FIX: Changed "Email" to lowercase "email" so it matches what your backend database expects!
      await axios.post("http://localhost:3000/api/exam/submit", {
        name: localStorage.getItem("name") || "Guest Student",
        email: localStorage.getItem("email"), 
        score,
        total: questions.length,
        timeUsed: 600 - time,
      });

      toast.success("Result saved 🎉");
    } catch (err) {
      // Handles the 403 error gracefully if they reached their maximum 2 submissions limit
      if (err.response && err.response.status === 403) {
        toast.error(err.response.data.message || "Max attempt limit reached!");
      } else {
        toast.error("Failed to save result");
      }
    }
  };

  const score = questions.filter(
    (q, i) => answers[i] === q.correct
  ).length;

  const percent = Math.round((score / questions.length) * 100);

  const data = [
    { name: "Correct", value: score },
    { name: "Wrong", value: questions.length - score },
  ];

  const COLORS = ["#16a34a", "#dc2626"];

  /* ================= RESULT ================= */
  if (submitted) {
    return (
      <div className="min-h-screen p-6 pt-24 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">

          <h1 className="text-2xl font-bold text-green-700">
            Exam Result 📊
          </h1>

          <p className="text-gray-500">{examTitle}</p>

          <div className="flex justify-center mt-6">
            <PieChart width={250} height={250}>
              <Pie data={data} dataKey="value" outerRadius={90}>
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </div>

          <div className="text-center mt-4">
            <p className="text-xl font-bold">
              {score} / {questions.length}
            </p>
            <p className="text-green-600 font-semibold">
              {percent}%
            </p>
          </div>

          <button
            onClick={() => navigate("/leaderboard")}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            View Leaderboard 🏆
          </button>
        </div>
      </div>
    );
  }

  /* ================= EXAM ================= */
  return (
    <div className="min-h-screen bg-gray-100 pt-20">

      {/* TOP */}
      <div className="fixed top-0 w-full bg-white shadow flex justify-between items-center px-4 py-3 z-50">
        <button onClick={() => setSidebar(!sidebar)}>
          <FaBars />
        </button>

        <h1 className="font-bold text-green-700">
          {examTitle}
        </h1>

        <div className="flex items-center gap-2 text-green-600 font-semibold">
          <FaClock />
          {formatTime(time)}
        </div>
      </div>

      {/* SIDEBAR */}
      {sidebar && (
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow p-4 pt-20 z-40">
          <h2 className="font-bold mb-3">Questions</h2>

          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`p-2 rounded border text-sm transition-all ${
                  index === i
                    ? "bg-green-600 text-white font-bold"
                    : answers[i]
                    ? "bg-green-200 border-green-400"
                    : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION */}
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">

        <h2 className="mb-3 font-semibold text-gray-700">
          Question {index + 1} of {questions.length}
        </h2>

        <p className="text-lg text-gray-800 font-medium">{questions[index]?.question}</p>

        <div className="mt-4 space-y-3">
          {questions[index]?.options?.map((opt, i) => (
            <div
              key={i}
              onClick={() => selectAnswer(opt)}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                answers[index] === opt
                  ? "bg-green-600 text-white font-semibold border-green-600 shadow"
                  : "hover:bg-gray-50 border-gray-200"
              }`}
            >
              {opt}
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(i - 1, 0))}
            className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-gray-700 px-4 py-2 rounded transition font-medium"
          >
            Prev
          </button>

          <button
            disabled={index === questions.length - 1}
            onClick={() =>
              setIndex((i) =>
                Math.min(i + 1, questions.length - 1)
              )
            }
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded transition font-medium"
          >
            Next
          </button>
        </div>

        <button
          onClick={() => handleSubmit(false)}
          className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold shadow transition"
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
}
