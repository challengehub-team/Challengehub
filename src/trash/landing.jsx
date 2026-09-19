import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaMoneyBillWave,
    FaBookOpen,
    FaTrophy,
    FaChartLine,
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaWhatsapp,
    FaUsers,
    FaLightbulb
} from "react-icons/fa";
import Features from "./features";
import Hero from "./hero";
import Aims from "./aims";
import PlatForm from "./platfrom";
import Navbar from "../components/navbar";
import SocialGridRight from "./socialfloats";
import SocialContact from "../components/footer";

/* Typing effect */
function useTyping(text, speed = 80) {
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

export default function Landing() {
    const typed = useTyping("Welcome to Challengehub");


    return (

              <div>
                <Navbar />
                <Aims />
                <SocialContact />
              </div>
            );

}