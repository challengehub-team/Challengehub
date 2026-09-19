import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function DashboardFooter() {
  return (
    <footer className="bg-gradient-to-r from-green-700 to-indigo-800 text-white mt-16">

      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* BRAND SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/logo.jpg"
              className="w-10 h-10 rounded-full border"
              alt="logo"
            />
            <h2 className="text-xl font-bold">Challengehub</h2>
          </div>

          <p className="text-white/80 text-sm leading-relaxed">
            Empowering African students with competitive learning,
            real-time challenges, and AI-powered education tools.
          </p>
        </motion.div>

        {/* QUICK LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-white/80 text-sm">
            <li className="hover:text-white cursor-pointer transition">Dashboard</li>
            <li className="hover:text-white cursor-pointer transition">Challenges</li>
            <li className="hover:text-white cursor-pointer transition">Leaderboard</li>
            <li className="hover:text-white cursor-pointer transition">Profile</li>
          </ul>
        </motion.div>

        {/* CONTACT / SOCIAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="font-semibold mb-4">Connect With Us</h3>

          <div className="flex gap-4 text-xl mb-4">
            <FaFacebook className="hover:text-green-300 cursor-pointer transition" />
            <FaTwitter className="hover:text-green-300 cursor-pointer transition" />
            <FaInstagram className="hover:text-green-300 cursor-pointer transition" />
            <FaEnvelope className="hover:text-green-300 cursor-pointer transition" />
          </div>

          <p className="text-white/70 text-sm">
            support@challengehub.com
          </p>
        </motion.div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/20 py-4 text-center text-white/70 text-sm">
        © {new Date().getFullYear()} Challengehub. All rights reserved.
      </div>
    </footer>
  );
}