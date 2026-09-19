import { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const reference = params.get("reference");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/payment/verify",
          { reference }
        );

        if (res.data.success) {
          toast.success("Payment Successful 🎉");
        } else {
          toast.error("Payment Failed ❌");
        }
      } catch (err) {
        toast.error("Verification error");
      }
    };

    if (reference) verify();
  }, [reference]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Verifying Payment...</h1>
    </div>
  );
}