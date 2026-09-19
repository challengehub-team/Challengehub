import React, { useState } from "react";
import toast from "react-hot-toast";

const PaystackFrontOnly = () => {
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("Email") || "";
  const amount = 1500;

  const payWithPaystack = () => {
    if (!email) {
      toast.error("No email found");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: "YOUR_PUBLIC_KEY_HERE", // ⚠️ PUBLIC KEY ONLY
      email: email,
      amount: amount * 100,

      callback: function (response) {
        console.log("Payment success:", response);

        toast.success("Payment successful");

        // You can redirect here
        window.location.href =
          "/verify";
      },

      onClose: function () {
        console.log("User closed payment window");

        // OPTIONAL: treat as cancel
        window.location.href = "/verify";
      },
    });

    handler.openIframe();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-[350px]">

        <h2 className="text-xl font-bold mb-4">
          Pay ₦{amount}
        </h2>

        <p className="text-sm mb-4">
          Email: {email}
        </p>

        <button
          onClick={payWithPaystack}
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Pay Now
        </button>

      </div>
    </div>
  );
};

export default PaystackFrontOnly;