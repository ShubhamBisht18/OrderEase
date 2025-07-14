import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axios";

function Cart() {
  // Getting cart items passed from previous page via state
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  // Form inputs
  const [seatNumber, setSeatNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [error, setError] = useState("");

  // Calculate total amount of cart items
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Handle placing the order
  const handleOrder = async () => {
    // Validation: seat number is required
    if (!seatNumber.trim()) {
      setError("Seat number is required.");
      return;
    }
    setError("");

    // Payload to send to backend for order placement
    const orderPayload = {
      seatNumber,
      items: cartItems.map(item => ({
        foodId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: calculateTotal(),
      paymentMethod,
    };

    // If user selects COD (Cash on Delivery)
    if (paymentMethod === "Cash On Delivery") {
      try {
        await axios.post("/order/place", orderPayload); // Place order directly
        alert("Order placed successfully!");
        navigate("/myorder"); // Redirect to "My Orders" page
      } catch (err) {
        alert("Error placing order");
      }
    } else {
      // If user selects Online Payment
      try {
        // Create Razorpay order from backend
        const { data: order } = await axios.post("/payment/create-order", {
          amount: calculateTotal(), // in ₹
        });

        const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID; // Public Razorpay Key from .env

        // Razorpay payment options
        const options = {
          key: razorpayKey,
          amount: order.amount, // from backend
          currency: order.currency,
          name: "OrderEase", // Business name
          description: "Order Payment",
          order_id: order.id, // Razorpay order ID

          // This function runs after successful payment
          handler: async function (response) {
            const paymentDetails = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };

            try {
              // Send full order + payment details to backend
              await axios.post("/order/place", {
                ...orderPayload,
                paymentDetails,
              });
              alert("Payment successful & order placed!");
              navigate("/myorder");
            } catch (err) {
              alert("Payment succeeded but order failed!");
            }
          },

          // Optional Razorpay theme color
          theme: {
            color: "#3399cc",
          },
        };

        // Open Razorpay payment window
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        alert("Failed to initiate payment.");
      }
    }
  };

  // UI (frontend)
  return (
    <div className="w-full min-h-screen px-4 py-6 bg-gray-100 flex flex-col items-center">
      <h2 className="text-2xl font-extrabold mb-4">Your Cart</h2>

      {/* Cart Item List */}
      <div className="w-full max-w-4xl flex flex-wrap gap-4 justify-center items-start mb-6">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="min-w-[250px] flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-gray-200"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-semibold text-lg">{item.name}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-sm text-gray-800">Total: ₹{item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Box */}
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-4">
        {/* Seat Number Input */}
        <div>
          <label className="block mb-1 font-medium">Seat Number</label>
          <input
            type="text"
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
            placeholder="Enter seat number"
            className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
              error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Payment Method Selection */}
        <div>
          <label className="block mb-2 font-medium">Payment Method</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Online"
                checked={paymentMethod === "Online"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Online
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Cash On Delivery"
                checked={paymentMethod === "Cash On Delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash On Delivery
            </label>
          </div>
        </div>

        {/* Total Price Display */}
        <div className="text-lg font-semibold">
          Grand Total: ₹{calculateTotal()}
        </div>

        {/* Place Order Button */}
        <button
          onClick={handleOrder}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;
