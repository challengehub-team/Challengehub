import { useEffect, useState } from "react";
import axios from "axios";

import {
  FiUser,
  FiMail,
  FiBarChart2,
  FiClock,
  FiTrendingUp,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
  FiBookOpen,
  FiTarget,
  FiBriefcase,
  FiUnlock,
  FiLock,
  FiList,
} from "react-icons/fi";

import toast from "react-hot-toast";

const API_BASE_URL = "http://localhost:3000";

const PROFILE_URL = `${API_BASE_URL}/api/profile`;
const RESULT_URL = `${API_BASE_URL}/api/exam/condensed-result`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resultLoading, setResultLoading] = useState(true);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  /* =========================================================
     FETCH PROFILE
  ========================================================= */

  const fetchProfile = async () => {
    try {
      const res = await axios.get(PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const profileUser = res.data.user;

      setUser(profileUser);

      /*
       * Keep localStorage synchronized with the profile.
       */
      if (profileUser?.email) {
        localStorage.setItem("email", profileUser.email);
      }

      if (profileUser?.name) {
        localStorage.setItem("name", profileUser.name);
      } else if (profileUser?.surname) {
        localStorage.setItem("name", profileUser.surname);
      }
    } catch (err) {
      console.error("Profile error:", err);

      toast.error(
        err?.response?.data?.message ||
          "Unable to load your profile.",
        {
          style: {
            background: "#fff",
            color: "#111",
            borderLeft: "5px solid #ef4444",
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     FETCH CONDENSED EXAM RESULT
     
     Expected backend response:

     {
       "success": true,
       "score": 3,
       "timeUsed": "0:17",
       "numberOfTestsTaken": 2
     }
  ========================================================= */

  const fetchExamResult = async () => {
    setResultLoading(true);

    try {
      const currentEmail =
        localStorage.getItem("email") || email;

      /*
       * Send both authorization and email.
       *
       * This works whether your backend gets the student
       * identity from the token or from req.query.email.
       */

      const res = await axios.get(RESULT_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: currentEmail
          ? {
              email: currentEmail,
            }
          : {},
      });

      console.log("Condensed exam result:", res.data);

      if (res.data?.success) {
        setResult(res.data);
      } else {
        /*
         * Backend responded successfully but there is
         * currently no exam result.
         */
        setResult({
          success: false,
          score: 0,
          timeUsed: "0:00",
          numberOfTestsTaken: 0,
        });
      }
    } catch (err) {
      console.error(
        "Condensed exam result error:",
        err
      );

      /*
       * Do not break the profile page if the result API
       * is unavailable or the student has no result yet.
       */

      setResult({
        success: false,
        score: 0,
        timeUsed: "0:00",
        numberOfTestsTaken: 0,
      });
    } finally {
      setResultLoading(false);
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    fetchProfile();
    fetchExamResult();
  }, []);

  /* =========================================================
     LOADING SCREEN
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 text-green-600">
        Loading student dashboard...
      </div>
    );
  }

  /* =========================================================
     NO USER
  ========================================================= */

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        No student found
      </div>
    );
  }

  /* =========================================================
     AVATAR
  ========================================================= */

  const currentAvatarUrl =
    user.profilePic || user.photoURL;

  /* =========================================================
     EXAM STAT VALUES
  ========================================================= */

  const examsTaken =
    result?.numberOfTestsTaken ?? 0;

  const score =
    result?.score ?? 0;

  const timeUsed =
    result?.timeUsed || "0:00";

  /*
   * Your API currently returns `score` directly.
   *
   * If score is already a percentage, this displays:
   * 3%
   *
   * If your backend later returns the actual percentage,
   * no frontend change is required.
   */

  const displayedScore = `${score}%`;

  /* =========================================================
     PERFORMANCE MESSAGE
  ========================================================= */

  const getPerformanceMessage = () => {
    if (resultLoading) {
      return "Loading your latest examination performance...";
    }

    if (examsTaken === 0) {
      return "You haven't completed an examination yet. Start your challenge to begin building your performance record 📚";
    }

    if (score >= 70) {
      return "Excellent performance — you're making strong progress 🚀";
    }

    if (score >= 50) {
      return "Good progress — keep practicing to improve your performance 📈";
    }

    return "Keep practicing and reviewing your corrections. Consistency is the key to improving your score 📚";
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 pt-24">

      <div className="max-w-6xl mx-auto space-y-6">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="bg-white border border-green-100 rounded-3xl shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">

            {/* AVATAR */}

            <div className="w-20 h-20 rounded-full bg-green-100 border-2 border-green-600 overflow-hidden flex items-center justify-center text-green-700 text-2xl font-bold shadow-sm flex-shrink-0">

              {currentAvatarUrl ? (
                <img
                  src={currentAvatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                user.surname?.charAt(0) ||
                user.name?.charAt(0) ||
                "U"
              )}

            </div>

            <div>

              <h1 className="text-2xl font-bold text-gray-800">
                {user.name ||
                  `${user.surname || ""} ${
                    user.otherNames || ""
                  }`.trim() ||
                  "Student"}
              </h1>

              <p className="text-gray-500 flex items-center justify-center sm:justify-start gap-2 text-sm mt-1">
                <FiMail />
                {user.email}
              </p>

            </div>

          </div>

          {/* STATUS */}

          <div className="mt-4 md:mt-0 bg-green-600 text-white px-5 py-3 rounded-2xl text-center min-w-[140px]">

            <p className="text-xs opacity-80">
              Student Status
            </p>

            <p className="font-bold">
              {user.paymentStatus === "paid"
                ? "Active Learner"
                : "Inactive"}
            </p>

          </div>

        </div>

        {/* =================================================
            QUICK INFO
        ================================================= */}

        <div className="grid md:grid-cols-3 gap-4">

          <InfoCard
            icon={FiUser}
            label="Surname"
            value={user.surname}
          />

          <InfoCard
            icon={FiUser}
            label="Other Names"
            value={user.otherNames}
          />

          <InfoCard
            icon={FiPhone}
            label="Phone"
            value={user.phone}
          />

          <InfoCard
            icon={FiMail}
            label="Email"
            value={user.email}
          />

          <InfoCard
            icon={FiList}
            label="Category"
            value={user.category}
          />

          <InfoCard
            icon={FiBookOpen}
            label="School"
            value={user.school}
          />

          <InfoCard
            icon={FiBriefcase}
            label="Role"
            value={user.role}
          />

          {/* Location */}

          <InfoCard
            icon={FiMapPin}
            label="State"
            value={user.state}
          />

          <InfoCard
            icon={FiMapPin}
            label="LGA"
            value={user.lga}
          />

          {/* Quiz */}

          <InfoCard
            icon={FiCheckCircle}
            label="Quiz Taken"
            value={
              user.hasTakenQuiz
                ? "Completed"
                : "Not Started"
            }
          />

          {/* Challenge */}

          <InfoCard
            icon={
              user.canTakeChallenge
                ? FiUnlock
                : FiLock
            }
            label="Challenge Access"
            value={
              user.canTakeChallenge
                ? "Unlocked"
                : "Locked"
            }
          />

        </div>

        {/* =================================================
            ACADEMIC STATS
        ================================================= */}

        <div className="bg-white border border-green-100 rounded-3xl p-6 shadow-sm">

          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">

            <FiBookOpen />

            Learning Overview

          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            {/* EXAMS TAKEN */}

            <StatCard
              icon={FiBarChart2}
              label="Exams Taken"
              value={
                resultLoading
                  ? "..."
                  : examsTaken
              }
            />

            {/* SCORE */}

            <StatCard
              icon={FiTrendingUp}
              label="Average Score"
              value={
                resultLoading
                  ? "..."
                  : displayedScore
              }
            />

            {/* TIME */}

            <StatCard
              icon={FiClock}
              label="Total Study Time"
              value={
                resultLoading
                  ? "..."
                  : timeUsed
              }
            />

          </div>

        </div>

        {/* =================================================
            PERFORMANCE INSIGHT
        ================================================= */}

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-3xl shadow-lg">

          <div className="flex items-center gap-3">

            <FiTarget className="text-2xl" />

            <h2 className="text-xl font-bold">
              Performance Insight
            </h2>

          </div>

          <p className="mt-3 text-sm opacity-90">
            {getPerformanceMessage()}
          </p>

          {/* RESULT SUMMARY */}

          {!resultLoading &&
            examsTaken > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">

                <div className="bg-white/15 rounded-xl px-4 py-3">

                  <p className="text-xs opacity-70">
                    Tests Completed
                  </p>

                  <p className="font-bold text-lg">
                    {examsTaken}
                  </p>

                </div>

                <div className="bg-white/15 rounded-xl px-4 py-3">

                  <p className="text-xs opacity-70">
                    Score
                  </p>

                  <p className="font-bold text-lg">
                    {displayedScore}
                  </p>

                </div>

                <div className="bg-white/15 rounded-xl px-4 py-3">

                  <p className="text-xs opacity-70">
                    Latest Time
                  </p>

                  <p className="font-bold text-lg">
                    {timeUsed}
                  </p>

                </div>

              </div>
            )}

        </div>

      </div>

    </div>
  );
};

/* =========================================================
   INFO CARD
========================================================= */

const InfoCard = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="bg-white border border-green-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

    <div className="flex items-center gap-2 text-green-600 mb-2">

      <Icon />

      <p className="text-xs uppercase tracking-wider">
        {label}
      </p>

    </div>

    <p className="text-gray-800 font-semibold">
      {value || "N/A"}
    </p>

  </div>
);

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="bg-green-50 border border-green-100 rounded-2xl p-5 text-center">

    <Icon className="mx-auto text-green-600 text-2xl mb-2" />

    <p className="text-sm text-gray-500">
      {label}
    </p>

    <h3 className="text-xl font-bold text-gray-800">
      {value}
    </h3>

  </div>
);

export default Profile;
