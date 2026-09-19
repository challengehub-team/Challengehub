import { useLocation, useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

import {
  FiCheckCircle,
  FiXCircle,
  FiBarChart2,
  FiFileText,
  FiAward,
  FiHome,
  FiThumbsUp,
  FiSmile,
  FiAlertCircle,
} from "react-icons/fi";

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { questions, currentAnswers } = state;

  let correct = 0;

  questions.forEach((q, i) => {
    if (currentAnswers[i] === q.correct_answer) {
      correct++;
    }
  });

  const percent = Math.round((correct / questions.length) * 100);
  const wrong = questions.length - correct;

  const getRemark = () => {
    if (percent >= 80) {
      return {
        text: "Excellent Performance",
        icon: <FiAward className="text-yellow-500" />,
        color: "text-yellow-600",
        bg: "bg-yellow-100",
      };
    }
    if (percent >= 60) {
      return {
        text: "Good Job",
        icon: <FiThumbsUp className="text-blue-500" />,
        color: "text-blue-600",
        bg: "bg-blue-100",
      };
    }
    if (percent >= 40) {
      return {
        text: "Fair Attempt",
        icon: <FiSmile className="text-green-500" />,
        color: "text-green-600",
        bg: "bg-green-100",
      };
    }
    return {
      text: "Needs Improvement",
      icon: <FiAlertCircle className="text-red-500" />,
      color: "text-red-600",
      bg: "bg-red-100",
    };
  };

  const remark = getRemark();

  const data = {
    labels: ["Correct", "Wrong"],
    datasets: [
      {
        data: [correct, wrong],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 p-3 sm:p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6 sm:mb-10">
        <div className="bg-white/80 backdrop-blur rounded-2xl sm:rounded-3xl shadow-lg border p-4 sm:p-6">

          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">

            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-gray-800 flex items-center gap-2 sm:gap-3">
                <FiAward className="text-yellow-500" />
                Exam Results
              </h1>

              <p className="text-xs sm:text-base text-gray-500 mt-1 sm:mt-2">
                Performance breakdown and analysis
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-5 sm:px-8 py-3 sm:py-5 rounded-2xl sm:rounded-3xl text-center shadow-lg">
              <p className="text-xs sm:text-sm opacity-80">Final Score</p>
              <h2 className="text-2xl sm:text-4xl font-black">{percent}%</h2>
            </div>

          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-10">

        {/* TOTAL */}
        <div className="bg-white rounded-xl sm:rounded-3xl p-4 sm:p-5 shadow border">
          <p className="text-xs sm:text-sm text-gray-500">Total</p>
          <h2 className="text-lg sm:text-3xl font-bold">{questions.length}</h2>
        </div>

        {/* CORRECT */}
        <div className="bg-white rounded-xl sm:rounded-3xl p-4 sm:p-5 shadow border">
          <p className="text-xs sm:text-sm text-gray-500">Correct</p>
          <h2 className="text-lg sm:text-3xl font-bold text-green-600">{correct}</h2>
        </div>

        {/* WRONG */}
        <div className="bg-white rounded-xl sm:rounded-3xl p-4 sm:p-5 shadow border">
          <p className="text-xs sm:text-sm text-gray-500">Wrong</p>
          <h2 className="text-lg sm:text-3xl font-bold text-red-500">{wrong}</h2>
        </div>

        {/* REMARK */}
        <div className="bg-white rounded-xl sm:rounded-3xl p-4 sm:p-5 shadow border">
          <p className="text-xs sm:text-sm text-gray-500 mb-2">Remark</p>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm ${remark.bg}`}>
            {remark.icon}
            <span className={`font-semibold ${remark.color}`}>
              {remark.text}
            </span>
          </div>
        </div>

      </div>

      {/* CHART + SUMMARY */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-5 sm:gap-8 mb-8">

        {/* CHART */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow p-4 sm:p-6">
          <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">
            Performance
          </h2>

          <div className="max-w-[220px] sm:max-w-sm mx-auto">
            <Pie data={data} />
          </div>
        </div>

        {/* SUMMARY */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-2xl sm:rounded-3xl shadow p-5 sm:p-8">

          <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">
            Summary
          </h2>

          <div className="space-y-3 sm:space-y-4 text-xs sm:text-base">

            <div className="flex justify-between bg-white/10 p-3 sm:p-4 rounded-xl">
              <span>Total</span>
              <span className="font-bold">{questions.length}</span>
            </div>

            <div className="flex justify-between bg-white/10 p-3 sm:p-4 rounded-xl">
              <span>Correct</span>
              <span className="font-bold">{correct}</span>
            </div>

            <div className="flex justify-between bg-white/10 p-3 sm:p-4 rounded-xl">
              <span>Wrong</span>
              <span className="font-bold">{wrong}</span>
            </div>

            <div className="flex justify-between bg-white/10 p-3 sm:p-4 rounded-xl">
              <span>Accuracy</span>
              <span className="font-bold">{percent}%</span>
            </div>

          </div>

          <div className={`mt-5 sm:mt-8 flex items-center gap-2 sm:gap-3 px-4 py-3 sm:py-4 rounded-xl bg-white ${remark.bg}`}>
            {remark.icon}
            <span className={`font-bold text-xs sm:text-base ${remark.color}`}>
              {remark.text}
            </span>
          </div>

        </div>

      </div>

      {/* QUESTIONS */}
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">

        {questions.map((q, i) => {
          const correctAns = q.correct_answer;
          const userAns = currentAnswers[i];
          const isCorrect = correctAns === userAns;

          return (
            <div
              key={i}
              className={`rounded-2xl sm:rounded-3xl border p-4 sm:p-6 shadow ${
                isCorrect ? "bg-green-50" : "bg-red-50"
              }`}
            >

              <h3
                className="text-sm sm:text-lg font-bold mb-4"
                dangerouslySetInnerHTML={{ __html: q.question }}
              />

              <div className="text-xs sm:text-base space-y-3">

                <div className="bg-white p-3 sm:p-4 rounded-xl">
                  <p className="text-gray-500 text-xs sm:text-sm">Your Answer</p>
                  <p className={isCorrect ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                    {userAns || "No answer"}
                  </p>
                </div>

                {!isCorrect && (
                  <div className="bg-white p-3 sm:p-4 rounded-xl">
                    <p className="text-gray-500 text-xs sm:text-sm">Correct Answer</p>
                    <p className="text-green-600 font-bold">
                      {correctAns}
                    </p>
                  </div>
                )}

              </div>

            </div>
          );
        })}

      </div>

      {/* FOOTER */}
      <div className="max-w-6xl mx-auto mt-8 sm:mt-12">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">

          <h2 className="text-lg sm:text-3xl font-bold">
            Score: {percent}%
          </h2>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold flex items-center gap-2"
          >
            <FiHome />
            Dashboard
          </button>

        </div>
      </div>

    </div>
  );
};

export default Results;