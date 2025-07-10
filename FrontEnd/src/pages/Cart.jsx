import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axios";

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const [seatNumber, setSeatNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [error, setError] = useState("");

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleOrder = async () => {
    if (!seatNumber.trim()) {
      setError("Seat number is required.");
      return;
    }
    setError("");

    try {
      const payload = {
        seatNumber,
        items: cartItems.map(item => ({
          foodId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: calculateTotal(),
        paymentMethod
      };
      await axios.post('/order/place', payload);
      alert("Order placed successfully!");
      navigate("/myorder");
    } catch (err) {
      alert("Error placing order");
    }
  };

  return (
    <div className="w-full min-h-screen px-4 py-6 bg-gray-100 flex flex-col items-center">
      <h2 className="text-2xl font-extrabold mb-4">Your Cart</h2>

      <div className="w-full max-w-4xl overflow-x-auto flex flex-wrap gap-4 justify-center items-start mb-6">
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

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-4">
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

        <div className="text-lg font-semibold">
          Grand Total: ₹{calculateTotal()}
        </div>

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
