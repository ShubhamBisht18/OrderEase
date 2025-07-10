import React, { useEffect, useState } from "react";
import instance from "../axios";
import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [qty, setQty] = useState({});

  useEffect(() => {
    instance.get('/food')
      .then((res) => {
        const foodArray = Array.isArray(res.data) ? res.data : res.data.data;
        setFoods(foodArray);
        const initialQty = {};
        foodArray.forEach(food => {
          initialQty[food._id] = 0;
        });
        setQty(initialQty);
      })
      .catch((err) => {
        console.error("Error fetching food list", err);
      });
  }, []);

  const IncQty = (id) => {
    setQty(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const DecQty = (id) => {
    setQty(prev => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  const handleAddToCart = () => {
    const selectedItems = foods.filter(food => qty[food._id] > 0)
      .map(food => ({
        ...food,
        quantity: qty[food._id]
      }));
    navigate('/cart', { state: { cartItems: selectedItems } });
  };

  // 🔥 Group foods into rows of 10 items
  // const groupFoods = (arr, size = 10) => {
  //   const grouped = [];
  //   for (let i = 0; i < arr.length; i += size) {
  //     grouped.push(arr.slice(i, i + size));
  //   }
  //   return grouped;
  // };

  // const groupedFoods = groupFoods(foods, 10); // 🔥 10 cards per row

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white overscroll-x-none">
      {/* Header */}
      <div className="w-full h-[120px] overflow-hidden flex justify-center items-center bg-white">
        <img className="w-[250px] sm:w-[300px]" src="src/assets/Video/menu final video.gif" alt="Menu" />
      </div>

      {/* Multiple scrollable rows */}
      <div className="w-[100%] h-[100%] flex justify-center items-center flex-col">
        <div className="w-[100%] flex flex-col gap-10 mt-8"> {/* 🔥 gap between rows */}
          <div className=" overflow-x-auto px-2"> {/* 🔥 added overflow-x-auto */}
        <div className="flex gap-6 py-6 w-max mt-[30px]"> {/* 🔥 replaced grid with flex and added w-max */}
          {foods.map(food => (
            <div key={food._id} className="bg-white w-[180px] h-[200px] rounded-3xl shadow-2xl relative flex flex-col justify-end items-center text-center p-2">
              <div className="h-[130px] w-[130px] absolute top-[-40px] left-1/2 transform -translate-x-1/2"> {/* 🔥 centered image */}
                <img src={food.image} alt={food.name} className="w-[120px] h-[120px] rounded-full shadow-2xl object-cover" />
              </div>
              <div className="mt-[90px]">
                <h4 className="font-semibold">{food.name}</h4>
                <p className="font-bold text-lg text-orange-600">₹{food.price}</p>
              </div>
              <div className="mt-2 flex justify-center items-center space-x-2 mb-3">
                <button className="border border-gray-300 font-bold w-[32px] h-[32px] rounded-lg flex justify-center items-center" onClick={() => DecQty(food._id)}>-</button>
                <input className="bg-gray-100 w-[40px] h-[32px] rounded-lg text-center" value={qty[food._id]} readOnly />
                <button className="border border-gray-300 font-bold w-[32px] h-[32px] rounded-lg flex justify-center items-center" onClick={() => IncQty(food._id)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-8">
        <button onClick={handleAddToCart} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-lg shadow-md">
          Add to Cart
        </button>
      </div>
    </div>
      </div>
  );
}

export default Menu;
