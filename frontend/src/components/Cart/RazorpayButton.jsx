import React from "react";

const RazorpayButton = ({ amount, onSuccess, onError }) => {
  const loadRazorpay = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
        amount: amount * 100, // Convert to paise
        currency: "INR",
        name: "Your E-Commerce",
        description: "Test Transaction",
        handler: function (response) {
          onSuccess(response);
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    };
  };

  return (
    <button onClick={loadRazorpay} className="bg-black text-white py-3 rounded w-full">
      Pay with Razorpay
    </button>
  );
};

export default RazorpayButton;