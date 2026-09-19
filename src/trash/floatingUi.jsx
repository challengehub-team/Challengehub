import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaArrowUp,
} from "react-icons/fa";

export default function FloatingUI() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    {
      icon: FaWhatsapp,
      link: "#",
      color: "text-green-500",
      hover: "hover:bg-green-100",
    },
    {
      icon: FaFacebookF,
      link: "#",
      color: "text-blue-600",
      hover: "hover:bg-blue-100",
    },
    {
      icon: FaInstagram,
      link: "#",
      color: "text-pink-500",
      hover: "hover:bg-pink-100",
    },
    {
      icon: FaLinkedinIn,
      link: "#",
      color: "text-blue-700",
      hover: "hover:bg-blue-100",
    },
    {
      icon: FaTiktok,
      link: "#",
      color: "text-black",
      hover: "hover:bg-gray-100",
    },
    {
      icon: FaYoutube,
      link: "#",
      color: "text-red-600",
      hover: "hover:bg-red-100",
    },
  ];

  return (
    <>
      {/* ================= LEFT SOCIAL BAR ================= */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">

        {socials.map((s, i) => (
          <motion.a
            key={i}
            href={s.link}
            target="_blank"
            whileHover={{ scale: 1.2, x: 6 }}
            whileTap={{ scale: 0.9 }}
            className={`w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 transition ${s.color} ${s.hover}`}
          >
            <s.icon />
          </motion.a>
        ))}

      </div>

      {/* ================= SCROLL TO TOP ================= */}
      {showTop && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed right-5 bottom-6 z-50 w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </>
  );
}