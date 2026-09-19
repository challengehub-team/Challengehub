import { motion } from "framer-motion";
import {
  FaTrophy,
  FaBookOpen,
  FaChartLine,
  FaUsers,
  FaMoneyBillWave,
  FaLightbulb,
  FaAd,
  Fa500Px,
  FaAdjust,
  FaAccessibleIcon,
  FaAccusoft,
  FaAmericanSignLanguageInterpreting,
  FaPlaneDeparture,
} from "react-icons/fa";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Features() {
  return (
    <>

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute w-[450px] h-[450px] bg-green-500/10 blur-[140px] top-[-120px] left-[-120px]" />
        <div className="absolute w-[450px] h-[450px] bg-green-400/10 blur-[140px] bottom-[-140px] right-[-140px]" />
      </div>

      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 relative z-10"
      >
        <h3 className="text-3xl md:text-5xl font-light tracking-wide text-white">
          Why Choose <span className="text-green-500">Challengehub?</span>
        </h3>

        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm md:text-base font-light">
          A modern academic platform built for learning, competition, and continuous skill growth.
        </p>
      </motion.div>

      {/* GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
      >

        {[
          {
            icon: FaTrophy,
            title: "Compete & Earn",
            text: "Join quizzes, compete globally, and earn rewards based on your performance.",
          },
          {
            icon: FaBookOpen,
            title: "Practice Tests",
            text: "Access unlimited academic tests to strengthen your knowledge anytime.",
          },
          {
            icon: FaChartLine,
            title: "Track Progress",
            text: "Visual analytics help you understand and improve your performance.",
          },
          {
            icon: FaUsers,
            title: "Community Learning",
            text: "Learn together with students and grow through collaboration.",
          },
          {
            icon: FaMoneyBillWave,
            title: "Earn from Skills",
            text: "Turn knowledge into structured earning opportunities.",
          },
          {
            icon: FaLightbulb,
            title: "Skill Growth",
            text: "Build critical thinking and academic excellence daily.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{
              y: -10,
              scale: 1.03,
              transition: { type: "spring", stiffness: 180 },
            }}
            className="group relative p-7 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition overflow-hidden"
          >

            {/* ICON */}
            <item.icon className="text-green-500 text-3xl mb-5 group-hover:scale-110 transition" />

            {/* TITLE (THIN NOW) */}
            <h4 className="text-white font-light text-lg tracking-wide mb-2">
              {item.title}
            </h4>

            {/* TEXT (THIN + SOFT) */}
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              {item.text}
            </p>

            {/* HOVER LINE ANIMATION */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-green-500 group-hover:w-full transition-all duration-300" />

            {/* SOFT GLOW ON HOVER */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-green-500/5 transition duration-300" />

          </motion.div>
        ))}

      </motion.div>
    </>
  );
}