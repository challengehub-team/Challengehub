import { useEffect, useState, useRef } from "react";
import axios from "axios";

import {
  FaTrophy,
  FaBell,
  FaCrown,
} from "react-icons/fa";

import {
  FiUsers,
  FiLoader,
  FiClock,
  FiTarget,
  FiAward,
  FiStar,
} from "react-icons/fi";

export default function Leaderboard() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // CURRENT USER
  const currentUserId = localStorage.getItem("userId");

  const prevIds = useRef(new Set());

  // FETCH SCORES
  const fetchScores = async (isFirstLoad = false) => {

    try {

      if (isFirstLoad) {
        setLoading(true);
      }

      const res = await axios.get(
        "http://localhost:5000/api/exam/leaderboard"
      );

      const newData = res.data;

      // NEW ENTRY NOTIFICATION
      if (!isFirstLoad && newData.length > 0) {

        const currentIds = new Set(
          newData.map((item) => item.id)
        );

        const newEntry = newData.find(
          (item) => !prevIds.current.has(item.id)
        );

        if (newEntry) {

          setNotification(
            `${newEntry.name} joined the leaderboard`
          );

          setTimeout(() => {
            setNotification(null);
          }, 4000);
        }

        prevIds.current = currentIds;

      } else if (isFirstLoad) {

        prevIds.current = new Set(
          newData.map((item) => item.id)
        );
      }

      setData(newData);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  // AUTO REFRESH
  useEffect(() => {

    fetchScores(true);

    const timer = setInterval(() => {
      fetchScores(false);
    }, 5000);

    return () => clearInterval(timer);

  }, []);

  // TOP 3
  const topThree = data.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 pt-24">

      {/* LIVE NOTIFICATION */}
      {notification && (

        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">

          <FaBell />

          <span className="font-semibold">
            {notification}
          </span>

        </div>
      )}

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8">

        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            <div>

              <h1 className="text-4xl font-black text-gray-800 flex items-center gap-4">

                <div className="bg-yellow-100 p-4 rounded-2xl">
                  <FaTrophy className="text-yellow-500 text-3xl" />
                </div>

                Leaderboard

              </h1>

              <p className="text-gray-500 mt-3 text-lg">
                Top performing students ranked by score and time.
              </p>

            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-5 rounded-3xl shadow-lg text-center">

              <p className="text-sm opacity-80">
                Active Participants
              </p>

              <h2 className="text-4xl font-black">
                {data.length}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* TOP 3 PODIUM */}
      {!loading && topThree.length > 0 && (

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 mb-10">

          {topThree.map((user, index) => {

            const isCurrentUser =
              user.uid === currentUserId;

            return (

              <div
                key={user.id}
                className={`relative rounded-[2rem] p-8 shadow-xl border overflow-hidden ${
                  index === 0
                    ? "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white border-yellow-300"
                    : index === 1
                    ? "bg-gradient-to-br from-slate-200 to-slate-300 border-slate-200"
                    : "bg-gradient-to-br from-orange-300 to-orange-400 border-orange-300"
                }`}
              >

                {/* CURRENT USER BADGE */}
                {isCurrentUser && (

                  <div className="absolute top-4 right-4 bg-black text-white text-xs px-3 py-1 rounded-full font-bold">
                    YOU
                  </div>

                )}

                {/* RANK */}
                <div className="flex justify-center mb-5">

                  <div className="bg-white/20 backdrop-blur-md p-5 rounded-full">

                    {index === 0 ? (
                      <FaCrown className="text-5xl" />
                    ) : (
                      <FiAward className="text-5xl" />
                    )}

                  </div>

                </div>

                {/* USER */}
                <div className="text-center">

                  <h2 className="text-2xl font-black">
                    {user.name}
                  </h2>

                  <p className="mt-2 opacity-90">
                    Rank #{user.rank}
                  </p>

                </div>

                {/* STATS */}
                <div className="mt-8 grid grid-cols-2 gap-4">

                  <div className="bg-white/20 rounded-2xl p-4 text-center">

                    <FiTarget className="mx-auto mb-2 text-2xl" />

                    <p className="text-sm opacity-80">
                      Score
                    </p>

                    <h3 className="text-2xl font-black">
                      {user.percent}%
                    </h3>

                  </div>

                  <div className="bg-white/20 rounded-2xl p-4 text-center">

                    <FiClock className="mx-auto mb-2 text-2xl" />

                    <p className="text-sm opacity-80">
                      Time
                    </p>

                    <h3 className="text-2xl font-black">
                      {user.timeUsed}s
                    </h3>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* MAIN TABLE */}
      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">

        {/* TABLE HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FiUsers />
              Student Rankings
            </h2>

            <p className="text-blue-100 mt-1">
              Live leaderboard updates every 5 seconds
            </p>

          </div>

          <div className="hidden md:flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">

            <FiStar />

            <span className="font-semibold">
              Live Rankings
            </span>

          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="flex flex-col items-center justify-center py-24">

            <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">

              <FiLoader className="text-5xl text-blue-600 animate-spin" />

            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Loading Leaderboard
            </h2>

            <p className="text-gray-500 mt-2">
              Fetching latest rankings...
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">

                  <th className="px-6 py-5 text-left">
                    Rank
                  </th>

                  <th className="px-6 py-5 text-left">
                    Student
                  </th>

                  <th className="px-6 py-5 text-left">
                    Score
                  </th>

                  <th className="px-6 py-5 text-left">
                    Percentage
                  </th>

                  <th className="px-6 py-5 text-left">
                    Time Used
                  </th>

                </tr>

              </thead>

              <tbody>

                {data.map((u, i) => {

                  const isCurrentUser =
                    u.uid === currentUserId;

                  return (

                    <tr
                      key={u.id}
                      className={`border-b transition-all ${
                        isCurrentUser
                          ? "bg-blue-50 border-blue-200 scale-[1.01]"
                          : "hover:bg-gray-50"
                      }`}
                    >

                      {/* RANK */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          {u.rank === 1 ? (
                            <div className="bg-yellow-100 p-2 rounded-xl">
                              <FaCrown className="text-yellow-500" />
                            </div>
                          ) : (
                            <div className="bg-gray-100 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-gray-700">
                              {u.rank}
                            </div>
                          )}

                        </div>

                      </td>

                      {/* NAME */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white ${
                            isCurrentUser
                              ? "bg-gradient-to-r from-blue-600 to-indigo-700"
                              : "bg-gradient-to-r from-gray-500 to-gray-700"
                          }`}>

                            {u.name?.charAt(0)}

                          </div>

                          <div>

                            <h3 className={`font-bold ${
                              isCurrentUser
                                ? "text-blue-700"
                                : "text-gray-800"
                            }`}>

                              {u.name}

                              {isCurrentUser && (
                                <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                                  YOU
                                </span>
                              )}

                            </h3>

                            <p className="text-sm text-gray-500">
                              Student
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* SCORE */}
                      <td className="px-6 py-5">

                        <div className="font-bold text-gray-800">
                          {u.score}/{u.total}
                        </div>

                      </td>

                      {/* PERCENT */}
                      <td className="px-6 py-5">

                        <div className={`inline-flex items-center px-4 py-2 rounded-xl font-bold ${
                          u.percent >= 80
                            ? "bg-green-100 text-green-700"
                            : u.percent >= 50
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}>

                          {u.percent}%

                        </div>

                      </td>

                      {/* TIME */}
                      <td className="px-6 py-5 text-gray-600 font-medium">

                        {u.timeUsed}s

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}