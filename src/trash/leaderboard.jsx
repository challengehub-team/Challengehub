import { useEffect, useState, useRef } from "react";
import axios from "axios";

import { FaTrophy, FaCrown, FaMedal } from "react-icons/fa";
import { FiUsers, FiLoader } from "react-icons/fi";

const API_BASE_URL = "http://localhost:3000";

const LEADERBOARD_URL = `${API_BASE_URL}/api/exam/leaderboard`;
const PROFILE_URL = `${API_BASE_URL}/api/profile`;

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Current logged-in student's profile image
  const [profileImage, setProfileImage] = useState(null);

  const currentUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const prevIds = useRef(new Set());

  /* =========================================================
     GET CURRENT USER PROFILE
  ========================================================= */

  const fetchProfile = async () => {
    try {
      const res = await axios.get(PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = res.data?.user;

      if (user) {
        const image =
          user.profilePic ||
          user.photoURL ||
          user.profileImage ||
          user.avatar ||
          null;

        setProfileImage(image);
      }
    } catch (err) {
      console.log("Could not load profile image:", err);
    }
  };

  /* =========================================================
     GET LEADERBOARD
  ========================================================= */

  const fetchScores = async () => {
    try {
      const res = await axios.get(LEADERBOARD_URL);

      const rawData = res.data;

      console.log(
        "Raw leaderboard data:",
        rawData
      );

      /*
       * Deduplicate users by uid.
       *
       * If the same user appears multiple times,
       * keep the highest percentage.
       */

      const uniqueUsersMap = {};

      rawData.forEach((item) => {
        if (
          !uniqueUsersMap[item.uid] ||
          item.percent >
            uniqueUsersMap[item.uid].percent
        ) {
          uniqueUsersMap[item.uid] = item;
        }
      });

      /*
       * Sort:
       *
       * 1. Highest percentage first
       * 2. Lowest time second
       */

      const cleanedData =
        Object.values(uniqueUsersMap).sort(
          (a, b) => {
            if (
              b.percent !== a.percent
            ) {
              return (
                b.percent - a.percent
              );
            }

            return (
              a.timeUsed - b.timeUsed
            );
          }
        );

      console.log(
        "Cleaned leaderboard data:",
        cleanedData
      );

      /*
       * Add ranking number.
       */

      const finalRankedData =
        cleanedData.map(
          (user, idx) => ({
            ...user,
            rank: idx + 1,
          })
        );

      prevIds.current = new Set(
        finalRankedData.map(
          (item) => item.id
        )
      );

      setData(finalRankedData);

      console.log(
        "Final ranked leaderboard data:",
        finalRankedData
      );
    } catch (err) {
      console.log(
        "Leaderboard error:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    fetchProfile();
    fetchScores();

    const interval = setInterval(
      fetchScores,
      5000
    );

    return () =>
      clearInterval(interval);
  }, []);

  /* =========================================================
     TOP THREE
  ========================================================= */

  const topThree = data.slice(0, 3);

  const rest = data.slice(3);

  /* =========================================================
     PODIUM STYLE
  ========================================================= */

  const getPodiumStyle = (index) => {
    if (index === 0) {
      return "bg-gradient-to-b from-yellow-300 to-yellow-500 text-white";
    }

    if (index === 1) {
      return "bg-gradient-to-b from-gray-200 to-gray-400 text-gray-800";
    }

    return "bg-gradient-to-b from-orange-300 to-orange-500 text-white";
  };

  /* =========================================================
     PROFILE IMAGE HELPER
  ========================================================= */

  const getProfileImage = (user) => {
    /*
     * First check if the leaderboard API itself already
     * provides an image.
     */

    if (
      user.profilePic
    ) {
      return user.profilePic;
    }

    if (
      user.photoURL
    ) {
      return user.photoURL;
    }

    if (
      user.profileImage
    ) {
      return user.profileImage;
    }

    if (
      user.avatar
    ) {
      return user.avatar;
    }

    /*
     * For the currently logged-in user, use the image
     * loaded from /api/profile.
     */

    if (
      user.uid === currentUserId &&
      profileImage
    ) {
      return profileImage;
    }

    return null;
  };

  /* =========================================================
     AVATAR COMPONENT
  ========================================================= */

  const Avatar = ({
    user,
    large = false,
  }) => {
    const image =
      getProfileImage(user);

    const size = large
      ? "w-20 h-20"
      : "w-9 h-9";

    const textSize = large
      ? "text-2xl"
      : "text-sm";

    return (
      <div
        className={`${size} rounded-full overflow-hidden flex items-center justify-center text-white font-bold flex-shrink-0 ${
          large
            ? "bg-white/20 border-4 border-white/40"
            : user.uid === currentUserId
            ? "bg-green-600"
            : "bg-gray-400"
        }`}
      >
        {image ? (
          <img
            src={image}
            alt={user.name || "Student"}
            className="w-full h-full object-cover"
            onError={(e) => {
              /*
               * If the image URL fails, hide it so the
               * letter fallback becomes visible.
               */
              e.currentTarget.style.display =
                "none";
            }}
          />
        ) : (
          <span className={textSize}>
            {user.name
              ?.charAt(0)
              .toUpperCase() || "U"}
          </span>
        )}
      </div>
    );
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-gradient-to-br mt-12 from-green-50 via-white to-emerald-50 p-4 md:p-6 pt-24">

      {/* HEADER */}

      <div className="max-w-6xl mx-auto mb-8">

        <div className="bg-white border border-green-100 rounded-3xl shadow p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

          <div>

            <h1 className="text-2xl md:text-3xl font-bold text-green-700 flex items-center gap-3">

              <FaTrophy />

              Leaderboard

            </h1>

            <p className="text-gray-500 text-sm">
              Top performing students
            </p>

          </div>

          <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-bold w-full sm:w-auto text-center">
            {data.length} Students
          </div>

        </div>

      </div>

      {/* LOADING */}

      {loading ? (
        <div className="flex justify-center py-32 text-green-600">

          <FiLoader className="text-4xl animate-spin" />

        </div>
      ) : (
        <div className="max-w-6xl mx-auto">

          {/* =================================================
              PODIUM TOP 3
          ================================================= */}

          {topThree.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

              {topThree.map((u, i) => {

                const isUser =
                  u.uid === currentUserId;

                return (
                  <div
                    key={
                      u.id || u.uid
                    }
                    className={`relative p-6 rounded-3xl shadow-lg border text-center transition-all hover:scale-105 ${getPodiumStyle(
                      i
                    )}`}
                  >

                    {/* RANK ICON */}

                    <div className="flex justify-center mb-3">

                      {i === 0 && (
                        <FaCrown className="text-4xl" />
                      )}

                      {i === 1 && (
                        <FaMedal className="text-4xl" />
                      )}

                      {i === 2 && (
                        <FaMedal className="text-4xl" />
                      )}

                    </div>

                    {/* PROFILE IMAGE */}

                    <div className="flex justify-center mb-3">

                      <Avatar
                        user={u}
                        large
                      />

                    </div>

                    {/* NAME */}

                    <h2 className="text-xl font-bold truncate px-2">
                      {u.name}
                    </h2>

                    <p className="mt-1 text-sm font-semibold">
                      {u.percent}%
                    </p>

                    <p className="text-xs opacity-90 mt-2">
                      Time: {u.timeUsed}s
                    </p>

                    {/* YOU BADGE */}

                    {isUser && (
                      <span className="absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 rounded-full font-bold">
                        YOU
                      </span>
                    )}

                  </div>
                );
              })}

            </div>
          )}

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="bg-white border border-green-100 rounded-3xl shadow overflow-hidden">

            <div className="bg-green-600 text-white p-4 font-bold flex items-center gap-2">

              <FiUsers />

              Full Rankings

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-sm min-w-[500px]">

                <thead className="bg-green-50 text-green-700">

                  <tr>

                    <th className="p-4 text-left w-16">
                      Rank
                    </th>

                    <th className="p-4 text-left">
                      Name
                    </th>

                    <th className="p-4 text-left">
                      Score
                    </th>

                    <th className="p-4 text-left">
                      %
                    </th>

                    <th className="p-4 text-left">
                      Time
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {rest.map((u) => {

                    const isUser =
                      u.uid === currentUserId;

                    return (
                      <tr
                        key={
                          u.id || u.uid
                        }
                        className={`border-b transition ${
                          isUser
                            ? "bg-green-100 font-bold"
                            : "hover:bg-green-50"
                        }`}
                      >

                        <td className="p-4 text-gray-600 font-medium">
                          #{u.rank}
                        </td>

                        <td className="p-4 flex items-center gap-3">

                          {/* PROFILE IMAGE */}

                          <Avatar user={u} />

                          <span
                            className={`${
                              isUser
                                ? "text-green-700"
                                : "text-gray-800"
                            } truncate max-w-[150px] sm:max-w-xs`}
                          >

                            {u.name}

                            {isUser && (
                              <span className="ml-2 text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full inline-block align-middle font-bold">
                                YOU
                              </span>
                            )}

                          </span>

                        </td>

                        <td className="p-4 font-bold text-green-700">
                          {u.score}/{u.total}
                        </td>

                        <td className="p-4 font-medium">
                          {u.percent}%
                        </td>

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
