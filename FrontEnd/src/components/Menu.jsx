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

  return (
    <div className="w-w-screen h-[90vh] border-2 border-red-500">
      <h2>Menu</h2>
      {foods.map(food => (
        <div key={food._id} className=" w-[180px] h-[210px] rounded-3xl shadow-2xl  relative flex justify-end items-center flex-col text-center">
          <img src={food.image} alt={food.name} className="w-[130px] h-[130px] rounded-full absolute top-[-35px] left-[25px] shadow-2xl" />
          <div className="w-[100%] h-[30px]">
            <h4 className="font-semibold">{food.name}</h4>
          </div>
          <div className="w-[100%] h-[30px]">
            <p className="font-bold text-lg">₹{food.price}</p>
          </div>
          <div className="w-[100%] h-[25%] flex justify-center items-center space-x-1">
            <button className="border-2 border-gray-300 font-bold w-[35px] h-[35px] rounded-lg flex justify-center items-center" onClick={() => DecQty(food._id)}>-</button>
            <input className="bg-gray-200 w-[45px] h-[35px] rounded-lg flex justify-center items-center text-center" value={qty[food._id]} readOnly />
            <button className="border-2 border-gray-300 font-bold w-[35px] h-[35px] rounded-lg flex justify-center items-center" onClick={() => IncQty(food._id)}>+</button>
          </div>
        </div>
      ))}

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Menu;