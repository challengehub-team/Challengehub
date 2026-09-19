import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Administrations", path: "/administrations" },
    { name: "Login", path: "/login" },
  ];

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 mb-10 w-full bg-white border-b shadow-sm z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border">
            <img src="/logo.jpg" className="w-full h-full object-cover" />
          </div>

          <span className="font-light tracking-wide text-lg">
            Challengehub
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-800">
          {links.map((l, i) => (
            <Link
              key={i}
              to={l.path}
              className="relative group cursor-pointer"
            >
              {l.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* CTA (DESKTOP) */}
        <div className="hidden md:flex items-center gap-3">
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-green-500"
          >
            <FaArrowRight />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            className="bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition"
          >
            <Link to="/signup">Get Started</Link>
          </motion.button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="flex flex-col items-center gap-6 py-6">

              {links.map((l, i) => (
                <Link
                  key={i}
                  to={l.path}
                  onClick={() => setOpen(false)}
                  className="text-gray-800 font-medium hover:text-green-500 transition"
                >
                  {l.name}
                </Link>
              ))}

              {/* MOBILE CTA */}
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="bg-green-500 text-white px-6 py-2 rounded-full"
              >
                Get Started
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}