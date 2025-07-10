import React, { useEffect, useState } from "react";
import axios from "../axios";

function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/order/all').then(res => setOrders(res.data)).catch(console.error);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/order/${id}/status`, { status });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
    } catch (err) {
      alert("Failed to update order status");
    }
  };

  const pending = orders.filter(o => o.status === 'Pending');
  const ready = orders.filter(o => o.status === 'Ready');
  const received = orders.filter(o => o.status === 'Received');

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "Pending":
        return `${base} bg-yellow-100 text-yellow-700`;
      case "Ready":
        return `${base} bg-green-100 text-green-700`;
      case "Received":
        return `${base} bg-gray-200 text-gray-700`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Order Dashboard</h2>

      {/* Section: Pending Orders */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-yellow-600 mb-4">Pending Orders</h3>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {pending.map(order => (
            <div key={order._id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-semibold">User:</span> {order.user.name} ({order.user.email})
                </p>
                <span className={getStatusBadge(order.status)}>{order.status}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1"><strong>Seat:</strong> {order.seatNumber}</p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Method:</strong> {order.paymentMethod} — {order.isPaid ? "Paid" : "Unpaid"}
              </p>
              <ul className="text-sm text-gray-700 mb-3 list-disc list-inside">
                {order.items.map((item, i) => (
                  <li key={i}>{item.name} - {item.quantity} × ₹{item.price}</li>
                ))}
              </ul>
              <p className="font-semibold text-blue-600 mb-4">Total: ₹{order.totalAmount}</p>
              <button
                onClick={() => updateStatus(order._id, 'Ready')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-md transition"
              >
                Mark as Ready
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Ready Orders */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Ready Orders</h3>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {ready.map(order => (
            <div key={order._id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-semibold">User:</span> {order.user.name} ({order.user.email})
                </p>
                <span className={getStatusBadge(order.status)}>{order.status}</span>
              </div>
              <ul className="text-sm text-gray-700 mb-3 list-disc list-inside">
                {order.items.map((item, i) => (
                  <li key={i}>{item.name} - {item.quantity} × ₹{item.price}</li>
                ))}
              </ul>
              <p className="font-semibold text-blue-600">Total: ₹{order.totalAmount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Completed Orders */}
      <div>
        <h3 className="text-xl font-semibold text-gray-600 mb-4">Completed Orders</h3>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {received.map(order => (
            <div key={order._id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-semibold">User:</span> {order.user.name}
                </p>
                <span className={getStatusBadge(order.status)}>{order.status}</span>
              </div>
              <ul className="text-sm text-gray-700 mb-3 list-disc list-inside">
                {order.items.map((item, i) => (
                  <li key={i}>{item.name} - {item.quantity} × ₹{item.price}</li>
                ))}
              </ul>
              <p className="font-semibold text-blue-600">Total: ₹{order.totalAmount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
