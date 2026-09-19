import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectExam() {
const navigate = useNavigate();

const [form, setForm] = useState({
category: "junior",
subject: "all",
difficulty: "easy",
});

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const startExam = () => {
navigate("/exam", { state: form });
};

return ( <div className="min-h-screen pt-24 bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4"> <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl space-y-6">


    <h1 className="text-3xl font-bold text-center text-green-700">
      Choose Your Exam
    </h1>

    {/* CATEGORY */}
    <div>
      <label className="font-semibold">Category</label>
      <select
        name="category"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mt-2"
      >
        <option value="junior">Junior</option>
        <option value="senior">Senior</option>
      </select>
    </div>

    {/* SUBJECT */}
    <div>
      <label className="font-semibold">Subject</label>
      <select
        name="subject"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mt-2"
      >
        <option value="all">All Subjects</option>
        <option value="math">Mathematics</option>
        <option value="science">Science</option>
        <option value="physics">Physics</option>
        <option value="arts">Arts</option>
      </select>
    </div>

    {/* DIFFICULTY */}
    <div>
      <label className="font-semibold">Difficulty</label>
      <select
        name="difficulty"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mt-2"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>

    <button
      onClick={startExam}
      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
    >
      Start Exam
    </button>
  </div>
</div>

);
}
