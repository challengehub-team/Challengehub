import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🔴 validation
        if (!form.email || !form.password) {
            return toast.error("Please fill all fields");
        }

        try {
            setLoading(true);

            const res = await axios.post(
                "https://challengehub-backend.onrender.com/api/auth/login",
                {
                    email: form.email,
                    password: form.password,
                }
            );

            // 🔴 backend error safety
            if (!res.data?.success && res.data?.message) {
                return toast.error(res.data.message);
            }

            else {

                // 🔥 SAVE TOKEN
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.userId);
              

                // 🟢 SUCCESS
                toast.success(res.data.message || "Login successful 🚀");

                navigate("/dashboard")


               /*  console.log("USER DATA:", res.data); */

            }

        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Login failed ❌";

            toast.error(message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">

            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">

                {/* LEFT IMAGE SIDE */}
                <div className="hidden md:block relative">

                    <img
                        src="https://images.unsplash.com/photo-1509062522246-3755977927d7"
                        alt="students reading"
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-green-700/60 flex flex-col justify-center items-center text-white p-10 text-center">
                        <h1 className="text-3xl font-bold">
                            Learn. Grow. Succeed.
                        </h1>

                        <p className="text-sm mt-2 opacity-90">
                            African students building a brighter future with Challengehub
                        </p>
                    </div>
                </div>

                {/* RIGHT FORM */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-10 flex flex-col justify-center"
                >

                    {/* LOGO */}
                    <div className="flex justify-center mb-4">
                        <img
                            src="/logo.jpg"
                            className="w-14 h-14 rounded-full border"
                        />
                    </div>

                    <h1 className="text-2xl font-bold text-center text-gray-800">
                        Welcome Back
                    </h1>

                    <p className="text-center text-sm text-gray-500 mt-1">
                        Secure AI-powered login system
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">

                        {/* EMAIL */}
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-4 text-gray-400" />

                            <input
                                name="email"
                                type="email"
                                placeholder="Email address"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="relative">
                            <FaLock className="absolute left-3 top-4 text-gray-400" />

                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-4 text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* FORGOT PASSWORD */}
                        <div className="text-right">
                            <a href="#" className="text-sm text-green-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
                        >
                            {loading ? "Signing in..." : "Login"}
                        </button>

                        {/* SIGNUP */}
                        <p className="text-center text-sm text-gray-500">
                            Don’t have an account?{" "}
                            <a href="/signup" className="text-green-600 font-medium">
                                Sign up
                            </a>
                        </p>

                        {/* AI TEXT */}
                        <motion.p
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-center text-xs text-gray-400 mt-3"
                        >
                            AI-secured authentication system
                        </motion.p>

                    </form>
                </motion.div>
            </div>
        </div>
    );
}