"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const processPayment = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        const paymentMethod =
          localStorage.getItem("paymentMethod") || "demo";

        const paymentAmount =
          Number(localStorage.getItem("paymentAmount")) || 0;

        const productName =
          localStorage.getItem("paymentProduct") || "";

        if (!storedUser) return;

        const parsed = JSON.parse(storedUser);

        await fetch(
          "http://localhost:5050/api/transactions/payment/success",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token || "",
            },
            body: JSON.stringify({
              userId: parsed._id,
              amount: paymentAmount,
              paymentMethod,
              productName,
            }),
          }
        );

        localStorage.removeItem("paymentMethod");
        localStorage.removeItem("paymentAmount");
        localStorage.removeItem("paymentProduct");

        setTimeout(() => {
          window.location.href = "/auth/Cart";
        }, 3000);
      } catch (error) {
        console.error("Payment processing failed");
      }
    };

    processPayment();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">

      <div className="bg-gray-900/80 backdrop-blur-lg border border-gray-800 p-10 rounded-2xl shadow-xl max-w-md w-full text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
            <span className="text-4xl">✓</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-green-400 mb-4">
          Payment Successful
        </h1>

        <p className="text-gray-400 mb-6 leading-relaxed">
          Your transaction has been recorded successfully.
        </p>

        <div className="text-sm text-gray-500">
          Redirecting back to cart in 3 seconds...
        </div>
      </div>
    </div>
  );
}