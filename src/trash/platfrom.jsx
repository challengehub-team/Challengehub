import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaTrophy,
  FaMoneyBillWave,
  FaChartLine,
} from "react-icons/fa";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0 },
};

export default function PlatForm() {
  return (
    <section className="py-28 md:px-20 bg-black relative overflow-hidden">

      {/* SOFT BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute w-[400px] h-[400px] bg-green-500/10 blur-[140px] top-[-120px] left-[-120px]" />
      </div>

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-light text-center text-white mb-16 tracking-wide"
      >
        Platform Features
      </motion.h2>

      {/* GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8"
      >

        {[
          { icon: FaBookOpen, title: "Practice Tests" },
          { icon: FaTrophy, title: "Competitions" },
          { icon: FaMoneyBillWave, title: "Earn Rewards" },
          { icon: FaChartLine, title: "Progress Tracking" },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="group relative flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden"
          >

            {/* ICON */}
            <item.icon className="text-green-400 text-3xl transition group-hover:scale-110" />

            {/* TITLE (THIN TEXT NOW) */}
            <p className="text-white/80 font-light text-lg tracking-wide">
              {item.title}
            </p>

            {/* UNDERLINE EFFECT */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-green-500 group-hover:w-full transition-all duration-300" />

          </motion.div>
        ))}

      </motion.div>
    </section>
  );
}