import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiLock, FiCheckCircle, FiShield } from "react-icons/fi";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [amount, setAmount] = useState(150); // Amount in Naira

  // Grab email explicitly matching your key parameters
  const email = localStorage.getItem("Email") || "";
  console.log("Current email context extracted:", email);



  // Core handler function
  const handlePayment = async () => {
    try {
      if (!email) {
        return toast.error("User email address context not found. Please log in again.");
      }

      setIsProcessing(true);

      // FIX: Changed local path config URL string point to target your live cloud server API endpoint pipeline cleanly
      const res = await axios.post("http://challengehub-backend.onrender.com/api/payment/initialize", {
        email: email,        // Dynamic text email string string
        amount: amount, // Paystack expects amount in Kobo/cents securely
      });

      console.log("Paystack server session initialized:", res);

      const reference = res?.data?.reference;
      if (reference) {
        localStorage.setItem("reference", reference);
      }

      // Redirect browser viewport frame down straight into Paystack custom secure checkout gateway url strings
      if (res.data?.authorization_url) {
        window.location.href = res.data.authorization_url; // Redirect to the callback URL provided by your backend (which should be the Paystack checkout page)
      } else {
        throw new Error("Authorization URL missing from gateway token callback initialization packet stream metadata.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(error?.response?.data?.message || "Payment initialization runtime breakdown.");
      setIsProcessing(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

        {/* HEADER SECTION */}
        <div className="bg-green-600 p-8 text-center text-white">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <FiShield className="text-3xl text-white" />
          </div>
          <h2 className="text-2xl font-bold">Secure Checkout</h2>
          <p className="text-green-100 text-sm mt-1">Complete your registration to start the exam</p>
        </div>

        {/* DETAILS SECTION */}
        <div className="p-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <span className="text-gray-500 font-medium">Recipient</span>
              <span className="text-gray-800 font-semibold truncate max-w-[200px]">{email || "N/A"}</span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <span className="text-gray-500 font-medium">Service</span>
              <span className="text-gray-800 font-semibold">CBT Examination Fee</span>
            </div>

            <div className="bg-green-50 p-6 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-green-700 text-xs font-bold uppercase tracking-wider">Total Amount</p>
                <h3 className="text-3xl font-black text-green-900 mt-1">₦{amount.toLocaleString()}</h3>
              </div>
              <FiCheckCircle className="text-green-500 text-2xl" />
            </div>
          </div>

          {/* ACTION BUTTON */}
          <button
            type="button"
            onClick={() => handlePayment()} // 👈 FIX: Wrapped securely in arrow function closure block to strip browser event objects out
            disabled={isProcessing}
            className={`w-full mt-8 py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200 ${isProcessing
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 active:scale-95"
              }`}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FiLock className="text-lg" />
                Pay Safely with Paystack
              </>
            )}
          </button>

          {/* FOOTER */}
          <div className="mt-6 text-center">
            <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1 uppercase tracking-widest font-bold">
              <FiLock /> Secured by Paystack & SSL Encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
