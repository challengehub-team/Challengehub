import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import {
  FaUser,
  FaEnvelope,
  FaCreditCard,
  FaBrain,
  FaBook,
  FaList,
  FaBookOpen,
} from "react-icons/fa";

import { FiBarChart2, FiTrendingUp, FiClock } from "react-icons/fi";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchDashboard = async () => {
    setLoading(true);

    try { 
      const res = await axios.get("http://localhost:3000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data.user);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("name", res.data.user.surname);

      console.log(res.data.user)

      toast.success("Welcome back 👋", {
        style: {
          background: "#fff",
          color: "#111",
          borderLeft: "5px solid #22c55e",
        },
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unauthorized access", {
        style: {
          background: "#fff",
          color: "#111",
          borderLeft: "5px solid #ef4444",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <p className="animate-pulse text-gray-500">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500">No user found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 mt-12">

      <div className="max-w-6xl mx-auto space-y-8">

        {/* ================= HERO ================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-r from-green-600 via-green-700 to-emerald-800 text-white rounded-3xl p-8 shadow-xl"
        >
          <div className="absolute right-0 top-0 opacity-10 text-[140px]">
            🤖
          </div>

          <h1 className="text-3xl md:text-4xl font-black">
            Welcome back, {user.surname}
          </h1>

          <p className="mt-2 text-green-100">
            AI-powered Student Dashboard — ChallengeHub Intelligence System
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs">
            <span className="bg-white/20 px-3 py-1 rounded-full">
              Smart Analytics Active
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              Secure Session
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              Real-time Sync
            </span>
          </div>
        </motion.div>

        {/* ================= USER CARDS ================= */}
        <div className="grid md:grid-cols-3 gap-5">

          <Card icon={<FaUser />} title="Surname" value={user.surname} />
          <Card icon={<FaUser />} title="Other Names" value={user.othernames} />
          <Card icon={<FaEnvelope />} title="Email" value={user.email} />
          <Card icon={<FaList />} title="Category" value={user.category} />

          <Card
            icon={<FaCreditCard />}
            title="Payment"
            value={user.paymentStatus}
            color={
              user.paymentStatus === "paid"
                ? "bg-green-50"
                : "bg-red-50"
            }
          />

          <Card
            icon={<FaBook />}
            title="Quiz Status"
            value={user.hasTakenQuiz ? "Completed" : "Not Started"}
            color={user.hasTakenQuiz ? "bg-blue-50" : "bg-yellow-50"}
          />
        </div>

        {/* ================= ACADEMIC OVERVIEW ================= */}
        <div className="bg-white border border-green-100 rounded-3xl p-6 shadow-sm">

          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-6">
            <FaBookOpen className="text-green-600" />
            Learning Overview
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <StatCard icon={FiBarChart2} label="Exams Taken" value={user.examsTaken || 0} />
            <StatCard icon={FiTrendingUp} label="Average Score" value={`${user.avgScore || 0}%`} />
            <StatCard icon={FiClock} label="Total Study Time" value={`${user.totalTime || 0}s`} />
          </div>
        </div>

        {/* ================= AI INSIGHT ================= */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white p-6 rounded-3xl shadow border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <FaBrain className="text-green-600 text-xl" />
            <h2 className="font-bold text-lg">AI Performance Insight</h2>
          </div>

          <p className="text-gray-600 leading-7">
            {user.hasTakenQuiz
              ? "Great job! You’ve completed your assessment. Keep improving to reach top rankings."
              : "You haven't taken the quiz yet. Start now to unlock ranking and AI feedback insights."}
          </p>
        </motion.div>

        {/* ================= PROFILE ================= */}
        <div className="bg-white p-6 rounded-3xl shadow border border-gray-100">

          <h2 className="font-semibold mb-5 text-gray-700">
            Profile Details
          </h2>

          <div className="grid md:grid-cols-3 gap-4 text-sm">

            <Info label="Surname" value={user.surname} />
            <Info label="Other Names" value={user.otherNames} />
            <Info label="Category" value={user.category} />
            <Info label="Role" value={user.role} />

          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= CARD ================= */
function Card({ icon, title, value, color = "bg-white" }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`${color} p-5 rounded-2xl shadow-sm border border-gray-100`}
    >
      <div className="flex items-center gap-2 text-gray-600 text-sm">
        {icon}
        <span>{title}</span>
      </div>

      <p className="font-bold text-lg mt-2 text-gray-900">
        {value}
      </p>
    </motion.div>
  );
}

/* ================= INFO ================= */
function Info({ label, value }) {
  return (
    <div className="p-3 border rounded-xl bg-gray-50">
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
}

/* ================= STATS ================= */
const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-green-50 border border-green-100 rounded-2xl p-5 text-center">
    <Icon className="mx-auto text-green-600 text-2xl mb-2" />
    <p className="text-sm text-gray-500">{label}</p>
    <h3 className="text-xl font-bold text-gray-800">{value}</h3>
  </div>
);