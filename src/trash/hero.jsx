import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* Typing hook */
function useTyping(text, speed = 70) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text]);

  return display;
}

export default function Hero() {
  const typed = useTyping("Welcome to Challengehub");

  return (
    <>

      {/* SOFT BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-green-500/10 blur-[140px] top-[-120px] left-[-120px]" />
        <div className="absolute w-[400px] h-[400px] bg-green-400/10 blur-[140px] bottom-[-120px] right-[-120px]" />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 text-center max-w-3xl">

        {/* TYPOGRAPHY (LIGHT / THIN FEEL) */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-light tracking-wide leading-tight"
        >
          {typed}
          <span className="text-green-400 animate-pulse">|</span>
        </motion.h1>

        {/* SUB TEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-gray-400 text-base md:text-lg font-light leading-relaxed"
        >
          An intelligent academic platform for learning, practicing,
          competing, and building real skills through interactive challenges.
        </motion.p>

        {/* DECORATIVE LINE */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="h-[2px] bg-green-500 mx-auto mt-10 rounded-full"
        />

        {/* FLOAT IN TEXT BELOW */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-6 text-sm text-gray-500 tracking-[4px]"
        >
          LEARN • COMPETE • GROW
        </motion.p>

      </div>

      {/* SUBTLE FLOATING LIGHT EFFECT */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute bottom-10 text-green-400/30 text-xs tracking-[6px]"
      >
        CHALLENGEHUB
      </motion.div>

    </>
  );
}