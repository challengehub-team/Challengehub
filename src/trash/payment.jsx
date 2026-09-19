import { motion } from "framer-motion";
import { useState } from "react";
import { FaCheckCircle, FaCrown, FaLock } from "react-icons/fa";
import axios from "axios";

export default function PaymentPage() {
    const [loading, setLoading] = useState(false);

    const plans = [
        {
            name: "Basic Access",
            price: "₦1,000",
            desc: "Perfect for getting started",
            features: [
                "Access to free tests",
                "Basic leaderboard ranking",
                "Limited challenges",
            ],
            color: "from-gray-100 to-gray-200",
            text: "text-gray-700",
        },
        {
            name: "Pro Student",
            price: "₦3,000",
            desc: "Most popular for serious students",
            features: [
                "All tests unlocked",
                "Full leaderboard access",
                "Group challenges",
                "AI performance insights",
            ],
            color: "from-green-500 to-green-700",
            text: "text-white",
            highlight: true,
        },
        {
            name: "Elite Champion",
            price: "₦5,000",
            desc: "For top competitors",
            features: [
                "Everything in Pro",
                "Priority ranking boost",
                "Exclusive competitions",
                "Certificates & rewards",
            ],
            color: "from-indigo-600 to-purple-700",
            text: "text-white",
        },
    ];



    const handlePay = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/payment/initialize",
                {
                    email: "great@gmail.com",
                    amount: 5000,
                }
            );

            window.location.href = res.data.authorization_url;
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">

            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <h1 className="text-3xl font-bold text-green-700">
                    Unlock Your Full Potential
                </h1>

                <p className="text-gray-500 mt-2">
                    Choose a plan to unlock premium challenges and rankings
                </p>

                <div className="flex justify-center items-center gap-2 mt-3 text-sm text-gray-500">
                    <FaLock />
                    Secure AI-powered payment system (coming soon integration)
                </div>
            </motion.div>

            {/* PLANS */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

                {plans.map((plan, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`rounded-2xl shadow-lg p-6 bg-gradient-to-br ${plan.color} ${plan.text} relative overflow-hidden`}
                    >

                        {plan.highlight && (
                            <div className="absolute top-4 right-4 bg-white text-green-600 text-xs px-3 py-1 rounded-full font-semibold">
                                Popular
                            </div>
                        )}

                        <FaCrown className="text-2xl mb-3 opacity-90" />

                        <h2 className="text-xl font-bold">{plan.name}</h2>
                        <p className="text-sm opacity-80">{plan.desc}</p>

                        <h3 className="text-3xl font-extrabold mt-4">
                            {plan.price}
                        </h3>

                        <ul className="mt-4 space-y-2 text-sm">
                            {plan.features.map((f, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <FaCheckCircle />
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handlePay()}
                            disabled={loading}
                            className="mt-6 w-full bg-white text-gray-800 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                        >
                            {loading ? "Processing..." : "Pay Now"}
                        </button>
                    </motion.div>
                ))}

            </div>

            {/* FOOT NOTE */}
            <p className="text-center text-xs text-gray-400 mt-10">
                Payments are securely processed and linked to your Challengehub account.
            </p>
        </div>
    );
}