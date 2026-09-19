import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiUser,
  FiMail,
  FiBarChart2,
  FiClock,
  FiAward,
  FiTrendingUp,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
  FiBookOpen,
  FiTarget,
  FiActivity,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { FaBook, FaCreditCard, FaEnvelope, FaList, FaLocationArrow, FaMapPin, FaUser } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(res.data.user);
      console.log(res.data.user);

      toast.success("Welcome back 👋", {
        style: {
          background: "#fff",
          color: "#111",
          borderLeft: "5px solid #22c55e",
        },
      });
    } catch (err) {
      toast.error("Unauthorized access");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 text-green-600">
        Loading student dashboard...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        No student found
      </div>
    );
  }

  // Safely grab the uploaded image string from your user object model
  const currentAvatarUrl = user.profilePic || user.photoURL;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 pt-24">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white border border-green-100 rounded-3xl shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">

            {/* 🖼️ CIRCULAR AVATAR DISPLAY (VIEW ONLY) */}
            <div className="w-20 h-20 rounded-full bg-green-100 border-2 border-green-600 overflow-hidden flex items-center justify-center text-green-700 text-2xl font-bold shadow-sm flex-shrink-0">
              {currentAvatarUrl ? (
                <img src={currentAvatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user.surname?.charAt(0) || user.name?.charAt(0) || "U"
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-500 flex items-center justify-center sm:justify-start gap-2 text-sm mt-1">
                <FiMail /> {user.email}
              </p>
            </div>
          </div>

          <div className="mt-4 md:mt-0 bg-green-600 text-white px-5 py-3 rounded-2xl text-center min-w-[140px]">
            <p className="text-xs opacity-80">Student Status</p>
            <p className="font-bold">
              {user.paymentStatus === "paid" ? "Active Learner" : "Inactive"}
            </p>
          </div>
        </div>



        {/* QUICK INFO */}
        <div className="grid md:grid-cols-3 gap-4">
          <InfoCard icon={FaUser} label="Phone" value={user.surname} />
          <InfoCard icon={FaUser} label="State" value={user.othernames} />
          <InfoCard icon={FaEnvelope} label="Email" value={user.email} />
          <InfoCard icon={FaList} label="Category" value={user.category} />
          <InfoCard icon={FaCreditCard} label="Paid" value={user.paymentStatus} />
          <InfoCard icon={FaBook} label="HasTaken" value={user.hasTakenQuiz} />
          <InfoCard icon={FiMapPin} label="State" value={user.state} />
          <InfoCard icon={FiMapPin} label="LGA" value={user.lga} />
          <InfoCard icon={FiMapPin} label="Role" value={user.role} />
        </div>

        {/* ACADEMIC STATS */}
        <div className="bg-white border border-green-100 rounded-3xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
            <FiBookOpen />
            Learning Overview
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <StatCard icon={FiBarChart2} label="Exams Taken" value={user.examsTaken || 0} />
            <StatCard icon={FiTrendingUp} label="Average Score" value={`${user.avgScore || 0}%`} />
            <StatCard icon={FiClock} label="Total Study Time" value={`${user.totalTime || 0}s`} />
          </div>
        </div>

        {/* PERFORMANCE INSIGHT */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-3xl shadow-lg">
          <div className="flex items-center gap-3">
            <FiTarget className="text-2xl" />
            <h2 className="text-xl font-bold">Performance Insight</h2>
          </div>
          <p className="mt-3 text-sm opacity-90">
            {user.avgScore >= 70
              ? "Excellent performance — you're mastering your studies 🚀"
              : user.avgScore >= 50
                ? "Good progress — keep practicing to improve 📈"
                : "You need more practice — consistency is key 📚"}
          </p>
        </div>

      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white border border-green-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
    <div className="flex items-center gap-2 text-green-600 mb-2">
      <Icon />
      <p className="text-xs uppercase tracking-wider">{label}</p>
    </div>
    <p className="text-gray-800 font-semibold">{value || "N/A"}</p>
  </div>
);

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-green-50 border border-green-100 rounded-2xl p-5 text-center">
    <Icon className="mx-auto text-green-600 text-2xl mb-2" />
    <p className="text-sm text-gray-500">{label}</p>
    <h3 className="text-xl font-bold text-gray-800">{value}</h3>
  </div>
);



export default Profile;
