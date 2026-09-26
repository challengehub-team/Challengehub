import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaList,
  FaSchool
} from "react-icons/fa";
import { SelectInput } from "../components/selectinput";

/* INPUT */
const Input = ({ icon, ...props }) => (
  <div className="flex items-center border rounded-lg px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-green-500 transition">
    {icon}
    <input {...props} className="w-full p-3 bg-transparent outline-none" />
  </div>
);

export default function Signup() {
  const [form, setForm] = useState({
    surname: "",
    otherNames: "",
    email: "",
    password: "",
    confirmPassword: "",
    category: "",
    school: "",
    state: "",
    lga: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* SAFE CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "surname",
      "otherNames",
      "email",
      "password",
      "confirmPassword",
      "phone",
      "school",
      "state",
      "lga",
      "category",
    ];

    const missing = requiredFields.find((field) => !form[field]);
    if (missing) return toast.error("Please fill all fields");

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://challengehub-backend-o6ok.onrender.com/api/auth/signup",
        {
          surname: form.surname,
          otherNames: form.otherNames,
          email: form.email,
          password: form.password,
          category: form.category,
          state: form.state,
          school: form.school,
          lga: form.lga,
          phone: form.phone,
        }
      );

      if (!res.data?.success) {
        return toast.error(res.data?.message || "Signup failed ❌");
      }

      toast.success(res.data.message || "Account created 🎉");

      /* RESET */
      setForm({
        surname: "",
        otherNames: "",
        email: "",
        password: "",
        confirmPassword: "",
        category: "",
        state: "",
        lga: "",
        phone: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-24 flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1603575448360-153f093fd0b6')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl grid md:grid-cols-2 overflow-hidden">

        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-center items-center text-white p-10 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')",
            }}
          />
          <div className="absolute inset-0 bg-green-700/70"></div>

          <div className="relative text-center">
            <h1 className="text-3xl font-bold">
              African Students Learning Together
            </h1>
            <p className="text-sm opacity-90 mt-2">
              Build your future with Challengehub
            </p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">

          <div className="flex justify-center">
            <img
              src="/logo.jpg"
              alt="logo"
              className="w-16 h-16 rounded-full border"
            />
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800">
            Welcome to Challengehub
          </h2>

          <p className="text-center text-sm text-gray-500">
            Join African students across schools
          </p>

          {/* SURNAME */}
          <Input
            icon={<FaUser className="text-gray-500 mr-2" />}
            name="surname"
            placeholder="Surname"
            value={form.surname}
            onChange={handleChange}
          />

          {/* OTHER NAMES */}
          <Input
            icon={<FaUser className="text-gray-500 mr-2" />}
            name="otherNames"
            placeholder="Other names"
            value={form.otherNames}
            onChange={handleChange}
          />

          {/* EMAIL */}
          <Input
            icon={<FaSchool className="text-gray-500 mr-2" />}
            name="school"
            type="text"
            placeholder="School"
            value={form.school}
            onChange={handleChange}
          />

          {/* EMAIL */}
          <Input
            icon={<FaEnvelope className="text-gray-500 mr-2" />}
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          {/* CATEGORY */}
          <SelectInput
            icon={<FaList className="text-gray-500 mr-2" />}
            name="category"
            value={form.category}
            onChange={handleChange}
            options={[
              { label: "Select Category", value: "" },
              { label: "Junior Category", value: "Junior" },
              { label: "Senior Science Category", value: "Senior Science" },
              { label: "Senior Art Category", value: "Senior Art" },
            ]}
          />

          {/* PHONE / STATE / LGA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              icon={<FaPhone className="text-gray-500 mr-2" />}
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />

            <Input
              icon={<FaMapMarkerAlt className="text-gray-500 mr-2" />}
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
            />

            <Input
              icon={<FaMapMarkerAlt className="text-gray-500 mr-2" />}
              name="lga"
              placeholder="LGA"
              value={form.lga}
              onChange={handleChange}
            />
          </div>

          {/* PASSWORD */}
          <div className="flex items-center border rounded-lg px-3 bg-gray-50">
            <FaLock className="text-gray-500 mr-2" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 bg-transparent outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex items-center border rounded-lg px-3 bg-gray-50">
            <FaLock className="text-gray-500 mr-2" />
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 bg-transparent outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>


          {/* LOGIN */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/Login" className="text-green-600 font-medium">
              Login
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
      </div>
    </div>
  );
}