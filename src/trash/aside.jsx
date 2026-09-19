import { motion } from "framer-motion";
import {
  FaHome,
  FaUser,
  FaChartBar,
  FaBook,
  FaCrown,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const menu = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Analytics", icon: <FaChartBar />, path: "/analytics" },
    { name: "Quiz", icon: <FaBook />, path: "/quiz" },
    { name: "Leaderboard", icon: <FaCrown />, path: "/leaderboard" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white border-r shadow-lg p-5
        ${open ? "block" : "hidden md:block"}`}
      >

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/logo.jpg"
            className="w-10 h-10 rounded-full border"
          />
          <div>
            <h2 className="font-bold text-green-700">
              Challengehub
            </h2>
            <p className="text-xs text-gray-500">AI Panel</p>
          </div>
        </div>

        {/* MENU */}
        <div className="space-y-2">

          {menu.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 text-gray-700 transition"
            >
              <span className="text-green-600">{item.icon}</span>
              {item.name}
            </Link>
          ))}

        </div>

        {/* LOGOUT */}
        <button className="mt-10 flex items-center gap-2 text-red-500 hover:text-red-600">
          <FaSignOutAlt />
          Logout
        </button>
      </motion.aside>
    </>
  );
}