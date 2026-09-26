import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FaHome,
  FaUser,
  FaBars,
  FaTimes,
  FaBell,
  FaTrophy,
  FaBolt,
  FaCog,
  FaWallet,
  FaUsers
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate for safe manual route redirecting
import LogoutIcon from "./logoutIcons";

export default function NavbarandAside() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Hook initializer

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "Challenge", path: "/challenge", icon: <FaBolt /> },
/*     { name: "Payments", path: "/pay", icon: <FaWallet /> }, */
    { name: "Leaderboard", path: "/leaderboard", icon: <FaTrophy /> },
    {  name: "Community",  path: "/community", icon: <FaUsers /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
    { name: "Logout", path: "/", icon: <LogoutIcon />, isLogout: true }, // Added flag identifier to decouple logout clicks
  ];

  // CENTRAL LOGOUT CONTROLLER FUNCTION ACTION
  const handleLogoutAction = async () => {
       try {
    const userId = localStorage.getItem("userId");
      await axios.post(
        "http://localhost:3000/api/auth/signout",
        { "uid": userId}, // body (empty if you don’t need to send anything)
      /*   {
          withCredentials: true, // important if using cookies/session
        } */
      );

     localStorage.clear(); // 👈 Wipes out all session context keys (Token, Email, Name) completely
        
    setOpen(false); // Closes the mobile layout sidebar drawer if it was active
    
      // Redirect to home page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }

  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ================= TOP NAVBAR ================= */}
      <div className="fixed top-0 left-0 w-full bg-white border-b shadow-sm z-50">
        <div className="flex items-center justify-between px-5 py-3">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.jpg"
              alt="logo"
              className="w-9 h-9 rounded-full border"
            />
            <h1 className="font-bold text-green-700">
              Dashboard
            </h1>
          </div>

          {/* ================= DESKTOP ICON NAV ================= */}
          <div className="hidden md:flex items-center gap-3">
            {links.map((link, i) => {
              // Condition to isolate the logout item element action link button
              if (link.isLogout) {
                return (
                  <button
                    key={i}
                    onClick={handleLogoutAction} // 👈 Triggers standard cleanup logic workflow
                    title={link.name}
                    className="relative group p-3 mx-4 rounded-xl text-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                  >
                    {link.icon}
                    <span className="absolute left-1/2 -translate-x-1/2 top-14 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 bg-black text-white text-xs px-3 py-1 rounded-md whitespace-nowrap pointer-events-none z-50">
                      {link.name}
                    </span>
                  </button>
                );
              }

              // Standard Navigation Layout Links
              return (
                <Link
                  key={i}
                  to={link.path}
                  title={link.name}
                  className={`relative group p-3 mx-4 rounded-xl text-lg transition-all duration-300 ${
                    isActive(link.path)
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-green-600"
                  }`}
                >
                  {link.icon}
                  <span className="absolute left-1/2 -translate-x-1/2 top-14 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 bg-black text-white text-xs px-3 py-1 rounded-md whitespace-nowrap pointer-events-none z-50">
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* ================= RIGHT SECTION ================= */}
          <div className="flex items-center gap-4">
         {/*    <button className="relative">
              <FaBell className="text-gray-600 text-lg cursor-pointer hover:text-green-600 transition" />
            </button> */}

            <button
              className="md:hidden text-xl text-gray-700"
              onClick={() => setOpen(true)}
            >
              <FaBars size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />

            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "tween" }}
              className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl p-5"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <img
                    src="/logo.jpg"
                    alt="logo"
                    className="w-10 h-10 rounded-full border"
                  />
                  <span className="font-bold text-green-700 text-lg">
                    Challengehub
                  </span>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-600 text-xl"
                >
                  <FaTimes />
                </button>
              </div>

              {/* LINKS */}
              <div className="space-y-2">
                {links.map((link, i) => {
                  // Mobile side item logout action conditional node injection point
                  if (link.isLogout) {
                    return (
                      <button
                        key={i}
                        onClick={handleLogoutAction} // 👈 Triggers cleanup workflow on touch
                        className="w-full flex items-center gap-4 p-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all text-left"
                      >
                        <span className="text-lg">{link.icon}</span>
                        <span className="font-medium">{link.name}</span>
                      </button>
                    );
                  }

                  // Normal links item display nodes loop
                  return (
                    <Link
                      key={i}
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                        isActive(link.path)
                          ? "bg-green-100 text-green-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-lg">{link.icon}</span>
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* FOOTER */}
              <div className="absolute bottom-5 left-5 text-xs text-gray-400">
                Challengehub Dashboard v1.0
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
