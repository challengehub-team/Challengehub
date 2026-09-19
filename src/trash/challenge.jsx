import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Trophy,
  Zap,
  TrendingUp,
  Target,
  Users,
  ArrowRight,
  BarChart3,
  Sparkles,
} from "lucide-react";

export default function ChallengePage() {
  const [stats, setStats] = useState({
    participants: 0,
    testsToday: 0,
    active: 0,
  });

  // Animated Counter
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        participants: Math.min(prev.participants + 200, 18540),
        testsToday: Math.min(prev.testsToday + 55, 5420),
        active: Math.min(prev.active + 1, 32),
      }));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: "Free Practice Tests",
      desc: "Access high-quality academic tests and improve daily.",
      icon: BookOpen,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Live Rankings",
      desc: "Track your performance and rise on the leaderboard.",
      icon: Trophy,
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "Instant Results",
      desc: "Get detailed analytics immediately after every test.",
      icon: Zap,
      color: "from-orange-500 to-pink-500",
    },
  ];

  const features = [
    {
      title: "Unlimited Free Tests",
      desc: "Practice anytime without limits or hidden fees.",
      icon: BookOpen,
    },
    {
      title: "Performance Analytics",
      desc: "Track your growth with beautiful progress insights.",
      icon: BarChart3,
    },
    {
      title: "Boost Confidence",
      desc: "Prepare smarter and perform better in real exams.",
      icon: Target,
    },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="relative pt-28 pb-24 overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-indigo-700 text-white">

        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-lg px-4 py-2 rounded-full text-sm mb-6">
              <Sparkles size={16} />
              Trusted by Thousands of Students
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              Learn Faster.
              <br />
              Score Higher.
            </h1>

            <p className="mt-6 text-lg text-white/85 leading-relaxed max-w-xl">
              Take free academic tests, monitor your progress,
              and improve your performance with modern learning tools.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="bg-white text-green-700 px-7 py-4 rounded-2xl font-semibold shadow-2xl flex items-center gap-2"
              >
                Start Free Test
                <ArrowRight size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="border border-white/20 bg-white/10 backdrop-blur-md px-7 py-4 rounded-2xl font-semibold"
              >
                Explore Features
              </motion.button>

            </div>

          </motion.div>

          {/* RIGHT STATS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl"
          >

            <div className="flex items-center gap-3 mb-8">
              <Users className="text-green-200" />
              <h3 className="text-2xl font-bold">
                Live Platform Stats
              </h3>
            </div>

            <div className="space-y-6">

              <Stat
                label="Total Participants"
                value={stats.participants}
              />

              <Stat
                label="Tests Taken Today"
                value={stats.testsToday}
              />

              <Stat
                label="Active Students"
                value={stats.active}
              />

            </div>

            {/* Animated Bar */}
            <div className="mt-8 h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "84%" }}
                transition={{ duration: 2 }}
                className="h-full rounded-full bg-gradient-to-r from-green-300 to-white"
              />
            </div>

          </motion.div>

        </div>
      </section>

      {/* CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Powerful Learning Experience
          </h2>

          <p className="text-gray-600 text-lg mt-4">
            Everything you need to improve academically in one platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {cards.map((card, i) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
              >

                <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>

                <div className="p-8">

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white shadow-lg mb-6`}
                  >
                    <Icon size={30} />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-8">
                    {card.desc}
                  </p>

                  <button
                    className={`w-full bg-gradient-to-r ${card.color} text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition`}
                  >
                    Get Started
                    <ArrowRight size={18} />
                  </button>

                </div>

              </motion.div>
            );
          })}

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-white relative">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Why Students Love ChallengeHub
            </h2>

            <p className="text-gray-600 text-lg mt-4">
              Built for modern students who want smarter learning.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {features.map((feature, i) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-3xl p-10 shadow-md text-center"
                >

                  <div className="w-20 h-20 rounded-3xl bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <Icon size={36} className="text-green-700" />
                  </div>

                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h4>

                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>

                </motion.div>
              );
            })}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-indigo-700 text-white text-center relative overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_40%)]"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto px-6"
        >

          <TrendingUp
            size={60}
            className="mx-auto mb-6 text-green-200"
          />

          <h2 className="text-5xl font-black leading-tight">
            Ready To Improve Your Scores?
          </h2>

          <p className="mt-6 text-lg text-white/85 max-w-2xl mx-auto">
            Start taking free tests today and unlock your full academic potential.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="mt-10 bg-white text-green-700 px-8 py-4 rounded-2xl font-bold shadow-2xl inline-flex items-center gap-2"
          >
            Start Free Test
            <ArrowRight size={20} />
          </motion.button>

        </motion.div>
      </section>

    </div>
  );
}

/* STATS */
function Stat({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-4">
      <span className="text-white/80 text-sm">
        {label}
      </span>

      <span className="text-3xl font-black">
        {value.toLocaleString()}
      </span>
    </div>
  );
}