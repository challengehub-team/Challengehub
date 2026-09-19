import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 },
};

export default function Aims() {
  return (
    <section className="py-28 px-6 md:px-20 bg-black relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute w-[400px] h-[400px] bg-green-500/10 blur-[140px] top-[-120px] left-[-120px]" />
      </div>

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-light tracking-wide text-center text-white mb-20"
      >
        Our Aims
      </motion.h2>

      {/* CONTENT */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto space-y-10"
      >

        {/* AIM 1 */}
        <motion.div variants={item} className="group relative pl-6">
          <div className="absolute left-0 top-0 h-full w-[2px] bg-green-500/40 group-hover:bg-green-400 transition" />
          <p className="text-gray-300 font-light text-lg md:text-xl leading-relaxed">
            Provide students with a platform to practice academic questions and improve learning outcomes.
          </p>
        </motion.div>

        {/* AIM 2 */}
        <motion.div variants={item} className="group relative pl-6">
          <div className="absolute left-0 top-0 h-full w-[2px] bg-green-500/40 group-hover:bg-green-400 transition" />
          <p className="text-gray-300 font-light text-lg md:text-xl leading-relaxed">
            Encourage healthy competition through quizzes and performance-based ranking systems.
          </p>
        </motion.div>

        {/* AIM 3 */}
        <motion.div variants={item} className="group relative pl-6">
          <div className="absolute left-0 top-0 h-full w-[2px] bg-green-500/40 group-hover:bg-green-400 transition" />
          <p className="text-gray-300 font-light text-lg md:text-xl leading-relaxed">
            Reward knowledge and consistency through structured earning opportunities.
          </p>
        </motion.div>

        {/* AIM 4 */}
        <motion.div variants={item} className="group relative pl-6">
          <div className="absolute left-0 top-0 h-full w-[2px] bg-green-500/40 group-hover:bg-green-400 transition" />
          <p className="text-gray-300 font-light text-lg md:text-xl leading-relaxed">
            Make learning interactive, engaging, and accessible to all students.
          </p>
        </motion.div>

      </motion.div>

    </section>
  );
}