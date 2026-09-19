import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBook,
  FaFlask,
  FaCalculator,
  FaGraduationCap,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function FreeTestPage() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const juniorSubjects = [
    { name: "Basic Mathematics", icon: <FaCalculator /> },
    { name: "Basic Science", icon: <FaFlask /> },
  ];

  const seniorSubjects = [
    { name: "Mathematics", icon: <FaCalculator /> },
    { name: "Physics", icon: <FaFlask /> },
    { name: "Chemistry", icon: <FaFlask /> },
    { name: "Biology", icon: <FaBook /> },
    { name: "Science (All)", icon: <FaGraduationCap /> },
  ];

  const difficulties = ["Easy", "Medium", "Hard"];

  const getSubjects = () => {
    if (category === "Junior") return juniorSubjects;
    if (category === "Senior") return seniorSubjects;
    return [];
  };

  const startTest = () => {
    if (!category || !subject || !difficulty) {
       toast.error("Please select all fields");
    }

    navigate("/exam", {
      state: { category, subject, difficulty },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-6">
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl font-bold text-green-700">
            Free Test Platform
          </h1>

          <p className="text-gray-600 mt-3">
            Choose your level, select subjects, and test your knowledge.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1588072432836-e10032774350"
            className="rounded-2xl shadow-xl w-full"
          />
        </motion.div>
      </div>

      {/* SELECTION */}
      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-6">

        <Card title="Select Level">
          <SelectButton
            label="Junior"
            active={category === "Junior"}
            onClick={() => {
              setCategory("Junior");
              setSubject("");
            }}
          />
          <SelectButton
            label="Senior"
            active={category === "Senior"}
            onClick={() => {
              setCategory("Senior");
              setSubject("");
            }}
          />
        </Card>

        <Card title="Select Subject">
          {getSubjects().map((s, i) => (
            <SelectButton
              key={i}
              label={s.name}
              icon={s.icon}
              active={subject === s.name}
              onClick={() => setSubject(s.name)}
            />
          ))}
        </Card>

        <Card title="Difficulty">
          {difficulties.map((d, i) => (
            <SelectButton
              key={i}
              label={d}
              icon={<FaStar />}
              active={difficulty === d}
              onClick={() => setDifficulty(d)}
            />
          ))}
        </Card>
      </div>

      {/* START */}
      <div className="text-center mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={startTest}
          className="bg-green-600 text-white px-10 py-3 rounded-xl font-semibold"
        >
          Start Test
        </motion.button>
      </div>
    </div>
  );
}

/* CARD */
function Card({ title, children }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

/* BUTTON */
function SelectButton({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-4 py-2 rounded ${
        active ? "bg-green-600 text-white" : "bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}