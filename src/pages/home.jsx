import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  FaBookOpen,
  FaTrophy,
  FaMoneyBillWave,
  FaChartLine,
  FaUsers,
  FaLightbulb,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaArrowRight,
  FaRocket,
  FaAward,
  FaBrain,
  FaLaptopCode,
} from "react-icons/fa";

export default function Home() {
  const [text, setText] = useState("");

  useEffect(() => {
    const full = "Welcome to ChallengeHub";
    let i = 0;

    const interval = setInterval(() => {
      setText(full.slice(0, i));
      i++;

      if (i > full.length) clearInterval(interval);
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const aims = [
    {
      text: "Helping students improve academically through structured competition",
      icon: FaBookOpen,
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
    },
    {
      text: "Encouraging healthy academic rivalry among students",
      icon: FaTrophy,
      img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop",
    },
    {
      text: "Supporting students financially through rewards and performance",
      icon: FaMoneyBillWave,
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop",
    },
    {
      text: "Making learning interactive, competitive, and engaging",
      icon: FaLightbulb,
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  const platform = [
    {
      icon: FaBookOpen,
      title: "Academic Challenges",
      desc: "WAEC & JAMB-style practice questions for Nigerian students.",
    },
    {
      icon: FaTrophy,
      title: "National Competitions",
      desc: "Compete across schools, states, and rank nationally.",
    },
    {
      icon: FaMoneyBillWave,
      title: "Student Rewards",
      desc: "Top performers earn real academic financial rewards.",
    },
    {
      icon: FaChartLine,
      title: "Smart Tracking",
      desc: "Track progress and improve weak academic areas.",
    },
  ];

  const features = [
    {
      icon: FaTrophy,
      title: "Competition System",
      text: "Students compete nationally across Nigeria to rank top academically.",
    },
    {
      icon: FaBookOpen,
      title: "Exam Preparation",
      text: "Practice WAEC, JAMB and school exams with real past questions.",
    },
    {
      icon: FaMoneyBillWave,
      title: "Financial Motivation",
      text: "Top academic performers earn structured rewards and incentives.",
    },
    {
      icon: FaUsers,
      title: "Peer Learning",
      text: "Learn faster by competing and collaborating with other students.",
    },
    {
      icon: FaChartLine,
      title: "Performance Analytics",
      text: "Understand your progress and improve smarter, not harder.",
    },
    {
      icon: FaLightbulb,
      title: "Skill Growth",
      text: "Build speed, accuracy, and critical thinking for exams.",
    },
  ];

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

        {/* BG IMAGE */}
        <div className="absolute inset-0">

          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="students"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-emerald-950/80" />
        </div>

        {/* GLOW */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center max-w-5xl"
        >

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2 rounded-full mb-8 text-white">
            <FaAward />
            <span className="text-sm font-semibold">
              Nigeria's Modern Learning Platform
            </span>
          </div>

          {/* TITLE */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            {text}
            <span className="text-green-400 animate-pulse">|</span>
          </h1>

          <h2 className="text-2xl md:text-4xl text-green-300 font-bold mt-5">
            Learn. Compete. Grow.
          </h2>

          {/* DESC */}
          <p className="mt-8 text-white/80 text-lg md:text-xl leading-9 max-w-3xl mx-auto">
            ChallengeHub is a Nigerian edtech platform helping students
            improve academically through structured competition,
            exam preparation, collaboration, and rewards.
          </p>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <a
              href="/signup"
              className="px-8 py-4 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition shadow-2xl font-bold flex items-center gap-3"
            >
              Get Started
              <FaArrowRight />
            </a>

            <a
              href="/learnmore"
              className="px-8 py-4 border border-white/20 bg-white/10 backdrop-blur-md text-white rounded-2xl hover:bg-white hover:text-black transition font-bold"
            >
              Learn More
            </a>
          </div>

          {/* MOTTO */}
          <div className="mt-10 text-green-300 tracking-[5px] text-sm font-semibold">
            BUILDING MINDS INTO THE FUTURE
          </div>

          <div className="h-[4px] bg-green-400 mx-auto mt-8 w-[200px] rounded-full" />
        </motion.div>
      </section>

      {/* ================= WHY CHALLENGEHUB ================= */}
      <section className="py-24 px-6 bg-[#f8fafc]">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-20">

            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-semibold mb-5">
              <FaBrain />
              Why ChallengeHub
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Learning Beyond
              <span className="block text-green-600">
                Traditional Education
              </span>
            </h2>

            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-8">
              ChallengeHub helps students learn smarter through
              competition, collaboration, practical challenges,
              and real academic growth.
            </p>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* CARD */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >

              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FaBookOpen className="text-green-700 text-2xl" />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Smart Learning
              </h3>

              <p className="text-gray-600 leading-7">
                Practice with structured academic challenges
                designed to improve speed, confidence, and understanding.
              </p>
            </motion.div>

            {/* CARD */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >

              <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FaTrophy className="text-yellow-600 text-2xl" />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Healthy Competition
              </h3>

              <p className="text-gray-600 leading-7">
                Compete with students across schools and regions
                while improving your academic performance.
              </p>
            </motion.div>

            {/* CARD */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >

              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FaUsers className="text-blue-700 text-2xl" />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Learning Community
              </h3>

              <p className="text-gray-600 leading-7">
                Join a growing community of students,
                mentors, and future innovators learning together.
              </p>
            </motion.div>

            {/* CARD */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >

              <div className="bg-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FaMoneyBillWave className="text-pink-700 text-2xl" />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Student Rewards
              </h3>

              <p className="text-gray-600 leading-7">
                Earn recognition, rewards, and motivation
                for consistent academic excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= AIMS ================= */}
      <section className="py-24 px-6 bg-white">

        <div className="text-center mb-20">

          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-semibold mb-5">
            <FaRocket />
            Our Mission
          </div>

          <h2 className="text-5xl font-black text-gray-900">
            Helping Students
            <span className="block text-green-600">
              Reach Their Potential
            </span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto space-y-24">

          {aims.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >

              {/* IMAGE */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="w-full md:w-1/2 rounded-[32px] overflow-hidden shadow-2xl"
              >
                <img
                  src={a.img}
                  alt="aim"
                  className="w-full h-[380px] object-cover"
                />
              </motion.div>

              {/* TEXT */}
              <div className="w-full md:w-1/2 space-y-6">

                <div className="flex items-center gap-4">

                  <div className="bg-green-100 p-4 rounded-2xl">
                    <a.icon className="text-green-600 text-2xl" />
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900">
                    Aim {i + 1}
                  </h3>
                </div>

                <p className="text-gray-600 text-xl leading-9">
                  {a.text}
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "140px" }}
                  transition={{ duration: 0.8 }}
                  className="h-[4px] bg-green-500 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PLATFORM ================= */}
      <section className="py-24 text-center bg-[#f8fafc] px-6">

        <div className="mb-20">

          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold mb-5">
            <FaLaptopCode />
            Platform Features
          </div>

          <h2 className="text-5xl font-black text-gray-900">
            How ChallengeHub Works
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

          {platform.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-[30px] shadow-lg border border-gray-100"
            >

              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <p.icon className="text-green-600 text-2xl" />
              </div>

              <h3 className="font-bold text-2xl text-gray-900">
                {p.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 px-6 bg-white text-center">

        <div className="mb-20">

          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full text-sm font-semibold mb-5">
            <FaAward />
            Student Benefits
          </div>

          <h2 className="text-5xl font-black text-gray-900">
            Why Students Choose Us
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-8 bg-[#f8fafc] rounded-[30px] shadow-lg border-l-[6px] border-green-500 text-left"
            >

              <div className="bg-white shadow-md w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <f.icon className="text-green-600 text-2xl" />
              </div>

              <h3 className="font-bold text-2xl text-gray-900 mb-4">
                {f.title}
              </h3>

              <p className="text-gray-600 leading-8">
                {f.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
   

      {/* ================= FOOTER SOCIALS ================= */}
      <section className="pb-16">

        <div className="flex justify-center gap-6">

          <a className="bg-green-100 p-4 rounded-2xl text-green-700 hover:scale-110 transition-all">
            <FaWhatsapp size={22} />
          </a>

          <a className="bg-blue-100 p-4 rounded-2xl text-blue-700 hover:scale-110 transition-all">
            <FaFacebook size={22} />
          </a>

          <a className="bg-pink-100 p-4 rounded-2xl text-pink-700 hover:scale-110 transition-all">
            <FaInstagram size={22} />
          </a>

          <a className="bg-blue-100 p-4 rounded-2xl text-blue-800 hover:scale-110 transition-all">
            <FaLinkedin size={22} />
          </a>
        </div>
      </section>
    </div>
  );
}