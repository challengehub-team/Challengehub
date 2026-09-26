import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Brain,
  Trophy,
  Users,
  Clock,
  ShieldCheck,
  Target,
  ArrowRight,
  Zap,
  CheckCircle,
  BarChart3,
  Radio,
  Sparkles,
  RefreshCw,
} from "lucide-react";

// =========================================================
// CONFIG
// =========================================================

const BACKEND_BASE_URL = "http://localhost:3000";

const LIVE_ENDPOINTS = [
  `${BACKEND_BASE_URL}/api/live-traffic-counter`,
  `${BACKEND_BASE_URL}/api/live-traffic`,
];

// =========================================================
// CHALLENGE PAGE
// =========================================================

const ChallengePage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [onlineStudents, setOnlineStudents] = useState(0);

  const [statsLoading, setStatsLoading] = useState(true);

  const [lastUpdated, setLastUpdated] = useState(null);

  const [apiOnline, setApiOnline] = useState(false);

  // =======================================================
  // GET ONLINE STUDENTS
  // =======================================================

  const fetchLiveStudents = async () => {
    let success = false;

    for (const endpoint of LIVE_ENDPOINTS) {
      try {
        const response = await axios.get(endpoint, {
          timeout: 7000,
          headers: {
            Accept: "application/json",
          },
        });

        const data = response?.data;

        console.log(data);

        /*
          Supports responses such as:

          { count: 25 }

          { onlineStudents: 25 }

          { active: 25 }

          { online: 25 }

          { total: 25 }

          Also handles:

          { count: { count: 25 } }
        */

        let count =
          data?.onlineCount ??
          data?.onlineStudents ??
          data?.active ??
          data?.online ??
          data?.total ??
          0;

        // Handle nested count object
        if (typeof count === "object" && count !== null) {
          count =
            count?.count ??
            count?.onlineStudents ??
            count?.active ??
            count?.online ??
            count?.total ??
            0;
        }

        const numericCount = Number(count);

        if (Number.isFinite(numericCount)) {
          setOnlineStudents(Math.max(0, numericCount));
        }

        setApiOnline(true);
        setStatsLoading(false);
        setLastUpdated(new Date());

        success = true;

        // Stop once the first endpoint succeeds.
        break;
      } catch (error) {
        console.warn(
          `Live traffic endpoint failed: ${endpoint}`
        );
      }
    }

    // Both endpoints failed.
    if (!success) {
      setApiOnline(false);

      // Don't reset onlineStudents to zero.
      // This prevents ugly flashing when the server
      // temporarily takes a moment to respond.

      setStatsLoading(false);
    }
  };

  // =======================================================
  // LIVE POLLING
  // =======================================================

  useEffect(() => {
    // Initial request immediately.
    fetchLiveStudents();

    // Update every 2 seconds.
    const interval = setInterval(() => {
      fetchLiveStudents();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // =======================================================
  // START CHALLENGE
  // =======================================================

  const startChallenge = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      navigate("/exam");
    }, 500);
  };

  // =======================================================
  // LAST UPDATED TEXT
  // =======================================================

  const getLastUpdatedText = () => {
    if (!lastUpdated) {
      return "Connecting...";
    }

    return `Updated ${lastUpdated.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}`;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 overflow-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[680px] flex items-center overflow-hidden">

        {/* HERO IMAGE */}
        <div className="absolute inset-0">

          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1800&auto=format&fit=crop"
            alt="Students participating in an academic challenge"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="absolute inset-0 bg-gradient-to-r from-green-950/95 via-green-900/75 to-emerald-900/50" />

        </div>

        {/* DECORATIVE GLOWS */}

        <div className="absolute -top-32 -right-32 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />

        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />

        {/* HERO CONTENT */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* =================================================
                LEFT
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >

              {/* BADGE */}

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md text-green-200 px-4 py-2 rounded-full text-sm font-medium mb-6">

                <Sparkles size={16} />

                ChallengeHub Competition

              </div>

              {/* HEADING */}

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">

                Test Your Knowledge.

                <span className="block text-green-400">
                  Beat Your Best.
                </span>

              </h1>

              {/* DESCRIPTION */}

              <p className="mt-6 text-base md:text-lg text-gray-200 max-w-xl leading-8">

                Enter the ChallengeHub assessment environment,
                answer carefully, manage your time, and see how
                your performance compares with other students.

              </p>

              {/* BUTTONS */}

              <div className="mt-8 flex flex-col sm:flex-row gap-4">

                <motion.button
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={startChallenge}
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-400 disabled:opacity-70 disabled:cursor-not-allowed text-white px-7 py-4 rounded-2xl font-bold shadow-2xl flex items-center justify-center gap-3 transition"
                >

                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />

                      Starting Challenge...
                    </>
                  ) : (
                    <>
                      <Zap size={20} />

                      Start Challenge

                      <ArrowRight size={19} />
                    </>
                  )}

                </motion.button>

                <button
                  onClick={() => {
                    document
                      .getElementById("challenge-info")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                  className="border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-7 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition"
                >

                  <Target size={19} />

                  How It Works

                </button>

              </div>

              {/* TRUST INDICATORS */}

              <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/70">

                <div className="flex items-center gap-2">

                  <CheckCircle
                    size={16}
                    className="text-green-400"
                  />

                  Secure Assessment

                </div>

                <div className="flex items-center gap-2">

                  <CheckCircle
                    size={16}
                    className="text-green-400"
                  />

                  Instant Results

                </div>

                <div className="flex items-center gap-2">

                  <CheckCircle
                    size={16}
                    className="text-green-400"
                  />

                  Live Activity

                </div>

              </div>

            </motion.div>

            {/* =================================================
                LIVE STATS
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="relative"
            >

              <div className="bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-2xl">

                {/* HEADER */}

                <div className="flex items-center justify-between mb-7">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-green-500/20 border border-green-400/20 flex items-center justify-center">

                      <Radio
                        size={22}
                        className="text-green-300"
                      />

                    </div>

                    <div>

                      <h2 className="text-white font-bold text-lg">
                        Live Platform
                      </h2>

                      <p className="text-white/50 text-xs">
                        Real-time student activity
                      </p>

                    </div>

                  </div>

                  {/* LIVE STATUS */}

                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                      apiOnline
                        ? "bg-green-500/15 border-green-400/20"
                        : "bg-yellow-500/10 border-yellow-400/20"
                    }`}
                  >

                    <span className="relative flex h-2.5 w-2.5">

                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          apiOnline
                            ? "bg-green-400"
                            : "bg-yellow-400"
                        }`}
                      />

                      <span
                        className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                          apiOnline
                            ? "bg-green-400"
                            : "bg-yellow-400"
                        }`}
                      />

                    </span>

                    <span
                      className={`text-xs font-bold ${
                        apiOnline
                          ? "text-green-300"
                          : "text-yellow-300"
                      }`}
                    >
                      {apiOnline ? "LIVE" : "CONNECTING"}
                    </span>

                  </div>

                </div>

                {/* ONLINE STUDENTS */}

                <div className="bg-white/10 border border-white/10 rounded-2xl p-6">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-white/60 text-sm">
                        Students Online
                      </p>

                      <div className="flex items-end gap-2 mt-1">

                        <motion.span
                          key={onlineStudents}
                          initial={{
                            opacity: 0,
                            y: 8,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className="text-4xl md:text-5xl font-black text-white"
                        >

                          {statsLoading
                            ? "—"
                            : onlineStudents.toLocaleString()}

                        </motion.span>

                        <span className="text-green-300 text-sm mb-2">
                          active now
                        </span>

                      </div>

                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">

                      <Users
                        size={28}
                        className="text-green-300"
                      />

                    </div>

                  </div>

                  {/* ACTIVITY BAR */}

                  <div className="mt-5 h-2 bg-white/10 rounded-full overflow-hidden">

                    <motion.div
                      animate={{
                        width:
                          onlineStudents > 0
                            ? "100%"
                            : "8%",
                      }}
                      transition={{
                        duration: 0.8,
                      }}
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-300 rounded-full"
                    />

                  </div>

                  {/* UPDATE STATUS */}

                  <div className="flex items-center justify-between mt-3">

                    <p className="text-white/40 text-xs">
                      {getLastUpdatedText()}
                    </p>

                    <div className="flex items-center gap-1.5 text-white/40 text-xs">

                      <RefreshCw
                        size={11}
                        className={
                          apiOnline
                            ? "animate-spin"
                            : ""
                        }
                      />

                      Auto refresh

                    </div>

                  </div>

                </div>

                {/* CHALLENGE STATS */}

                <div className="grid grid-cols-2 gap-4 mt-4">

                  <LiveStat
                    icon={Clock}
                    label="Challenge Time"
                    value="5 Minutes"
                  />

                  <LiveStat
                    icon={Trophy}
                    label="Competition"
                    value="Live Ranking"
                  />

                  <LiveStat
                    icon={Target}
                    label="Assessment"
                    value="Multiple Choice"
                  />

                  <LiveStat
                    icon={ShieldCheck}
                    label="Environment"
                    value="Monitored"
                  />

                </div>

              </div>

              {/* FLOATING ACTIVITY CARD */}

              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute -bottom-5 -left-4 md:-left-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
              >

                <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">

                  <Users
                    size={18}
                    className="text-green-600"
                  />

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Platform activity
                  </p>

                  <p className="text-sm font-bold text-gray-800">

                    {apiOnline
                      ? `${onlineStudents.toLocaleString()} students active`
                      : "Updating activity..."}

                  </p>

                </div>

              </motion.div>

            </motion.div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CHALLENGE INFORMATION
      ===================================================== */}

      <section
        id="challenge-info"
        className="py-20 bg-white"
      >

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto mb-14">

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-5">

              <Brain
                size={28}
                className="text-green-600"
              />

            </div>

            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Your Challenge Starts Here
            </h2>

            <p className="mt-4 text-gray-500 leading-7">

              Everything you need for a focused and fair assessment
              experience is built into the ChallengeHub environment.

            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <InfoCard
              icon={Clock}
              title="5 Minute Challenge"
              description="Manage your time carefully. The countdown begins when you enter the assessment."
            />

            <InfoCard
              icon={Trophy}
              title="Compete & Rank"
              description="Your performance contributes to your position on the ChallengeHub leaderboard."
            />

            <InfoCard
              icon={BarChart3}
              title="Instant Performance"
              description="After completing your challenge, your result can be reviewed through the platform."
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          GUIDELINES
      ===================================================== */}

      <section className="py-20 bg-gray-50">

        <div className="max-w-5xl mx-auto px-6">

          <div className="bg-white border border-green-100 rounded-3xl shadow-sm p-7 md:p-10">

            <div className="flex items-center gap-3 mb-7">

              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">

                <ShieldCheck
                  size={24}
                  className="text-green-600"
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-900">
                  Challenge Guidelines
                </h2>

                <p className="text-sm text-gray-500">
                  Please read before starting.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <Rule
                number="01"
                text="Stay focused and avoid switching tabs during the assessment."
              />

              <Rule
                number="02"
                text="The challenge timer starts immediately when the assessment begins."
              />

              <Rule
                number="03"
                text="Select your answers carefully before submitting."
              />

              <Rule
                number="04"
                text="Your score and completion time may be used for leaderboard ranking."
              />

            </div>

            <div className="mt-8 pt-7 border-t border-gray-100">

              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={startChallenge}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg transition disabled:opacity-70"
              >

                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />

                    Preparing Challenge...
                  </>
                ) : (
                  <>
                    <Zap size={20} />

                    Start Challenge Now

                    <ArrowRight size={19} />
                  </>
                )}

              </motion.button>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 py-20 text-white">

        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-300/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

          <Trophy
            size={48}
            className="mx-auto text-green-200 mb-5"
          />

          <h2 className="text-3xl md:text-5xl font-black">
            Ready for the Challenge?
          </h2>

          <p className="mt-5 text-green-100 max-w-2xl mx-auto leading-7">

            Take your position, stay focused, and show what
            you know.

          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={startChallenge}
            disabled={loading}
            className="mt-8 bg-white text-green-700 px-8 py-4 rounded-2xl font-bold shadow-xl inline-flex items-center gap-3"
          >

            <Zap size={19} />

            {loading
              ? "Starting..."
              : "Start Challenge"}

            <ArrowRight size={19} />

          </motion.button>

        </div>

      </section>

    </div>
  );
};

// =========================================================
// LIVE STAT
// =========================================================

function LiveStat({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

      <div className="flex items-center gap-2 text-green-300 mb-2">

        <Icon size={16} />

        <span className="text-xs text-white/60">
          {label}
        </span>

      </div>

      <p className="text-white font-bold text-sm">
        {value}
      </p>

    </div>
  );
}

// =========================================================
// INFORMATION CARD
// =========================================================

function InfoCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-lg transition"
    >

      <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-5">

        <Icon
          size={27}
          className="text-green-600"
        />

      </div>

      <h3 className="text-xl font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-3 text-gray-500 leading-7 text-sm">
        {description}
      </p>

    </motion.div>
  );
}

// =========================================================
// RULE
// =========================================================

function Rule({
  number,
  text,
}) {
  return (
    <div className="flex items-start gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5">

      <div className="w-9 h-9 shrink-0 rounded-xl bg-green-600 text-white flex items-center justify-center text-xs font-bold">

        {number}

      </div>

      <p className="text-sm text-gray-600 leading-6">
        {text}
      </p>

    </div>
  );
}

export default ChallengePage;
