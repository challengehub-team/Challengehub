import {
  FaLightbulb,
  FaChalkboardTeacher,
  FaRocket,
  FaUsers,
  FaArrowRight,
  FaAward,
  FaBookOpen,
  FaLaptopCode,
  FaBrain,
  FaChartLine,
  FaGlobe,
  FaPlay,
} from "react-icons/fa";

const LearnMorePage = () => {
  const features = [
    {
      title: "Innovative Challenges",
      description:
        "Solve real-world coding and math challenges that improve practical problem-solving skills.",
      icon: <FaLightbulb className="text-emerald-600 text-3xl" />,
      bg: "bg-emerald-100",
    },
    {
      title: "Expert Guidance",
      description:
        "Learn from experienced mentors and educators through guided learning experiences.",
      icon: <FaChalkboardTeacher className="text-blue-600 text-3xl" />,
      bg: "bg-blue-100",
    },
    {
      title: "Track Your Progress",
      description:
        "Monitor your achievements, challenge stats, and leaderboard performance in real-time.",
      icon: <FaChartLine className="text-pink-600 text-3xl" />,
      bg: "bg-pink-100",
    },
    {
      title: "Collaborate & Connect",
      description:
        "Join an active learning community, participate in discussions, and build together.",
      icon: <FaUsers className="text-yellow-600 text-3xl" />,
      bg: "bg-yellow-100",
    },
  ];

  const stats = [
    {
      value: "10K+",
      label: "Active Learners",
    },
    {
      value: "500+",
      label: "Challenges",
    },
    {
      value: "95%",
      label: "Success Rate",
    },
    {
      value: "40+",
      label: "Countries",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7fafc] overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-emerald-700 via-green-700 to-emerald-900 text-white pt-36 pb-28 px-6">

        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />

          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-300/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* LEFT */}
            <div>

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2 rounded-full mb-8">
                <FaAward />
                <span className="text-sm font-semibold">
                  Learn Without Limits
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
                Learn.
                <span className="block text-emerald-300">
                  Build.
                </span>
                <span className="block">
                  Compete.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-200 leading-9 max-w-2xl">
                ChallengeHub is a modern learning platform designed
                to help students and creators gain practical skills
                through hands-on challenges, innovation, mentorship,
                and collaboration.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-5 mt-10">

                <button className="bg-white text-emerald-700 px-7 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-2xl">
                  Get Started
                  <FaArrowRight />
                </button>

                <button className="border border-white/20 bg-white/10 backdrop-blur-md px-7 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-white/20 transition-all">
                  <FaPlay />
                  Watch Demo
                </button>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">

                {stats.map((s, i) => (
                  <div key={i}>
                    <h2 className="text-4xl font-black">
                      {s.value}
                    </h2>

                    <p className="text-gray-300 mt-2">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">

              <div className="bg-white/10 border border-white/20 backdrop-blur-2xl rounded-[40px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">

                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
                  alt="Students Learning"
                  className="rounded-[30px] h-[600px] w-full object-cover"
                />
              </div>

              {/* FLOATING CARD */}
              <div className="absolute -bottom-10 -left-10 bg-white rounded-3xl p-6 shadow-2xl w-[280px]">

                <div className="flex items-center gap-5">

                  <div className="bg-emerald-100 p-4 rounded-2xl">
                    <FaRocket className="text-emerald-700 text-2xl" />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black text-slate-900">
                      100+
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Weekly Challenges
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-28 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-5 py-2 rounded-full text-sm font-semibold mb-5">
              <FaBrain />
              Why Choose ChallengeHub
            </div>

            <h2 className="text-5xl font-black text-slate-900 mb-6">
              Everything You Need
              <span className="block text-emerald-600">
                To Grow Faster
              </span>
            </h2>

            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-8">
              Learn modern skills through practical experiences,
              collaboration, and innovation-driven learning.
            </p>
          </div>

          {/* FEATURE GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
              >

                <div
                  className={`${f.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}
                >
                  {f.icon}
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-4">
                  {f.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1 */}
      <section className="py-10 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* IMAGE */}
            <div className="relative">

              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop"
                alt="Learning"
                className="rounded-[40px] shadow-2xl w-full h-[600px] object-cover"
              />

              <div className="absolute bottom-8 left-8 bg-white rounded-3xl p-6 shadow-2xl">

                <div className="flex items-center gap-4">

                  <div className="bg-emerald-100 p-4 rounded-2xl">
                    <FaBookOpen className="text-emerald-700 text-2xl" />
                  </div>

                  <div>
                    <h4 className="text-2xl font-black text-slate-900">
                      Personalized
                    </h4>

                    <p className="text-gray-500 text-sm">
                      Adaptive Learning Paths
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div>

              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold mb-6">
                <FaRocket />
                Smarter Learning
              </div>

              <h2 className="text-5xl font-black text-slate-900 leading-tight mb-8">
                Personalized Learning
                <span className="block text-emerald-600">
                  Experience
                </span>
              </h2>

              <p className="text-gray-600 text-lg leading-9 mb-8">
                ChallengeHub adapts to your skill level and
                learning pace. Our platform helps you improve
                through personalized recommendations, practical
                projects, and challenge-based learning.
              </p>

              <div className="space-y-5">

                <div className="flex items-start gap-4">

                  <div className="bg-emerald-100 p-3 rounded-2xl">
                    <FaLightbulb className="text-emerald-700" />
                  </div>

                  <div>
                    <h4 className="font-black text-xl text-slate-900">
                      Practical Skills
                    </h4>

                    <p className="text-gray-600 mt-2 leading-7">
                      Learn by solving real-world challenges and projects.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">

                  <div className="bg-pink-100 p-3 rounded-2xl">
                    <FaChartLine className="text-pink-700" />
                  </div>

                  <div>
                    <h4 className="font-black text-xl text-slate-900">
                      Progress Tracking
                    </h4>

                    <p className="text-gray-600 mt-2 leading-7">
                      Monitor your growth and improve your performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="py-28 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* CONTENT */}
            <div>

              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full text-sm font-semibold mb-6">
                <FaGlobe />
                Global Community
              </div>

              <h2 className="text-5xl font-black text-slate-900 leading-tight mb-8">
                Learn Together
                <span className="block text-emerald-600">
                  Build Together
                </span>
              </h2>

              <p className="text-gray-600 text-lg leading-9 mb-8">
                Join a thriving community of learners, developers,
                creators, and innovators from around the world.
                Collaborate on projects and grow together.
              </p>

              <div className="space-y-5">

                <div className="flex items-start gap-4">

                  <div className="bg-blue-100 p-3 rounded-2xl">
                    <FaUsers className="text-blue-700" />
                  </div>

                  <div>
                    <h4 className="font-black text-xl text-slate-900">
                      Active Community
                    </h4>

                    <p className="text-gray-600 mt-2 leading-7">
                      Connect with passionate learners and creators.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">

                  <div className="bg-yellow-100 p-3 rounded-2xl">
                    <FaLaptopCode className="text-yellow-700" />
                  </div>

                  <div>
                    <h4 className="font-black text-xl text-slate-900">
                      Team Collaboration
                    </h4>

                    <p className="text-gray-600 mt-2 leading-7">
                      Build projects together and participate in group challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* IMAGE */}
            <div className="relative">

              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"
                alt="Community"
                className="rounded-[40px] shadow-2xl w-full h-[600px] object-cover"
              />

              <div className="absolute top-8 right-8 bg-white rounded-3xl p-6 shadow-2xl">

                <div className="flex items-center gap-4">

                  <div className="bg-yellow-100 p-4 rounded-2xl">
                    <FaUsers className="text-yellow-700 text-2xl" />
                  </div>

                  <div>
                    <h4 className="text-2xl font-black text-slate-900">
                      Global
                    </h4>

                    <p className="text-gray-500 text-sm">
                      Learning Community
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-28 px-6">

        <div className="max-w-7xl mx-auto bg-gradient-to-r from-emerald-700 to-green-800 rounded-[40px] overflow-hidden relative">

          {/* GLOW */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 p-16 md:p-24 text-center text-white">

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2 rounded-full mb-8">
              <FaRocket />
              Ready To Start?
            </div>

            <h2 className="text-5xl md:text-6xl font-black leading-tight mb-8">
              Level Up Your Skills
              <span className="block text-emerald-300">
                With ChallengeHub
              </span>
            </h2>

            <p className="text-lg md:text-xl text-gray-200 leading-9 max-w-3xl mx-auto mb-12">
              Join thousands of learners building practical skills,
              solving challenges, and preparing for the future.
            </p>

            <button className="bg-white text-emerald-700 px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl inline-flex items-center gap-3">
              Get Started Today
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnMorePage;