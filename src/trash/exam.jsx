import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaClock, FaBars } from "react-icons/fa";
import { PieChart, Pie, Cell } from "recharts";
import { useLocation, useNavigate } from "react-router-dom";

export default function ExamPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { category, subject, difficulty } = state || {};

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(600);
  const [submitted, setSubmitted] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const examTitle = `${category} ${subject} CBT - ${difficulty}`;

  /* 🚫 PROTECT ROUTE */
  useEffect(() => {
    if (!category) navigate("/");
  }, []);

  /* 📥 FETCH QUESTIONS */
  useEffect(() => {
    const fetchQ = async () => {
      const res = await axios.get(
        "https://opentdb.com/api.php?amount=15&type=multiple"
      );

      const data = res.data.results.map((q) => ({
        question: q.question,
        correct: q.correct_answer,
        options: [...q.incorrect_answers, q.correct_answer].sort(
          () => Math.random() - 0.5
        ),
      }));

      setQuestions(data);
    };

    fetchQ();
  }, []);

  /* ⏱ TIMER */
  useEffect(() => {
    if (submitted) return;

    if (time === 0) {
      toast.error("Time up!");
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, submitted]);

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const selectAnswer = (opt) => {
    setAnswers((prev) => ({ ...prev, [index]: opt }));
  };

  /* ✅ SUBMIT WITH CONFIRM */
  const handleSubmit = () => {
    const confirm = window.confirm("Submit exam?");
    if (!confirm) return;

    setSubmitted(true);
    toast.success("Submitted!");
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

  /* ================= RESULT PAGE ================= */
  if (submitted) {
    return (
      <div className="min-h-screen p-6 pt-24 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">

          <h1 className="text-2xl font-bold text-green-700">
            Exam Result
          </h1>

          <p className="text-gray-500">{examTitle}</p>

          {/* CHART */}
          <div className="flex justify-center mt-6">
            <PieChart width={250} height={250}>
              <Pie data={data} dataKey="value" outerRadius={90}>
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* STATS */}
          <div className="text-center mt-4 space-y-2">
            <p className="text-xl font-bold">
              {score} / {questions.length}
            </p>
            <p className="text-green-600 font-semibold">
              {percent}% Score
            </p>
          </div>

          {/* REVIEW */}
          <div className="mt-6 space-y-4">
            {questions.map((q, i) => (
              <div key={i} className="border p-3 rounded-lg">
                <p className="font-semibold">{q.question}</p>

                <p className="text-sm text-gray-600">
                  Your: {answers[i] || "Not answered"}
                </p>

                <p className="text-green-600 text-sm">
                  Correct: {q.correct}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  /* ================= EXAM PAGE ================= */
  return (
    <div className="min-h-screen bg-gray-100 pt-20">

      {/* TOP BAR */}
      <div className="fixed top-0 w-full bg-white shadow flex justify-between items-center px-4 py-3 z-50">

        <button onClick={() => setSidebar(!sidebar)}>
          <FaBars size={18} />
        </button>

        <h1 className="font-bold text-green-700 text-sm md:text-base">
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
                className={`p-2 rounded border text-sm ${
                  index === i
                    ? "bg-green-600 text-white"
                    : answers[i]
                    ? "bg-green-200"
                    : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION CARD */}
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">

        <h2 className="font-semibold mb-4">
          Question {index + 1} of {questions.length}
        </h2>

        <p className="mb-4">{questions[index]?.question}</p>

        {/* OPTIONS */}
        <div className="space-y-3">
          {questions[index]?.options?.map((opt, i) => (
            <div
              key={i}
              onClick={() => selectAnswer(opt)}
              className={`p-3 border rounded-lg cursor-pointer transition ${
                answers[index] === opt
                  ? "bg-green-600 text-white border-green-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {opt}
            </div>
          ))}
        </div>

        {/* NAV */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setIndex((i) => Math.max(i - 1, 0))}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Prev
          </button>

          <button
            onClick={() =>
              setIndex((i) => Math.min(i + 1, questions.length - 1))
            }
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Next
          </button>
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-red-500 text-white py-3 rounded-lg"
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
}