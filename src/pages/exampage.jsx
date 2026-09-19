import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiClock,
  FiLoader,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ExamPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [submitting, setSubmitting] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const navigate = useNavigate();

  // Fetch Questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          "https://opentdb.com/api.php?amount=10&category=19&type=multiple"
        );

        setQuestions(res.data.results);
      } catch (err) {
        toast.error("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const question = questions[currentIndex];

  // Shuffle once per question
  useEffect(() => {
    if (!question) return;

    const opts = [
      ...question.incorrect_answers,
      question.correct_answer,
    ].sort(() => Math.random() - 0.5);

    setShuffledOptions(opts);
  }, [currentIndex, question]);

  // Timer
  useEffect(() => {
    if (loading) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          setTimeout(() => {
            handleSubmit();
          }, 100);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading]);

  const handleSelect = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: answer,
    }));

    // Auto move to next question
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 250);
  };

  const handleSubmit = () => {
    if (submitting) return;

    setSubmitting(true);

    let score = 0;

    questions.forEach((q, i) => {
      if (answers[i] === q.correct_answer) {
        score++;
      }
    });

    const percent = Math.round(
      (score / questions.length) * 100
    );

    navigate("/results", {
      state: {
        score,
        total: questions.length,
        percent,
        timeUsed: 300 - timeLeft,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
        <FiLoader className="animate-spin text-5xl text-green-600" />
        <p className="mt-4 text-lg font-semibold">
          Loading Quiz...
        </p>
      </div>
    );
  }

  const progress =
    ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-4 md:p-8">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-6">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="flex justify-between items-center">

            <h1 className="text-3xl font-bold text-green-700">
              Quiz Challenge 🚀
            </h1>

            <div
              className={`flex items-center gap-2 font-bold text-lg ${
                timeLeft < 30
                  ? "text-red-600 animate-pulse"
                  : "text-green-700"
              }`}
            >
              <FiClock />

              {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60)
                .toString()
                .padStart(2, "0")}
            </div>
          </div>

          <div className="flex justify-between mt-4 text-sm font-medium">
            <span>
              Question {currentIndex + 1} of{" "}
              {questions.length}
            </span>

            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-3 mt-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Answered {Object.keys(answers).length} of{" "}
            {questions.length}
          </p>
        </div>
      </div>

      {/* QUESTION CARD */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-6">

        <h2
          className="text-2xl font-semibold mb-8 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: question.question,
          }}
        />

        <div className="grid gap-4">

          {shuffledOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                answers[currentIndex] === option
                  ? "border-green-600 bg-green-50 text-green-700 font-bold scale-[1.02]"
                  : "border-gray-200 hover:border-green-400 hover:bg-green-50"
              }`}
              dangerouslySetInnerHTML={{
                __html: option,
              }}
            />
          ))}

        </div>

        {/* NAVIGATION */}
        <div className="grid grid-cols-2 gap-4 mt-8">

          <button
            disabled={currentIndex === 0}
            onClick={() =>
              setCurrentIndex((prev) =>
                Math.max(prev - 1, 0)
              )
            }
            className="py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
          >
            <FiChevronLeft />
            Previous
          </button>

          <button
            disabled={
              currentIndex === questions.length - 1
            }
            onClick={() =>
              setCurrentIndex((prev) =>
                Math.min(
                  prev + 1,
                  questions.length - 1
                )
              )
            }
            className="py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 font-semibold disabled:opacity-50"
          >
            Next
            <FiChevronRight />
          </button>
        </div>

        {/* QUESTION NAVIGATOR */}
        <div className="mt-10">

          <h3 className="text-center font-semibold mb-4">
            Question Navigator
          </h3>

          <div className="flex flex-wrap justify-center gap-2">

            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-10 h-10 rounded-full font-bold transition ${
                  answers[i]
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                } ${
                  currentIndex === i
                    ? "ring-4 ring-green-200"
                    : ""
                }`}
              >
                {i + 1}
              </button>
            ))}

          </div>
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full mt-10 py-5 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-lg flex items-center justify-center gap-3 transition"
        >
          <FiCheckCircle />
          Finish Quiz
        </button>
      </div>
    </div>
  );
};

export default ExamPage;
