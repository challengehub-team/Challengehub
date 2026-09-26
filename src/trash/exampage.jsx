import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaClock,
  FaBars,
  FaLock,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronLeft,
  FaChevronRight,
  FaFlag,
  FaListOl,
  FaExclamationTriangle,
  FaTimes,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";
import { PieChart, Pie, Cell } from "recharts";
import { useLocation, useNavigate } from "react-router-dom";

/* =========================================================
   CONFIGURATION
========================================================= */

const API_BASE_URL = "http://localhost:3000";

const EXAM_STATUS_URL = `${API_BASE_URL}/api/exam/status`;
const EXAM_SUBMIT_URL = `${API_BASE_URL}/api/exam/submit`;

const EXAM_DURATION = 600; // 10 minutes
const TOTAL_QUESTIONS = 15;

/* =========================================================
   HELPERS
========================================================= */

const decodeHTML = (html = "") => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const formatTime = (seconds) => {
  const minutes = Math.floor(Math.max(seconds, 0) / 60);
  const secs = Math.max(seconds, 0) % 60;

  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ExamSite() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { category, subject, difficulty } = state || {};

  /* =======================================================
     STAGE
  ======================================================= */

  const [stage, setStage] = useState("challenge");

  /*
    challenge
    instructions
    exam
  */

  /* =======================================================
     EXAM DATA
  ======================================================= */

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});

  /* =======================================================
     TIMER
  ======================================================= */

  const [time, setTime] = useState(EXAM_DURATION);

  /* =======================================================
     STATUS
  ======================================================= */

  const [examStatus, setExamStatus] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(false);

  /* =======================================================
     LOADING
  ======================================================= */

  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* =======================================================
     RESULT
  ======================================================= */

  const [submitted, setSubmitted] = useState(false);

  /* =======================================================
     MOBILE SIDEBAR
  ======================================================= */

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* =======================================================
     MODAL
  ======================================================= */

  const [modal, setModal] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
    actionText: "Continue",
    onConfirm: null,
    showCancel: false,
    cancelText: "Cancel",
  });

  /* =======================================================
     TITLE
  ======================================================= */

  const examTitle = useMemo(() => {
    return `${category || ""} ${subject || ""} CBT - ${
      difficulty || ""
    }`.trim();
  }, [category, subject, difficulty]);

  /* =======================================================
     EMAIL
  ======================================================= */

  const getEmail = () => {
    return localStorage.getItem("email");
  };

  /* =======================================================
     MODAL
  ======================================================= */

  const closeModal = () => {
    setModal({
      open: false,
      type: "success",
      title: "",
      message: "",
      actionText: "Continue",
      onConfirm: null,
      showCancel: false,
      cancelText: "Cancel",
    });
  };

  const showModal = ({
    type = "success",
    title,
    message,
    actionText = "Continue",
    onConfirm = null,
    showCancel = false,
    cancelText = "Cancel",
  }) => {
    setModal({
      open: true,
      type,
      title,
      message,
      actionText,
      onConfirm,
      showCancel,
      cancelText,
    });
  };

  /* =======================================================
     STATUS HELPERS

     YOUR BACKEND RETURNS:

     {
       success: true/false,
       isLockedOut: true/false,
       attemptsUsed: number,
       message: string
     }

     `success` is the PRIMARY authority.
  ======================================================= */

  const statusAllowsAccess = (status) => {
    if (!status) return false;

    if (status.success !== true) {
      return false;
    }

    if (status.isLockedOut === true) {
      return false;
    }

    return true;
  };

  const getStatusMessage = (status, fallback) => {
    return status?.message || fallback;
  };

  /* =======================================================
     CHECK EXAM STATUS
  ======================================================= */

  const checkExamStatus = async () => {
    const email = getEmail();

    if (!email) {
      showModal({
        type: "error",
        title: "Account Required",
        message:
          "We could not find your account email. Please sign in again before continuing.",
        actionText: "Close",
      });

      return null;
    }

    setCheckingStatus(true);

    try {
      /*
        Your backend accepts email through:
        req.body OR req.query

        We use query params here.
      */

      const response = await axios.get(EXAM_STATUS_URL, {
        params: {
          email,
        },
      });

      const status = response.data;

      console.log("Exam status:", status);

      setExamStatus(status);

      return status;
    } catch (error) {
      console.error("Failed to check exam status:", error);

      showModal({
        type: "error",
        title: "Unable to Verify Examination",
        message:
          error.response?.data?.message ||
          "We could not verify your examination status. Please check your connection and try again.",
        actionText: "Close",
      });

      return null;
    } finally {
      setCheckingStatus(false);
    }
  };

  /* =======================================================
     START CHALLENGE
  ======================================================= */

  const startChallenge = async () => {
    if (checkingStatus) return;

    const status = await checkExamStatus();

    if (!status) return;

    /*
      IMPORTANT:
      Your backend says success:false when locked.

      We DO NOT try to guess anything on the frontend.
    */

    if (!statusAllowsAccess(status)) {
      showModal({
        type: "error",
        title: "Challenge Locked",
        message: getStatusMessage(
          status,
          "You are not currently allowed to access this challenge."
        ),
        actionText: "Close",
      });

      return;
    }

    showModal({
      type: "success",
      title: "Challenge Available",
      message:
        status.message ||
        "Your examination is available. Please review the instructions before starting.",
      actionText: "View Instructions",
      onConfirm: () => {
        closeModal();
        setStage("instructions");
      },
    });
  };

  /* =======================================================
     LOAD QUESTIONS
  ======================================================= */

  const loadQuestions = async () => {
    setLoadingQuestions(true);

    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${TOTAL_QUESTIONS}&type=multiple`
      );

      if (
        !response.data ||
        !Array.isArray(response.data.results) ||
        response.data.results.length === 0
      ) {
        throw new Error("No questions returned");
      }

      const formattedQuestions = response.data.results.map(
        (question) => {
          const correct = decodeHTML(question.correct_answer);

          const incorrect = question.incorrect_answers.map(
            (answer) => decodeHTML(answer)
          );

          const options = [
            ...incorrect,
            correct,
          ].sort(() => Math.random() - 0.5);

          return {
            question: decodeHTML(question.question),
            correct,
            options,
          };
        }
      );

      setQuestions(formattedQuestions);
      setCurrentQuestion(0);
      setAnswers({});
      setFlagged({});
      setTime(EXAM_DURATION);

      return true;
    } catch (error) {
      console.error("Question loading error:", error);

      showModal({
        type: "error",
        title: "Unable to Load Examination",
        message:
          "The examination questions could not be loaded. Please try again.",
        actionText: "Close",
      });

      return false;
    } finally {
      setLoadingQuestions(false);
    }
  };

  /* =======================================================
     START ACTUAL EXAM

     STATUS IS CHECKED AGAIN BEFORE QUESTIONS LOAD.
  ======================================================= */

  const startExam = async () => {
    if (loadingQuestions || checkingStatus) return;

    const status = await checkExamStatus();

    if (!status) return;

    if (!statusAllowsAccess(status)) {
      showModal({
        type: "error",
        title: "Challenge Locked",
        message: getStatusMessage(
          status,
          "The examination is no longer available."
        ),
        actionText: "Back to Challenge",
        onConfirm: () => {
          closeModal();
          setStage("challenge");
        },
      });

      return;
    }

    const success = await loadQuestions();

    if (!success) return;

    setStage("exam");

    toast.success("Examination started. Good luck!");
  };

  /* =======================================================
     TIMER
  ======================================================= */

  useEffect(() => {
    if (stage !== "exam") return;
    if (submitted) return;
    if (submitting) return;

    if (time <= 0) {
      performSubmission(true);
      return;
    }

    const timer = setInterval(() => {
      setTime((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [stage, time, submitted, submitting]);

  /* =======================================================
     SELECT ANSWER
  ======================================================= */

  const selectAnswer = (answer) => {
    if (submitting) return;

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: answer,
    }));
  };

  /* =======================================================
     FLAG QUESTION
  ======================================================= */

  const toggleFlag = () => {
    if (submitting) return;

    setFlagged((previous) => ({
      ...previous,
      [currentQuestion]: !previous[currentQuestion],
    }));
  };

  /* =======================================================
     REQUEST SUBMISSION
  ======================================================= */

  const requestSubmit = () => {
    if (submitting) return;

    const unanswered =
      questions.length - Object.keys(answers).length;

    if (unanswered > 0) {
      showModal({
        type: "warning",
        title: "Unanswered Questions",
        message: `You still have ${unanswered} unanswered ${
          unanswered === 1 ? "question" : "questions"
        }. You can submit now, but unanswered questions will be marked incorrect.`,
        actionText: "Submit Anyway",
        showCancel: true,
        cancelText: "Keep Reviewing",
        onConfirm: () => {
          closeModal();

          setTimeout(() => {
            performSubmission(false);
          }, 100);
        },
      });

      return;
    }

    showModal({
      type: "warning",
      title: "Submit Examination?",
      message:
        "You have answered all questions. Once submitted, your answers cannot be changed.",
      actionText: "Submit Examination",
      showCancel: true,
      cancelText: "Continue Reviewing",
      onConfirm: () => {
        closeModal();

        setTimeout(() => {
          performSubmission(false);
        }, 100);
      },
    });
  };

  /* =======================================================
     ACTUAL SUBMISSION

     STATUS CHECKED ONE FINAL TIME.

     Backend:
       success:true  -> continue
       success:false -> reject
  ======================================================= */

  const performSubmission = async (automatic = false) => {
    if (submitting) return;

    const email = getEmail();

    if (!email) {
      showModal({
        type: "error",
        title: "Account Required",
        message:
          "Your account email could not be found. Please sign in again.",
        actionText: "Close",
      });

      return;
    }

    setSubmitting(true);

    try {
      /*
        FINAL BACKEND STATUS CHECK
      */

      const statusResponse = await axios.get(
        EXAM_STATUS_URL,
        {
          params: {
            email,
          },
        }
      );

      const status = statusResponse.data;

      setExamStatus(status);

      /*
        Backend has locked the user.
      */

      if (!statusAllowsAccess(status)) {
        showModal({
          type: "error",
          title: "Submission Not Allowed",
          message: getStatusMessage(
            status,
            "Your examination session is no longer available."
          ),
          actionText: "Close",
        });

        return;
      }

      /*
        Calculate score.
      */

      const calculatedScore = questions.filter(
        (question, index) =>
          answers[index] === question.correct
      ).length;

      /*
        Send submission.
      */

      await axios.post(EXAM_SUBMIT_URL, {
        name:
          localStorage.getItem("name") ||
          "Guest Student",

        email,

        score: calculatedScore,

        total: questions.length,

        timeUsed: EXAM_DURATION - time,

        answers,

        automatic,
      });

      /*
        Backend accepted the submission.
      */

      setSubmitted(true);

      if (automatic) {
        showModal({
          type: "success",
          title: "Time Has Expired",
          message:
            "Your examination time has ended and your answers were submitted automatically.",
          actionText: "View Result",
          onConfirm: closeModal,
        });
      } else {
        toast.success(
          "Examination submitted successfully."
        );
      }
    } catch (error) {
      console.error("Submission error:", error);

      showModal({
        type: "error",
        title:
          error.response?.status === 403
            ? "Submission Not Allowed"
            : "Submission Failed",

        message:
          error.response?.data?.message ||
          "We could not save your examination. Please try again.",

        actionText: "Close",
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* =======================================================
     SCORE
  ======================================================= */

  const score = questions.filter(
    (question, index) =>
      answers[index] === question.correct
  ).length;

  const percentage =
    questions.length > 0
      ? Math.round(
          (score / questions.length) * 100
        )
      : 0;

  const chartData = [
    {
      name: "Correct",
      value: score,
    },
    {
      name: "Incorrect",
      value: questions.length - score,
    },
  ];

  const COLORS = ["#16a34a", "#dc2626"];

  const answeredCount = Object.keys(answers).length;

  const unansweredCount =
    questions.length - answeredCount;

  const currentQuestionData =
    questions[currentQuestion];

  /* =======================================================
     BRANDED MODAL
  ======================================================= */

  const Modal = () => {
    if (!modal.open) return null;

    const isError = modal.type === "error";
    const isWarning = modal.type === "warning";

    const headerClass = isError
      ? "bg-red-600"
      : isWarning
      ? "bg-amber-500"
      : "bg-green-600";

    const buttonClass = isError
      ? "bg-red-600 hover:bg-red-700"
      : isWarning
      ? "bg-amber-500 hover:bg-amber-600"
      : "bg-green-600 hover:bg-green-700";

    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">

        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          onClick={() => {
            if (!modal.showCancel) {
              closeModal();
            }
          }}
        />

        {/* MODAL */}
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_.2s_ease-out]">

          {/* HEADER */}
          <div
            className={`${headerClass} px-6 py-5 text-white`}
          >
            <div className="flex items-start justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center">

                  {isError ? (
                    <FaTimesCircle className="text-xl" />
                  ) : isWarning ? (
                    <FaExclamationTriangle className="text-xl" />
                  ) : (
                    <FaCheckCircle className="text-xl" />
                  )}

                </div>

                <div>

                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80">
                    Examination Portal
                  </p>

                  <h3 className="text-lg font-bold mt-0.5">
                    {modal.title}
                  </h3>

                </div>

              </div>

              <button
                onClick={closeModal}
                className="text-white/70 hover:text-white transition"
              >
                <FaTimes />
              </button>

            </div>
          </div>

          {/* BODY */}
          <div className="px-6 py-6">

            <p className="text-gray-600 leading-relaxed">
              {modal.message}
            </p>

            <div
              className={`mt-7 flex gap-3 ${
                modal.showCancel
                  ? "flex-col-reverse sm:flex-row"
                  : ""
              }`}
            >

              {modal.showCancel && (
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
                >
                  {modal.cancelText}
                </button>
              )}

              <button
                onClick={() => {
                  if (modal.onConfirm) {
                    modal.onConfirm();
                  } else {
                    closeModal();
                  }
                }}
                className={`flex-1 py-3 rounded-xl ${buttonClass} text-white font-bold transition shadow-lg`}
              >
                {modal.actionText}
              </button>

            </div>

          </div>

        </div>
      </div>
    );
  };

  /* =======================================================
     RESULT PAGE
  ======================================================= */

  if (submitted) {
    return (
      <>
        <Modal />

        <div className="min-h-screen bg-slate-50">

          {/* HEADER */}
          <header className="bg-white border-b">

            <div className="max-w-6xl mx-auto px-6 py-5">

              <p className="text-sm text-gray-500">
                Examination completed
              </p>

              <h1 className="text-2xl font-bold text-gray-900">
                {examTitle}
              </h1>

            </div>

          </header>

          <main className="max-w-6xl mx-auto px-6 py-10">

            {/* RESULT */}
            <section className="bg-white border rounded-2xl p-6 md:p-8 shadow-sm">

              <div className="grid md:grid-cols-3 gap-8 items-center">

                <div className="flex justify-center">

                  <PieChart
                    width={220}
                    height={220}
                  >

                    <Pie
                      data={chartData}
                      dataKey="value"
                      innerRadius={65}
                      outerRadius={90}
                    >

                      {chartData.map(
                        (_, index) => (
                          <Cell
                            key={index}
                            fill={
                              COLORS[index]
                            }
                          />
                        )
                      )}

                    </Pie>

                  </PieChart>

                </div>

                <div className="md:col-span-2">

                  <p className="text-sm font-bold text-green-600 uppercase tracking-wider">
                    Your Result
                  </p>

                  <h2 className="text-4xl font-bold text-gray-900 mt-2">
                    {score}/{questions.length}
                  </h2>

                  <p className="text-2xl font-semibold text-green-600 mt-1">
                    {percentage}%
                  </p>

                  <div className="grid grid-cols-3 gap-3 mt-6">

                    <div className="bg-green-50 rounded-xl p-4 border border-green-100">

                      <p className="text-2xl font-bold text-green-700">
                        {score}
                      </p>

                      <p className="text-xs text-gray-500">
                        Correct
                      </p>

                    </div>

                    <div className="bg-red-50 rounded-xl p-4 border border-red-100">

                      <p className="text-2xl font-bold text-red-600">
                        {questions.length - score}
                      </p>

                      <p className="text-xs text-gray-500">
                        Incorrect
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border">

                      <p className="text-2xl font-bold text-gray-800">
                        {questions.length}
                      </p>

                      <p className="text-xs text-gray-500">
                        Total
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </section>

            {/* CORRECTIONS */}
            <section className="mt-10">

              <div className="mb-6">

                <p className="text-sm font-bold text-green-600 uppercase tracking-wider">
                  Answer Review
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                  Corrections
                </h2>

                <p className="text-gray-500 mt-2">
                  Review each question, your answer, and the
                  correct answer.
                </p>

              </div>

              <div className="space-y-4">

                {questions.map(
                  (question, index) => {

                    const userAnswer =
                      answers[index];

                    const correct =
                      userAnswer ===
                      question.correct;

                    return (
                      <div
                        key={index}
                        className="bg-white border rounded-2xl overflow-hidden shadow-sm"
                      >

                        {/* STATUS */}
                        <div
                          className={`px-5 py-4 border-b flex items-center justify-between ${
                            correct
                              ? "bg-green-50"
                              : "bg-red-50"
                          }`}
                        >

                          <div className="flex items-center gap-3">

                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center text-white ${
                                correct
                                  ? "bg-green-600"
                                  : "bg-red-600"
                              }`}
                            >
                              {correct ? (
                                <FaCheckCircle />
                              ) : (
                                <FaTimesCircle />
                              )}
                            </div>

                            <div>

                              <p className="font-bold text-gray-900">
                                Question{" "}
                                {index + 1}
                              </p>

                              <p
                                className={`text-xs font-semibold ${
                                  correct
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {correct
                                  ? "Correct"
                                  : "Incorrect"}
                              </p>

                            </div>

                          </div>

                        </div>

                        {/* QUESTION */}
                        <div className="p-5">

                          <p className="font-semibold text-gray-800 leading-relaxed">
                            {question.question}
                          </p>

                          <div className="grid md:grid-cols-2 gap-4 mt-5">

                            {/* USER ANSWER */}
                            <div
                              className={`rounded-xl p-4 border ${
                                correct
                                  ? "bg-green-50 border-green-200"
                                  : "bg-red-50 border-red-200"
                              }`}
                            >

                              <p className="text-xs uppercase font-bold text-gray-500">
                                Your Answer
                              </p>

                              <p className="mt-2 font-semibold text-gray-800">
                                {userAnswer ||
                                  "Not answered"}
                              </p>

                            </div>

                            {/* CORRECT */}
                            <div className="rounded-xl p-4 bg-green-50 border border-green-200">

                              <p className="text-xs uppercase font-bold text-gray-500">
                                Correct Answer
                              </p>

                              <p className="mt-2 font-semibold text-green-700">
                                {question.correct}
                              </p>

                            </div>

                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </section>

            {/* LEADERBOARD */}
            <button
              onClick={() =>
                navigate("/leaderboard")
              }
              className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition shadow-lg shadow-green-600/20"
            >
              View Leaderboard 🏆
            </button>

          </main>

        </div>
      </>
    );
  }

  /* =======================================================
     CHALLENGE PAGE
  ======================================================= */

  if (stage === "challenge") {
    return (
      <>
        <Modal />

        <div className="min-h-screen bg-slate-50">

          {/* HEADER */}
          <header className="bg-white border-b">

            <div className="max-w-7xl mx-auto px-6 py-5">

              <p className="text-sm text-gray-500">
                Examination Portal
              </p>

              <h1 className="text-2xl font-bold text-gray-900">
                Challenge
              </h1>

            </div>

          </header>

          {/* CONTENT */}
          <main className="max-w-5xl mx-auto px-6 py-16">

            <div className="grid lg:grid-cols-3 gap-10 items-center">

              {/* LEFT */}
              <div className="lg:col-span-2">

                <p className="text-green-600 font-bold text-sm uppercase tracking-wider">
                  Online CBT Challenge
                </p>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 leading-tight">
                  {examTitle ||
                    "Ready for your challenge?"}
                </h2>

                <p className="text-lg text-gray-500 mt-5 max-w-2xl leading-relaxed">
                  Complete the examination within the allocated
                  time. Read every question carefully and submit
                  your answers before the timer expires.
                </p>

                {/* STATS */}
                <div className="flex flex-wrap gap-3 mt-8">

                  <div className="px-5 py-3 bg-white border rounded-xl">

                    <span className="block text-xl font-bold">
                      {TOTAL_QUESTIONS}
                    </span>

                    <span className="text-sm text-gray-500">
                      Questions
                    </span>

                  </div>

                  <div className="px-5 py-3 bg-white border rounded-xl">

                    <span className="block text-xl font-bold">
                      10 min
                    </span>

                    <span className="text-sm text-gray-500">
                      Duration
                    </span>

                  </div>

                  <div className="px-5 py-3 bg-white border rounded-xl">

                    <span className="block text-xl font-bold capitalize">
                      {difficulty || "CBT"}
                    </span>

                    <span className="text-sm text-gray-500">
                      Difficulty
                    </span>

                  </div>

                </div>

              </div>

              {/* RIGHT */}
              <div className="lg:border-l lg:pl-10">

                <div className="flex items-center gap-3 text-green-600">

                  <span className="w-3 h-3 bg-green-500 rounded-full" />

                  <span className="font-bold">
                    Secure Access
                  </span>

                </div>

                <p className="text-gray-500 mt-4 leading-relaxed">
                  Click below and the system will verify your
                  account and examination status before allowing
                  you to continue.
                </p>

                <button
                  onClick={startChallenge}
                  disabled={checkingStatus}
                  className="w-full mt-7 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-green-600/20 flex items-center justify-center gap-3"
                >
                  {checkingStatus ? (
                    "Checking Challenge..."
                  ) : (
                    <>
                      Start Challenge
                      <FaArrowRight />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
                  <FaShieldAlt />
                  Your account status will be verified securely.
                </div>

              </div>

            </div>

            {/* FEATURES */}
            <div className="border-t mt-16 pt-8 grid md:grid-cols-3 gap-6">

              <div>
                <p className="font-bold text-gray-800">
                  Timed Examination
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  You have a fixed amount of time to complete
                  the challenge.
                </p>
              </div>

              <div>
                <p className="font-bold text-gray-800">
                  Question Navigation
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Move between questions and review your
                  selections.
                </p>
              </div>

              <div>
                <p className="font-bold text-gray-800">
                  Detailed Corrections
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Review your answers and correct answers after
                  submission.
                </p>
              </div>

            </div>

          </main>

        </div>
      </>
    );
  }

  /* =======================================================
     INSTRUCTIONS PAGE
  ======================================================= */

  if (stage === "instructions") {
    return (
      <>
        <Modal />

        <div className="min-h-screen bg-white">

          {/* HEADER */}
          <header className="border-b bg-white">

            <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-wider font-bold text-green-600">
                  Examination Instructions
                </p>

                <h1 className="text-xl font-bold text-gray-900 mt-1">
                  {examTitle}
                </h1>

              </div>

              <button
                onClick={() =>
                  setStage("challenge")
                }
                className="text-sm font-semibold text-gray-500 hover:text-red-600 transition"
              >
                Exit
              </button>

            </div>

          </header>

          {/* CONTENT */}
          <main className="max-w-6xl mx-auto px-6 py-12">

            <div className="max-w-4xl">

              <p className="text-green-600 font-bold uppercase text-sm tracking-wider">
                Before You Begin
              </p>

              <h2 className="text-4xl font-bold text-gray-900 mt-3">
                Read the instructions carefully.
              </h2>

              <p className="text-lg text-gray-500 mt-4 leading-relaxed">
                Please make sure you understand the examination
                rules before starting. Your examination timer will
                begin after the questions have successfully loaded.
              </p>

              {/* RULES */}
              <div className="border-t mt-10 pt-10">

                <h3 className="text-xl font-bold text-gray-900">
                  Examination Rules
                </h3>

                <div className="mt-6 divide-y">

                  <div className="py-5 flex gap-5">

                    <span className="text-green-600 font-bold text-lg">
                      01
                    </span>

                    <div>
                      <h4 className="font-bold text-gray-900">
                        Complete the examination
                      </h4>

                      <p className="text-gray-500 mt-1">
                        The examination contains{" "}
                        {TOTAL_QUESTIONS} questions.
                      </p>
                    </div>

                  </div>

                  <div className="py-5 flex gap-5">

                    <span className="text-green-600 font-bold text-lg">
                      02
                    </span>

                    <div>
                      <h4 className="font-bold text-gray-900">
                        Manage your time
                      </h4>

                      <p className="text-gray-500 mt-1">
                        You have 10 minutes to complete the
                        examination.
                      </p>
                    </div>

                  </div>

                  <div className="py-5 flex gap-5">

                    <span className="text-green-600 font-bold text-lg">
                      03
                    </span>

                    <div>
                      <h4 className="font-bold text-gray-900">
                        Navigate between questions
                      </h4>

                      <p className="text-gray-500 mt-1">
                        Use the question navigator to move between
                        questions and change your answers.
                      </p>
                    </div>

                  </div>

                  <div className="py-5 flex gap-5">

                    <span className="text-green-600 font-bold text-lg">
                      04
                    </span>

                    <div>
                      <h4 className="font-bold text-gray-900">
                        Review your answers
                      </h4>

                      <p className="text-gray-500 mt-1">
                        You can review unanswered questions before
                        submitting.
                      </p>
                    </div>

                  </div>

                  <div className="py-5 flex gap-5">

                    <span className="text-red-600 font-bold text-lg">
                      05
                    </span>

                    <div>
                      <h4 className="font-bold text-gray-900">
                        Automatic submission
                      </h4>

                      <p className="text-gray-500 mt-1">
                        When the timer reaches zero, your
                        examination will be submitted automatically.
                      </p>
                    </div>

                  </div>

                </div>

              </div>

              {/* SUMMARY */}
              <div className="mt-10 border-y py-8">

                <div className="grid sm:grid-cols-3 gap-8">

                  <div>
                    <p className="text-3xl font-bold text-gray-900">
                      {TOTAL_QUESTIONS}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Questions
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-bold text-gray-900">
                      10
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Minutes
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-bold text-gray-900">
                      CBT
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Examination type
                    </p>
                  </div>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">

                <button
                  onClick={startExam}
                  disabled={
                    loadingQuestions ||
                    checkingStatus
                  }
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-green-600/20 flex items-center justify-center gap-3"
                >
                  {loadingQuestions ? (
                    "Preparing Examination..."
                  ) : checkingStatus ? (
                    "Verifying Access..."
                  ) : (
                    <>
                      I Understand — Start Exam
                      <FaArrowRight />
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    setStage("challenge")
                  }
                  disabled={loadingQuestions}
                  className="px-8 py-4 rounded-xl border border-gray-300 hover:bg-gray-50 font-semibold text-gray-700"
                >
                  Go Back
                </button>

              </div>

            </div>

          </main>

        </div>
      </>
    );
  }

  /* =======================================================
     EXAM PAGE
  ======================================================= */

  return (
    <>
      <Modal />

      <div className="min-h-screen bg-slate-100">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">

          <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <button
                onClick={() =>
                  setSidebarOpen(!sidebarOpen)
                }
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <FaBars />
              </button>

              <div>

                <p className="text-xs text-gray-400 hidden sm:block">
                  EXAMINATION
                </p>

                <h1 className="font-bold text-gray-900 max-w-[220px] md:max-w-none truncate">
                  {examTitle}
                </h1>

              </div>

            </div>

            {/* TIMER */}
            <div
              className={`flex items-center gap-2 font-bold ${
                time <= 60
                  ? "text-red-600 animate-pulse"
                  : time <= 180
                  ? "text-orange-500"
                  : "text-green-600"
              }`}
            >
              <FaClock />

              <span className="font-mono text-lg">
                {formatTime(time)}
              </span>
            </div>

          </div>

        </header>

        {/* MOBILE BACKDROP */}

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 lg:hidden"
            onClick={() =>
              setSidebarOpen(false)
            }
          />
        )}

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside
          className={`
            fixed top-16 bottom-0 left-0 z-40
            w-72 bg-white border-r
            transform transition-transform
            lg:translate-x-0
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >

          <div className="p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase font-bold text-gray-400">
                  Questions
                </p>

                <p className="font-bold text-gray-900 mt-1">
                  {answeredCount}/{questions.length} answered
                </p>

              </div>

              <FaListOl className="text-green-600" />

            </div>

            {/* QUESTION NUMBERS */}

            <div className="grid grid-cols-5 gap-2 mt-6">

              {questions.map((_, index) => {

                const isCurrent =
                  currentQuestion === index;

                const isAnswered =
                  Boolean(answers[index]);

                const isFlagged =
                  Boolean(flagged[index]);

                return (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentQuestion(index);
                      setSidebarOpen(false);
                    }}
                    className={`
                      relative h-10 rounded-lg
                      text-sm font-bold border
                      transition
                      ${
                        isCurrent
                          ? "bg-green-600 border-green-600 text-white"
                          : isAnswered
                          ? "bg-green-50 border-green-300 text-green-700"
                          : "bg-white border-gray-200 text-gray-600 hover:border-green-300"
                      }
                    `}
                  >

                    {index + 1}

                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full" />
                    )}

                  </button>
                );
              })}

            </div>

            {/* LEGEND */}

            <div className="border-t mt-7 pt-5 space-y-3">

              <div className="flex items-center gap-2 text-sm text-gray-500">

                <span className="w-3 h-3 bg-green-100 border border-green-300 rounded" />

                Answered

              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">

                <span className="w-3 h-3 bg-white border border-gray-300 rounded" />

                Not answered

              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">

                <span className="w-3 h-3 bg-orange-500 rounded-full" />

                Flagged

              </div>

            </div>

            {/* REMAINING */}

            <div className="mt-7 bg-gray-50 rounded-xl p-4">

              <p className="text-xs uppercase font-bold text-gray-400">
                Remaining
              </p>

              <p className="text-2xl font-bold text-gray-900 mt-1">
                {unansweredCount}
              </p>

              <p className="text-xs text-gray-500">
                unanswered questions
              </p>

            </div>

          </div>

        </aside>

        {/* =================================================
            MAIN
        ================================================= */}

        <main className="lg:pl-72 pt-16">

          <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">

            {/* PROGRESS */}

            <div className="mb-6">

              <div className="flex justify-between text-sm mb-2">

                <span className="font-semibold text-gray-700">
                  Question {currentQuestion + 1} of{" "}
                  {questions.length}
                </span>

                <span className="text-gray-500">
                  {Math.round(
                    ((currentQuestion + 1) /
                      questions.length) *
                      100
                  )}
                  %
                </span>

              </div>

              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-green-600 transition-all"
                  style={{
                    width: `${
                      ((currentQuestion + 1) /
                        questions.length) *
                      100
                    }%`,
                  }}
                />

              </div>

            </div>

            {/* QUESTION */}

            <section className="bg-white border rounded-2xl shadow-sm">

              <div className="p-5 md:p-8">

                {/* QUESTION HEADER */}

                <div className="flex items-center justify-between">

                  <span className="text-sm font-bold text-green-600">
                    QUESTION{" "}
                    {String(
                      currentQuestion + 1
                    ).padStart(2, "0")}
                  </span>

                  <button
                    onClick={toggleFlag}
                    disabled={submitting}
                    className={`flex items-center gap-2 text-sm font-semibold ${
                      flagged[currentQuestion]
                        ? "text-orange-500"
                        : "text-gray-400 hover:text-orange-500"
                    }`}
                  >

                    <FaFlag />

                    {flagged[currentQuestion]
                      ? "Flagged"
                      : "Flag question"}

                  </button>

                </div>

                {/* QUESTION TEXT */}

                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed mt-6">
                  {currentQuestionData?.question}
                </h2>

                {/* OPTIONS */}

                <div className="mt-8 space-y-3">

                  {currentQuestionData?.options?.map(
                    (option, optionIndex) => {

                      const selected =
                        answers[currentQuestion] ===
                        option;

                      return (
                        <button
                          key={optionIndex}
                          onClick={() =>
                            selectAnswer(option)
                          }
                          className={`
                            w-full text-left
                            flex items-center gap-4
                            p-4 rounded-xl
                            border-2
                            transition
                            ${
                              selected
                                ? "border-green-600 bg-green-50"
                                : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
                            }
                          `}
                        >

                          <span
                            className={`
                              flex-shrink-0
                              w-10 h-10 rounded-full
                              flex items-center justify-center
                              font-bold
                              ${
                                selected
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-100 text-gray-600"
                              }
                            `}
                          >
                            {String.fromCharCode(
                              65 + optionIndex
                            )}
                          </span>

                          <span
                            className={`font-medium ${
                              selected
                                ? "text-green-800"
                                : "text-gray-700"
                            }`}
                          >
                            {option}
                          </span>

                          {selected && (
                            <FaCheckCircle className="ml-auto text-green-600" />
                          )}

                        </button>
                      );
                    }
                  )}

                </div>

              </div>

              {/* NAVIGATION */}

              <div className="border-t px-5 md:px-8 py-5 flex items-center justify-between gap-4">

                <button
                  disabled={
                    currentQuestion === 0 ||
                    submitting
                  }
                  onClick={() =>
                    setCurrentQuestion(
                      (previous) =>
                        Math.max(
                          previous - 1,
                          0
                        )
                    )
                  }
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-40"
                >

                  <FaChevronLeft />

                  Previous

                </button>

                {currentQuestion <
                questions.length - 1 ? (

                  <button
                    disabled={submitting}
                    onClick={() =>
                      setCurrentQuestion(
                        (previous) =>
                          Math.min(
                            previous + 1,
                            questions.length - 1
                          )
                      )
                    }
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-semibold"
                  >

                    Next

                    <FaChevronRight />

                  </button>

                ) : (

                  <button
                    disabled={submitting}
                    onClick={requestSubmit}
                    className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-bold"
                  >

                    {submitting
                      ? "Submitting..."
                      : "Submit Examination"}

                  </button>

                )}

              </div>

            </section>

            {/* SUBMISSION AREA */}

            <div className="mt-6 bg-white border rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">

              <div>

                <p className="font-bold text-gray-800">
                  Examination Progress
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {answeredCount} answered ·{" "}
                  {unansweredCount} unanswered
                </p>

              </div>

              <button
                disabled={submitting}
                onClick={requestSubmit}
                className="px-6 py-3 border-2 border-green-600 text-green-600 hover:bg-green-50 disabled:opacity-50 rounded-xl font-bold"
              >

                {submitting
                  ? "Submitting..."
                  : "Submit Examination"}

              </button>

            </div>

          </div>

        </main>

      </div>
    </>
  );
}
