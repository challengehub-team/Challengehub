import { motion } from "framer-motion";
import {
  Trophy,
  Crown,
  Lock,
  ArrowRight,
  Users,
  BookOpen,
  Medal,
  Star,
} from "lucide-react";

export default function ChooseLeaderboardPage() {

  const leaderboards = [
    {
      title: "Free Test Leaderboard",
      desc: "View rankings from all free practice tests.",
      icon: Trophy,
      color: "from-green-500 to-emerald-600",
      students: "12,540 Students",
      locked: false,
    },
    {
      title: "Real Competition Leaderboard",
      desc: "Premium rankings for paid competition participants.",
      icon: Crown,
      color: "from-indigo-500 to-purple-700",
      students: "4,230 Participants",
      locked: true,
    },
    {
      title: "Weekly Top Scorers",
      desc: "See students with the highest scores this week.",
      icon: Medal,
      color: "from-orange-500 to-pink-600",
      students: "1,820 Students",
      locked: false,
    },
    {
      title: "Subject Rankings",
      desc: "Explore rankings by Mathematics, English, Science & more.",
      icon: BookOpen,
      color: "from-cyan-500 to-blue-600",
      students: "8 Subjects",
      locked: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* HERO */}
      <section className="bg-gradient-to-r from-green-600 to-indigo-700 text-white py-24 px-6 relative overflow-hidden">

        {/* GLOW */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 blur-3xl rounded-full"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-5 py-2 rounded-full backdrop-blur-lg mb-6">
              <Star size={16} />
              Student Rankings
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              Choose A Leaderboard
            </h1>

            <p className="mt-6 text-lg text-white/85 max-w-2xl mx-auto">
              Explore rankings, compare performances,
              and see where students stand.
            </p>

          </motion.div>

        </div>

      </section>

      {/* LEADERBOARD OPTIONS */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-8">

          {leaderboards.map((board, i) => {
            const Icon = board.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg group"
              >

                {/* LOCK BADGE */}
                {board.locked && (
                  <div className="absolute top-5 right-5 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-20">
                    <Lock size={14} />
                    Locked
                  </div>
                )}

                {/* TOP LINE */}
                <div className={`h-2 bg-gradient-to-r ${board.color}`}></div>

                <div className="p-8">

                  {/* ICON */}
                  <div
                    className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${board.color} text-white flex items-center justify-center shadow-xl mb-6`}
                  >
                    <Icon size={38} />
                  </div>

                  {/* TITLE */}
                  <h2 className="text-3xl font-black text-gray-900">
                    {board.title}
                  </h2>

                  {/* DESC */}
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {board.desc}
                  </p>

                  {/* STUDENTS */}
                  <div className="mt-6 inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-semibold">
                    <Users size={18} />
                    {board.students}
                  </div>

                  {/* BUTTON */}
                  <button
                    className={`mt-8 w-full bg-gradient-to-r ${board.color} text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition`}
                  >
                    {board.locked
                      ? "Unlock Leaderboard"
                      : "View Leaderboard"}

                    <ArrowRight size={18} />
                  </button>

                </div>

              </motion.div>
            );
          })}

        </div>

      </section>

    </div>
  );
}