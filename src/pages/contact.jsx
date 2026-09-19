import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaUsers,
  FaRocket,
  FaStar,
  FaBookOpen,
  FaPaperPlane,
  FaAward,
  FaArrowRight,
  FaLightbulb,
  FaChalkboardTeacher,
  FaLaptopCode,
} from "react-icons/fa";

import { useState } from "react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success(
      "Thank you for sharing your ChallengeHub experience"
    );

    setFormData({
      name: "",
      email: "",
      category: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc]">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-green-700 to-emerald-900 text-white pt-36 pb-28 px-6">

        {/* BACKGROUND EFFECT */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div>

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2 rounded-full mb-8">
                <FaAward />
                <span className="text-sm font-semibold">
                  ChallengeHub Community
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
                We Build The
                <span className="block text-emerald-300">
                  Future Of Learning
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-200 leading-9 max-w-2xl">
                ChallengeHub empowers students, creators, developers,
                and innovators through real-world challenges,
                project-based learning, mentorship, and collaboration.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-5 mt-10">

                <button className="bg-white text-emerald-700 px-7 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-2xl">
                  Explore Challenges
                  <FaArrowRight />
                </button>

                <button className="border border-white/20 bg-white/10 backdrop-blur-md px-7 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-white/20 transition-all">
                  Learn More
                </button>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-5 mt-16">

                <div>
                  <h2 className="text-4xl font-black">
                    10K+
                  </h2>

                  <p className="text-gray-300 mt-2">
                    Learners
                  </p>
                </div>

                <div>
                  <h2 className="text-4xl font-black">
                    500+
                  </h2>

                  <p className="text-gray-300 mt-2">
                    Challenges
                  </p>
                </div>

                <div>
                  <h2 className="text-4xl font-black">
                    95%
                  </h2>

                  <p className="text-gray-300 mt-2">
                    Satisfaction
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">

              <div className="bg-white/10 border border-white/20 backdrop-blur-2xl rounded-[40px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">

                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"
                  alt="Students"
                  className="rounded-[30px] h-[500px] w-full object-cover"
                />
              </div>

              {/* FLOATING CARD */}
              <div className="absolute -bottom-10 -left-10 bg-white text-slate-900 rounded-3xl p-6 shadow-2xl w-[260px]">

                <div className="flex items-center gap-4">

                  <div className="bg-emerald-100 p-4 rounded-2xl">
                    <FaRocket className="text-emerald-700 text-2xl" />
                  </div>

                  <div>
                    <h4 className="font-black text-2xl">
                      100+
                    </h4>

                    <p className="text-sm text-gray-500">
                      Weekly Challenges
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-5 py-2 rounded-full text-sm font-semibold mb-5">
              <FaStar />
              Why Students Love ChallengeHub
            </div>

            <h2 className="text-5xl font-black text-slate-900 mb-6">
              Learn By Building
            </h2>

            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-8">
              We help learners gain practical skills and confidence
              through hands-on innovation experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* CARD */}
            <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-100 hover:-translate-y-2 transition-all">

              <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FaBookOpen className="text-emerald-700 text-2xl" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-4">
                Project Learning
              </h3>

              <p className="text-gray-600 leading-7">
                Work on practical projects that build real-world experience.
              </p>
            </div>

            {/* CARD */}
            <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-100 hover:-translate-y-2 transition-all">

              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FaUsers className="text-blue-700 text-2xl" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-4">
                Community
              </h3>

              <p className="text-gray-600 leading-7">
                Collaborate with creators, students, and innovators globally.
              </p>
            </div>

            {/* CARD */}
            <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-100 hover:-translate-y-2 transition-all">

              <div className="bg-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FaChalkboardTeacher className="text-pink-700 text-2xl" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-4">
                Mentorship
              </h3>

              <p className="text-gray-600 leading-7">
                Learn directly from experienced mentors and professionals.
              </p>
            </div>

            {/* CARD */}
            <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-100 hover:-translate-y-2 transition-all">

              <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FaLaptopCode className="text-yellow-700 text-2xl" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-4">
                Innovation
              </h3>

              <p className="text-gray-600 leading-7">
                Solve challenges and showcase your creativity and talent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="pb-28 px-6">

        <div className="max-w-7xl mx-auto bg-white rounded-[40px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.08)] grid lg:grid-cols-2">

          {/* LEFT */}
          <div
            className="relative min-h-[850px] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop')",
            }}
          >

            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-slate-950/95" />

            <div className="relative z-10 h-full flex flex-col justify-between p-10 md:p-14 text-white">

              <div>

                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8">
                  <FaLightbulb className="text-yellow-300" />
                  Student Innovation
                </div>

                <h2 className="text-5xl font-black leading-tight mb-6">
                  Tell Us What You Love
                  <span className="block text-emerald-300">
                    About ChallengeHub
                  </span>
                </h2>

                <p className="text-gray-200 text-lg leading-8 max-w-xl">
                  Your feedback helps us improve the learning
                  experience for students and innovators around the world.
                </p>
              </div>

              {/* INFO BOXES */}
              <div className="space-y-5">

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 flex items-center gap-5">
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <FaMapMarkerAlt className="text-emerald-300 text-xl" />
                  </div>

                  <div>
                    <h4 className="font-bold text-lg">
                      Location
                    </h4>

                    <p className="text-gray-300 text-sm">
                      Lagos, Nigeria
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 flex items-center gap-5">
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <FaPhone className="text-blue-300 text-xl" />
                  </div>

                  <div>
                    <h4 className="font-bold text-lg">
                      Phone
                    </h4>

                    <p className="text-gray-300 text-sm">
                      +234 123 456 7890
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 flex items-center gap-5">
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <FaEnvelope className="text-pink-300 text-xl" />
                  </div>

                  <div>
                    <h4 className="font-bold text-lg">
                      Email
                    </h4>

                    <p className="text-gray-300 text-sm">
                      support@challengehub.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-8 md:p-14 flex flex-col justify-center">

            <div className="mb-10">

              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold mb-5">
                <FaStar />
                We Value Your Feedback
              </div>

              <h2 className="text-5xl font-black text-slate-900 mb-5">
                Share Your Experience
              </h2>

              <p className="text-gray-600 text-lg leading-8">
                Tell us your favorite ChallengeHub experience and
                what inspires you most about the platform.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">
                  What do you love most?
                </option>

                <option>
                  Challenges & Competitions
                </option>

                <option>
                  Project-Based Learning
                </option>

                <option>
                  Mentorship & Guidance
                </option>

                <option>
                  Learning Community
                </option>

                <option>
                  Career Opportunities
                </option>
              </select>

              <textarea
                name="message"
                placeholder="Tell us about your favorite ChallengeHub experience..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none h-44"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-green-700 text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.01] transition-all duration-300 shadow-xl hover:shadow-emerald-300/40 flex items-center justify-center gap-3"
              >
                <FaPaperPlane />
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;