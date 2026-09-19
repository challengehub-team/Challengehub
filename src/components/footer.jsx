import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-white text-gray-800 pt-20 pb-10 overflow-hidden">

      {/* SOFT BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] bg-green-100 blur-[140px] top-[-120px] left-[-120px]" />
        <div className="absolute w-[400px] h-[400px] bg-green-50 blur-[140px] bottom-[-120px] right-[-120px]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-12 px-6">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Challengehub
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed">
            A modern academic platform where students learn, compete, and earn
            through knowledge-based challenges and quizzes.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Quick Pages</h3>

          <ul className="space-y-3 text-gray-500 text-sm">
            {["Home", "About", "Login", "Signup", "Dashboard"].map((item) => (
              <li
                key={item}
                className="hover:text-green-500 cursor-pointer transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Contact</h3>

          <div className="space-y-4 text-gray-500 text-sm">

            <div className="flex items-center gap-3">
              <FaPhone className="text-green-500" />
              <span>+234 000 000 0000</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-green-500" />
              <span>support@challengehub.com</span>
            </div>

            <div className="flex items-center gap-3">
              <FaWhatsapp className="text-green-500" />
              <span>WhatsApp Support</span>
            </div>

          </div>
        </div>

      </div>

      {/* SOCIAL ICONS */}
      <div className="relative z-10 mt-14 flex justify-center gap-6">

        {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaWhatsapp].map(
          (Icon, i) => (
            <a
              key={i}
              href="#"
              className="p-3 rounded-full bg-green-50 border border-green-100 text-green-600 hover:bg-green-100 hover:scale-110 transition"
            >
              <Icon />
            </a>
          )
        )}

      </div>

      {/* BOTTOM TEXT */}
      <div className="relative z-10 text-center mt-10 text-gray-400 text-xs">
        © {new Date().getFullYear()} Challengehub. All rights reserved.
      </div>

    </footer>
  );
}