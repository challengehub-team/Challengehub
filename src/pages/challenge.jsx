import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiPlay,
  FiShield,
  FiClock,
  FiAlertTriangle,
  FiAward,
  FiUsers,
  FiTrendingUp,
  FiActivity,
  FiCheckCircle,
  FiZap,
} from "react-icons/fi";
import {
  FaBrain,
  FaTrophy,
  FaMedal,
  FaCrown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BACKEND_BASE_URL = "https://challengehub-backend-o6ok.onrender.com";

const ChallengePage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);

  /*
   * ============================================================
   * FETCH LIVE CHALLENGE DATA
   * ============================================================
   */

  const fetchLiveStats = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_BASE_URL}/api/exam/leaderboard`
      );

      const rawData = Array.isArray(res.data) ? res.data : [];

      /*
       * Remove duplicate users.
       * If a student appears more than once, keep the best score.
       */
      const uniqueUsers = {};

      rawData.forEach((student) => {
        const key = student.email || student.uid || student.id;

        if (!key) return;

        if (
          !uniqueUsers[key] ||
          Number(student.percent || 0) >
            Number(uniqueUsers[key].percent || 0)
        ) {
          uniqueUsers[key] = student;
        }
      });

      const cleanedData = Object.values(uniqueUsers).sort((a, b) => {
        const scoreDifference =
          Number(b.percent || 0) - Number(a.percent || 0);

        if (scoreDifference !== 0) {
          return scoreDifference;
        }

        return (
          Number(a.timeUsed || 0) -
          Number(b.timeUsed || 0)
        );
      });

      const rankedData = cleanedData.map((student, index) => ({
        ...student,
        rank: index + 1,
      }));

      setLeaderboard(rankedData);
    } catch (error) {
      console.error("Live challenge stats error:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  /*
   * ============================================================
   * REALTIME UPDATE
   * ============================================================
   */

  useEffect(() => {
    fetchLiveStats();

    const interval = setInterval(() => {
      fetchLiveStats();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /*
   * ============================================================
   * START CHALLENGE
   * ============================================================
   */

  const startChallenge = async () => {
    if (loading) return;

    setLoading(true);

    toast.loading("Preparing your challenge...", {
      id: "challenge-start",
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Challenge ready. Good luck! 🚀", {
        id: "challenge-start",
        duration: 2000,
      });

      setTimeout(() => {
        navigate("/exam");
      }, 500);
    } catch (error) {
      toast.error("Unable to start challenge", {
        id: "challenge-start",
      });

      setLoading(false);
    }
  };

  /*
   * ============================================================
   * LIVE STATISTICS
   * ============================================================
   */

  const totalStudents = leaderboard.length;

  const completedChallenges = leaderboard.length;

  const averageScore =
    leaderboard.length > 0
      ? Math.round(
          leaderboard.reduce(
            (sum, student) =>
              sum + Number(student.percent || 0),
            0
          ) / leaderboard.length
        )
      : 0;

  const highestScore =
    leaderboard.length > 0
      ? Math.max(
          ...leaderboard.map((student) =>
            Number(student.percent || 0)
          )
        )
      : 0;

  const topThree = leaderboard.slice(0, 3);

  /*
   * ============================================================
   * PAGE
   * ============================================================
   */

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 pt-16 pb-12">

      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="relative overflow-hidden">

        <div className="relative min-h-[520px] flex items-center">

          {/* HERO IMAGE */}

          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1800&auto=format&fit=crop"
            alt="Students participating in an academic challenge"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* DARK OVERLAY */}

          <div className="absolute inset-0 bg-black/75" />

          {/* GREEN GRADIENT */}

          <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-900/70 to-emerald-900/40" />

          {/* HERO CONTENT */}

          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-20">

            <div className="max-w-3xl">

              {/* BADGE */}

              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">

                <FaBrain />

                ChallengeHub Live Challenge

              </div>

              {/* TITLE */}

              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">

                Think Fast.
                <span className="text-green-400">
                  {" "}Challenge Yourself.
                </span>

              </h1>

              {/* DESCRIPTION */}

              <p className="mt-6 text-gray-200 text-base md:text-lg leading-8 max-w-2xl">

                Put your Mathematics knowledge to the test in a
                timed CBT challenge. Compete, improve your score,
                and see how you perform alongside other students.

              </p>

              {/* HERO BUTTONS */}

              <div className="mt-8 flex flex-col sm:flex-row gap-4">

                <button
                  onClick={startChallenge}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-500 disabled:bg-green-800 text-white px-7 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl transition active:scale-95"
                >

                  {loading ? (
                    <>
                      <FiActivity className="animate-spin" />
                      Preparing Challenge...
                    </>
                  ) : (
                    <>
                      <FiPlay />
                      Start Challenge
                    </>
                  )}

                </button>

                <div className="border border-white/20 bg-white/10 backdrop-blur-sm text-white px-7 py-4 rounded-2xl flex items-center justify-center gap-3">

                  <FiActivity className="text-green-400" />

                  <span className="text-sm font-semibold">
                    Live Competition
                  </span>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          LIVE STATS
      ======================================================== */}

      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">

        <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-5 md:p-7">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <div>

              <div className="flex items-center gap-2">

                <span className="relative flex h-3 w-3">

                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />

                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />

                </span>

                <h2 className="font-bold text-gray-800">
                  Live Challenge Statistics
                </h2>

              </div>

              <p className="text-sm text-gray-500 mt-1">
                Statistics update automatically every few seconds.
              </p>

            </div>

            <div className="text-xs text-green-600 bg-green-50 border border-green-100 px-3 py-2 rounded-full flex items-center gap-2 w-fit">

              <FiZap />

              Real-time updates

            </div>

          </div>


          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            {/* STUDENTS */}

            <LiveStat
              icon={FiUsers}
              label="Students"
              value={
                statsLoading
                  ? "..."
                  : totalStudents
              }
            />

            {/* CHALLENGES */}

            <LiveStat
              icon={FiCheckCircle}
              label="Challenges Completed"
              value={
                statsLoading
                  ? "..."
                  : completedChallenges
              }
            />

            {/* AVERAGE */}

            <LiveStat
              icon={FiTrendingUp}
              label="Average Score"
              value={
                statsLoading
                  ? "..."
                  : `${averageScore}%`
              }
            />

            {/* HIGHEST */}

            <LiveStat
              icon={FaTrophy}
              label="Highest Score"
              value={
                statsLoading
                  ? "..."
                  : `${highestScore}%`
              }
            />

          </div>

        </div>

      </section>


      {/* ========================================================
          CHALLENGE INFORMATION
      ======================================================== */}

      <section className="max-w-7xl mx-auto px-6 mt-12">

        <div className="grid lg:grid-cols-3 gap-6">

          {/* DURATION */}

          <InfoBox
            icon={FiClock}
            title="5 Minutes"
            description="Complete the challenge within the allocated time."
          />

          {/* QUESTIONS */}

          <InfoBox
            icon={FiAward}
            title="Multiple Choice"
            description="Answer Mathematics questions in a CBT environment."
          />

          {/* SECURITY */}

          <InfoBox
            icon={FiShield}
            title="Monitored Environment"
            description="The challenge tracks activity during your assessment."
          />

        </div>

      </section>


      {/* ========================================================
          LIVE LEADERS
      ======================================================== */}

      <section className="max-w-7xl mx-auto px-6 mt-12">

        <div className="bg-white rounded-3xl border border-green-100 shadow-sm overflow-hidden">

          <div className="p-6 border-b border-green-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div>

              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">

                <FaTrophy className="text-green-600" />

                Live Performance

              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Current top performers in the challenge.
              </p>

            </div>

            <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-full">

              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />

              Updating live

            </div>

          </div>


          {topThree.length === 0 ? (

            <div className="p-10 text-center">

              <FaBrain className="mx-auto text-4xl text-green-200 mb-3" />

              <p className="font-semibold text-gray-700">
                No challenge results yet
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Be the first student to complete the challenge.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-3 gap-5 p-6">

              {topThree.map((student, index) => (

                <div
                  key={
                    student.email ||
                    student.uid ||
                    student.id ||
                    index
                  }
                  className={`relative rounded-2xl border p-6 text-center ${
                    index === 0
                      ? "bg-green-50 border-green-300"
                      : index === 1
                      ? "bg-gray-50 border-gray-200"
                      : "bg-emerald-50/40 border-emerald-100"
                  }`}
                >

                  {/* MEDAL */}

                  <div className="flex justify-center mb-4">

                    {index === 0 ? (
                      <FaCrown className="text-3xl text-green-600" />
                    ) : (
                      <FaMedal
                        className={`text-3xl ${
                          index === 1
                            ? "text-gray-500"
                            : "text-emerald-500"
                        }`}
                      />
                    )}

                  </div>


                  {/* AVATAR */}

                  <div className="w-14 h-14 mx-auto rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg mb-3">

                    {student.name
                      ?.charAt(0)
                      ?.toUpperCase() || "S"}

                  </div>


                  {/* NAME */}

                  <h3 className="font-bold text-gray-800 truncate">

                    {student.name || "Student"}

                  </h3>


                  {/* SCORE */}

                  <p className="text-green-700 font-black text-xl mt-2">

                    {student.percent || 0}%

                  </p>


                  <p className="text-xs text-gray-500 mt-1">

                    {student.score || 0}/{student.total || 0} correct

                  </p>


                  <p className="text-xs text-gray-500 mt-1">

                    Time: {student.timeUsed || 0}s

                  </p>


                  {/* RANK */}

                  <div className="absolute top-3 left-3 bg-white border border-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">

                    #{index + 1}

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* ========================================================
          RULES
      ======================================================== */}

      <section className="max-w-4xl mx-auto px-6 mt-12">

        <div className="bg-white border border-green-100 rounded-3xl shadow-sm p-7">

          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">

            <FiShield className="text-green-600" />

            Before You Start

          </h2>

          <div className="mt-6 space-y-4">

            <Rule text="Do not switch tabs during the examination." />

            <Rule text="Full-screen mode may be required during the challenge." />

            <Rule text="The timer begins immediately when the challenge starts." />

            <Rule text="Your answers are automatically submitted when the timer ends." />

            <Rule text="Your score can appear on the live leaderboard after submission." />

          </div>

        </div>

      </section>


      {/* ========================================================
          WARNING
      ======================================================== */}

      <section className="max-w-4xl mx-auto px-6 mt-6">

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex gap-4">

          <FiAlertTriangle className="text-yellow-600 text-xl shrink-0 mt-0.5" />

          <div>

            <h3 className="font-bold text-yellow-800">
              Monitored Challenge
            </h3>

            <p className="text-sm text-yellow-700 mt-1 leading-6">
              This is an official assessment environment.
              Suspicious activity may be recorded for examination
              integrity.

            </p>

          </div>

        </div>

      </section>


      {/* ========================================================
          FINAL CTA
      ======================================================== */}

      <section className="max-w-4xl mx-auto px-6 mt-12">

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 p-8 md:p-10 text-center text-white shadow-xl">

          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full" />

          <div className="relative">

            <FaBrain className="mx-auto text-4xl mb-4 text-green-200" />

            <h2 className="text-2xl md:text-3xl font-black">
              Ready for the Challenge?
            </h2>

            <p className="text-green-100 mt-3 max-w-xl mx-auto">
              Test your knowledge, manage your time, and see your
              performance alongside other ChallengeHub students.
            </p>

            <button
              onClick={startChallenge}
              disabled={loading}
              className="mt-7 bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-2xl font-bold inline-flex items-center gap-3 shadow-lg transition active:scale-95 disabled:opacity-70"
            >

              {loading ? (
                <>
                  <FiActivity className="animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <FiPlay />
                  Start Challenge
                </>
              )}

            </button>

          </div>

        </div>

      </section>

    </div>
  );
};


/* ================================================================
   LIVE STAT COMPONENT
================================================================ */

const LiveStat = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">

      <div className="flex items-center gap-3">

        <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">

          <Icon className="text-green-600 text-xl" />

        </div>

        <div>

          <p className="text-xs text-gray-500">
            {label}
          </p>

          <p className="text-xl font-black text-gray-800 mt-1">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
};


/* ================================================================
   INFORMATION BOX
================================================================ */

const InfoBox = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white border border-green-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition">

      <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center mb-4">

        <Icon className="text-green-600 text-xl" />

      </div>

      <h3 className="font-bold text-gray-800 text-lg">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-2 leading-6">
        {description}
      </p>

    </div>
  );
};


/* ================================================================
   RULE
================================================================ */

const Rule = ({ text }) => {
  return (
    <div className="flex items-start gap-3">

      <FiCheckCircle className="text-green-600 mt-0.5 shrink-0" />

      <p className="text-sm text-gray-600">
        {text}
      </p>

    </div>
  );
};


export default ChallengePage;
