// import React, { useEffect, useState } from 'react';
// import axios from '../axios';

// function MyOrders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axios.get('/order/mine').then(res => setOrders(res.data)).catch(console.error);
//   }, []);

//   const markAsReceived = async (id) => {
//     try {
//       await axios.put(`/order/${id}/status`, { status: 'Received' });
//       setOrders(prev => prev.map(o => o._id === id ? { ...o, status: 'Received' } : o));
//     } catch (err) {
//       alert("Failed to update status");
//     }
//   };

//   return (
//     <div>
//       <h2>My Orders</h2>
//       {orders.map(order => (
//         <div key={order._id} style={{ border: '1px solid', margin: 10, padding: 10 }}>
//           <p><strong>Seat:</strong> {order.seatNumber}</p>
//           <p><strong>Total:</strong> ₹{order.totalAmount}</p>
//           <p><strong>Status:</strong> {order.status}</p>
//           <ul>
//             {order.items.map((item, index) => (
//               <li key={index}>{item.name} - {item.quantity} × ₹{item.price}</li>
//             ))}
//           </ul>
//           {order.status === 'Ready' && <button onClick={() => markAsReceived(order._id)}>Order Received</button>}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MyOrders;


import React, { useEffect, useState } from 'react';
import axios from '../axios';

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('/order/mine')
      .then(res => setOrders(res.data))
      .catch(console.error);
  }, []);

  const markAsReceived = async (id) => {
    try {
      await axios.put(`/order/${id}/status`, { status: 'Received' });
      setOrders(prev =>
        prev.map(o => (o._id === id ? { ...o, status: 'Received' } : o))
      );
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    const common = 'px-3 py-1 rounded-full text-xs font-semibold';
    switch (status) {
      case 'Pending':
        return `${common} bg-yellow-100 text-yellow-700`;
      case 'Preparing':
        return `${common} bg-blue-100 text-blue-700`;
      case 'Ready':
        return `${common} bg-green-100 text-green-700`;
      case 'Received':
        return `${common} bg-gray-200 text-gray-700`;
      default:
        return `${common} bg-gray-100 text-gray-600`;
    }
  };

  return (
    <div className="w-full min-h-screen px-4 py-8 bg-gradient-to-b from-gray-200 to-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">My Orders</h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No orders yet.</p>
        ) : (
          orders.map(order => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mb-4">
                <p className="text-sm text-gray-700"><span className="font-medium">Seat:</span> {order.seatNumber}</p>
                <span className={getStatusBadge(order.status)}>{order.status}</span>
              </div>

              <div className="mb-4">
                <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.quantity} × ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-base font-semibold text-blue-600">Total: ₹{order.totalAmount}</p>

                {order.status === 'Ready' && (
                  <button
                    onClick={() => markAsReceived(order._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-md transition"
                  >
                    Order Received
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyOrders;
