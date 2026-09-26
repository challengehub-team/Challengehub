import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaTrophy, FaCrown, FaMedal } from "react-icons/fa";
import { FiUsers, FiLoader } from "react-icons/fi";

const BACKEND_BASE_URL = "http://localhost:3000";

const PROFILE_URL = `${BACKEND_BASE_URL}/api/profile`;

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUserEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const previousDataMapRef = useRef(new Map());
  const isInitialLoadRef = useRef(true);

  // =========================
  // GET CURRENT USER PROFILE
  // =========================
  const fetchProfile = async () => {
    try {
      const res = await axios.get(PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data.user);

      console.log("Leaderboard profile:", res.data.user);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  // =========================
  // GET LEADERBOARD
  // =========================
  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_BASE_URL}/api/exam/leaderboard`
      );

      const rawData = res.data;

      const ranked = rawData.map((u, i) => ({
        ...u,
        rank: i + 1,
      }));

      // =========================
      // REAL-TIME NOTIFICATIONS
      // =========================
      if (!isInitialLoadRef.current) {
        ranked.forEach((student) => {
          const prev = previousDataMapRef.current.get(student.email);
          const name = student.name || "A student";

          if (!prev) {
            toast.info(`🎉 ${name} joined the leaderboard!`, {
              theme: "light",
              autoClose: 3000,
            });
          } else if (
            prev.percent !== student.percent ||
            prev.timeUsed !== student.timeUsed
          ) {
            toast.success(
              `⚡ ${name} updated their score: ${prev.percent}% → ${student.percent}%`,
              {
                theme: "light",
                autoClose: 3000,
              }
            );
          }
        });
      }

      const map = new Map();

      ranked.forEach((u) => {
        map.set(u.email, u);
      });

      previousDataMapRef.current = map;
      isInitialLoadRef.current = false;

      setData(ranked);
    } catch (err) {
      console.error("Error fetching leaderboard", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {
    fetchProfile();
    fetchLeaderboard();

    const interval = setInterval(fetchLeaderboard, 5000);

    return () => clearInterval(interval);
  }, []);

  const topThree = data.slice(0, 3);

  // =========================
  // PROFILE IMAGE
  // =========================
  const getCurrentUserImage = () => {
    if (!profile) return null;

    return (
      profile.profilePic ||
      profile.photoURL ||
      profile.profileImage ||
      profile.avatar ||
      null
    );
  };

  const currentUserImage = getCurrentUserImage();

  // =========================
  // USER INITIAL
  // =========================
  const getInitial = (user) => {
    return (
      user?.name?.charAt(0)?.toUpperCase() ||
      user?.surname?.charAt(0)?.toUpperCase() ||
      profile?.name?.charAt(0)?.toUpperCase() ||
      profile?.surname?.charAt(0)?.toUpperCase() ||
      "U"
    );
  };

  // =========================
  // PODIUM COLORS
  // =========================
  const podiumColor = (i) => {
    if (i === 0) return "border-green-500 bg-green-50";
    if (i === 1) return "border-green-300 bg-white";
    return "border-green-200 bg-green-50/40";
  };

  // =========================
  // PROFILE AVATAR
  // =========================
  const ProfileAvatar = ({
    user,
    large = false,
  }) => {
    const isCurrentUser = user?.email === currentUserEmail;

    /*
      For YOU:
      Use the image coming from /api/profile.

      For other students:
      If your leaderboard API eventually sends profilePic,
      it will also be used automatically.
    */
    const image =
      isCurrentUser
        ? currentUserImage
        : user?.profilePic ||
          user?.photoURL ||
          user?.profileImage ||
          user?.avatar ||
          null;

    return (
      <div
        className={`${
          large ? "w-16 h-16 text-xl" : "w-8 h-8 text-xs"
        } rounded-full bg-green-600 text-white flex items-center justify-center overflow-hidden flex-shrink-0 font-semibold ${
          large ? "border-4 border-white shadow-sm" : ""
        }`}
      >
        {image ? (
          <img
            src={image}
            alt={user?.name || "Student"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          getInitial(user)
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white pt-24 px-4">
      <ToastContainer />

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
                <FaTrophy />
                Leaderboard
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                Performance rankings across all students
              </p>
            </div>

            <div className="md:justify-self-end">
              <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl font-semibold border border-green-100 w-fit">
                {data.length} Students
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center py-24 text-green-600">
          <FiLoader className="text-3xl animate-spin" />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">

          {/* PODIUM */}
          {topThree.length > 0 && (
            <div className="grid md:grid-cols-3 gap-5 mb-10">
              {topThree.map((u, i) => {
                const isUser = u.email === currentUserEmail;

                return (
                  <div
                    key={u.email}
                    className={`relative rounded-2xl border p-6 text-center shadow-sm transition hover:shadow-md ${podiumColor(
                      i
                    )} ${isUser ? "ring-2 ring-green-400" : ""}`}
                  >
                    {/* MEDAL */}
                    <div className="flex justify-center mb-3">
                      {i === 0 && (
                        <FaCrown className="text-green-600 text-2xl" />
                      )}

                      {i === 1 && (
                        <FaMedal className="text-green-500 text-2xl" />
                      )}

                      {i === 2 && (
                        <FaMedal className="text-green-400 text-2xl" />
                      )}
                    </div>

                    {/* PROFILE IMAGE */}
                    <div className="flex justify-center mb-3">
                      <ProfileAvatar user={u} large />
                    </div>

                    {/* NAME */}
                    <h2 className="font-semibold text-gray-800 truncate">
                      {u.name}
                    </h2>

                    {/* SCORE */}
                    <p className="text-green-700 font-bold mt-1">
                      {u.percent}%
                    </p>

                    {/* TIME */}
                    <p className="text-xs text-gray-500 mt-1">
                      Time: {u.timeUsed}s
                    </p>

                    {/* YOU */}
                    {isUser && (
                      <span className="absolute top-3 right-3 text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                        YOU
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TABLE */}
          <div className="bg-white border border-green-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-green-600 text-white px-4 py-3 flex items-center gap-2 font-semibold">
              <FiUsers />
              Full Rankings
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-green-50 text-green-700">
                  <tr>
                    <th className="p-4 text-left">Rank</th>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Score</th>
                    <th className="p-4 text-left">%</th>
                    <th className="p-4 text-left">Time</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((u) => {
                    const isUser = u.email === currentUserEmail;

                    return (
                      <tr
                        key={u.email}
                        className={`border-t transition ${
                          isUser
                            ? "bg-green-50 font-semibold"
                            : "hover:bg-green-50/40"
                        }`}
                      >
                        {/* RANK */}
                        <td className="p-4 text-gray-600">
                          #{u.rank}
                        </td>

                        {/* NAME + IMAGE */}
                        <td className="p-4 flex items-center gap-2">
                          <ProfileAvatar user={u} />

                          <span className="truncate">
                            {u.name}
                          </span>

                          {isUser && (
                            <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full ml-2">
                              YOU
                            </span>
                          )}
                        </td>

                        {/* SCORE */}
                        <td className="p-4 text-green-700 font-semibold">
                          {u.score}/{u.total}
                        </td>

                        {/* PERCENT */}
                        <td className="p-4">
                          {u.percent}%
                        </td>

                        {/* TIME */}
                        <td className="p-4 text-gray-500">
                          {u.timeUsed}s
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
