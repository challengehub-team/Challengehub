import { motion } from "framer-motion";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";


function Nav({ setSidebarOpen }) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 w-full bg-white border-b shadow-sm z-50"
    >
      <div className="flex items-center justify-between px-6 py-3">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            className="w-10 h-10 rounded-full border"
          />
          <div>
            <h1 className="font-bold text-green-700">
              Challengehub AI
            </h1>
            <p className="text-xs text-gray-500">
              Student Intelligence System
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          <button className="relative">
            <FaBell className="text-gray-600 text-lg" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
          </button>

          <FaUserCircle className="text-2xl text-gray-600" />

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-xl text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>

        </div>
      </div>
    </motion.nav>
  );
}

export default Nav