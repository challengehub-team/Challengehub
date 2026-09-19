import {
  FaUsers,
  FaRocket,
  FaBook,
  FaAward,
  FaCheckCircle,
  FaBrain,
  FaGlobe,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa";

const AboutPage = () => {
  const journey = [
    {
      step: "Join ChallengeHub",
      desc: "Create your account and become part of our learning community.",
    },
    {
      step: "Take Challenges",
      desc: "Attempt quizzes and exams to test your knowledge.",
    },
    {
      step: "Earn Badges",
      desc: "Achieve milestones and unlock badges for your progress.",
    },
    {
      step: "Track Growth",
      desc: "Monitor your scores and improve over time.",
    },
    {
      step: "Become a Top Learner",
      desc: "Compete on leaderboards and stand out among peers.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative h-[60vh] flex items-center justify-center px-6">

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="about"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 text-center max-w-3xl">

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2 rounded-full text-white mb-6">
            <FaBrain />
            About ChallengeHub
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white">
            About Our Platform
          </h1>

          <p className="text-white/80 mt-6 text-lg leading-8">
            A modern Nigerian edtech platform helping students learn through
            competition, practice, and progress tracking.
          </p>
        </div>
      </section>

      {/* ================= MISSION / VISION ================= */}
      <section className="py-24 px-6 bg-[#f8fafc]">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          <div className="bg-white p-8 rounded-3xl shadow border border-gray-100">
            <FaRocket className="text-green-600 text-3xl mb-4" />
            <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
            <p className="text-gray-600 leading-7">
              To provide learners with a secure, interactive platform where
              they can test knowledge, improve skills, and track progress
              through structured academic challenges.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow border border-gray-100">
            <FaBook className="text-green-600 text-3xl mb-4" />
            <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
            <p className="text-gray-600 leading-7">
              To become Africa’s leading learning competition platform,
              empowering students through innovation, practice, and rewards.
            </p>
          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What We Offer</h2>
          <p className="text-gray-600">
            Everything you need to learn, compete, and grow.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="p-6 bg-white border rounded-3xl shadow hover:shadow-lg transition">
            <FaUsers className="text-green-600 text-3xl mb-3" />
            <h3 className="font-bold text-lg mb-2">Community</h3>
            <p className="text-gray-600 text-sm">
              Connect with learners across different schools and regions.
            </p>
          </div>

          <div className="p-6 bg-white border rounded-3xl shadow hover:shadow-lg transition">
            <FaAward className="text-green-600 text-3xl mb-3" />
            <h3 className="font-bold text-lg mb-2">Achievements</h3>
            <p className="text-gray-600 text-sm">
              Earn badges and track academic milestones.
            </p>
          </div>

          <div className="p-6 bg-white border rounded-3xl shadow hover:shadow-lg transition">
            <FaChartLine className="text-green-600 text-3xl mb-3" />
            <h3 className="font-bold text-lg mb-2">Progress</h3>
            <p className="text-gray-600 text-sm">
              Monitor improvement with smart analytics.
            </p>
          </div>

          <div className="p-6 bg-white border rounded-3xl shadow hover:shadow-lg transition">
            <FaLightbulb className="text-green-600 text-3xl mb-3" />
            <h3 className="font-bold text-lg mb-2">Learning</h3>
            <p className="text-gray-600 text-sm">
              Practice WAEC & JAMB-style questions easily.
            </p>
          </div>

        </div>
      </section>

      {/* ================= JOURNEY ================= */}
      <section className="py-24 px-6 bg-[#f8fafc]">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">Your Journey</h2>
          <p className="text-gray-600">Simple steps to grow academically</p>
        </div>

        <div className="max-w-3xl mx-auto border-l-4 border-green-200 pl-8">

          {journey.map((j, i) => (
            <div key={i} className="mb-10 relative">

              <div className="absolute -left-6 top-0 bg-green-600 w-5 h-5 rounded-full flex items-center justify-center text-white">
                <FaCheckCircle className="text-xs" />
              </div>

              <h3 className="text-xl font-bold">{j.step}</h3>
              <p className="text-gray-600 mt-1">{j.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 px-6">

        <div className="max-w-5xl mx-auto bg-green-600 text-white rounded-3xl p-12 text-center">

          <FaGlobe className="text-4xl mx-auto mb-4" />

          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Learning?
          </h2>

          <p className="text-white/80 mb-8">
            Join ChallengeHub and start improving your academic performance today.
          </p>

          <a
            href="/signup"
            className="bg-white text-green-700 px-8 py-3 rounded-2xl font-bold hover:bg-gray-100 transition"
          >
            Get Started
          </a>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;