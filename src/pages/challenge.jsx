import { useState } from "react";
import { FiPlay, FiShield, FiClock, FiAlertTriangle, FiAward } from "react-icons/fi";
import { FaBrain } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChallengePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const startExam = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("/exam"); // adjust route if needed
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br my-12 from-emerald-50 via-white to-green-50 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white text-center">

          <div className="flex justify-center mb-3">
            <div className="bg-white/20 p-4 rounded-2xl">
              <FaBrain className="text-3xl" />
            </div>
          </div>

          <h1 className="text-3xl font-bold">
            Exam Challenge
          </h1>

          <p className="text-green-100 mt-2">
            Welcome to your official assessment environment
          </p>

        </div>

        {/* BODY */}
        <div className="p-8 space-y-6">

          {/* INFO CARDS */}
          <div className="grid sm:grid-cols-3 gap-4">

            <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-center">
              <FiClock className="mx-auto text-green-600 text-2xl mb-2" />
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-bold text-green-700">5 Minutes</p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-center">
              <FiAward className="mx-auto text-green-600 text-2xl mb-2" />
              <p className="text-sm text-gray-500">Questions</p>
              <p className="font-bold text-green-700">Multiple Choice</p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-2xl p-4 text-center">
              <FiShield className="mx-auto text-green-600 text-2xl mb-2" />
              <p className="text-sm text-gray-500">Security</p>
              <p className="font-bold text-green-700">Full Monitoring</p>
            </div>

          </div>

          {/* RULES */}
          <div className="bg-gray-50 border rounded-2xl p-5">

            <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <FiAlertTriangle className="text-orange-500" />
              Exam Rules
            </h2>

            <ul className="text-sm text-gray-600 space-y-2 list-disc ml-5">
              <li>Do not switch tabs during the exam</li>
              <li>Full-screen mode is required</li>
              <li>Timer starts immediately after clicking start</li>
              <li>Answers are auto-submitted when time ends</li>
            </ul>

          </div>

          {/* WARNING BANNER */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-sm text-yellow-700">
            ⚠️ This is a monitored exam environment. Any suspicious activity will be recorded.
          </div>

          {/* START BUTTON */}
          <button
            onClick={startExam}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all"
          >
            {loading ? (
              "Starting..."
            ) : (
              <>
                <FiPlay />
                Start Exam
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
};

export default ChallengePage;