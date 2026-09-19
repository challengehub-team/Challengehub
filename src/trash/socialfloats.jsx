import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

export default function SocialGridRight() {
  const socials = [
    { icon: FaFacebookF, link: "#" },
    { icon: FaInstagram, link: "#" },
    { icon: FaTwitter, link: "#" },
    { icon: FaLinkedinIn, link: "#" },
    { icon: FaWhatsapp, link: "#" },
    { icon: FaYoutube, link: "#" },
  ];

  return (

     <>
      {/* GRID WRAPPER */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-4"
      >

        {socials.map((item, i) => (
          <motion.a
            key={i}
            href={item.link}
            whileHover={{ y: -6, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-12 h-12 flex items-center justify-center rounded-xl 
                       bg-white/5 border border-white/10 text-green-400
                       hover:bg-green-500/10 hover:border-green-500
                       backdrop-blur-md transition"
          >
            <item.icon className="text-lg" />
          </motion.a>
        ))}

      </motion.div>
     </>
  );
}