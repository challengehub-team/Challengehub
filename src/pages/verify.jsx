import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, ShieldCheck } from "lucide-react";

const VerifyPayment = () => {
  const [status, setStatus] = useState("verifying"); // verifying, success, failed
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const reference = localStorage.getItem("reference");
      const uid = localStorage.getItem("userId");

      try {
        // Wait a tiny bit so the user actually sees the verification animation (better UX)
        const response = await axios.post("https://challengehub-backend.onrender.com/api/payment/verify", {
          reference,
          uid,
        });


        if (response.data.success) {
          setStatus("success");
          setTimeout(() => navigate("/dashboard"), 3000);
        }

      } catch (error) {
        console.error(error);
        setStatus("failed");
      }
    };

    verify();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-gray-100"
      >
        <AnimatePresence mode="wait">
          {/* STATE: VERIFYING */}
          {status === "verifying" && (
            <motion.div
              key="verifying"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <Loader2 className="w-16 h-16 text-green-600 animate-spin" />
                <ShieldCheck className="w-6 h-6 text-green-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-gray-800">Securing Payment</h2>
              <p className="text-gray-500 mt-2">Please wait while we confirm your transaction with the bank...</p>
            </motion.div>
          )}

          {/* STATE: SUCCESS */}
          {status === "success" && (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">Payment Confirmed!</h2>
              <p className="text-gray-500 mt-2 leading-relaxed">
                Your transaction was successful. Redirecting you to your dashboard to start your journey.
              </p>
              <div className="mt-8 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                  className="bg-green-600 h-full" 
                />
              </div>
            </motion.div>
          )}

          {/* STATE: FAILED */}
          {status === "failed" && (
            <motion.div
              key="failed"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="bg-red-100 p-4 rounded-full">
                <XCircle className="w-16 h-16 text-red-600" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">Verification Failed</h2>
              <p className="text-gray-500 mt-2">
                We couldn't verify your payment. If you were debited, please contact support with your reference.
              </p>
              <button 
                onClick={() => navigate("/payment")}
                className="mt-8 w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default VerifyPayment;
