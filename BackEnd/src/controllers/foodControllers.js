import Food from '../models/foodModels.js';

export const addFood = async (req, res) => {
  const { name, price, image } = req.body;
  try {
    const food = new Food({ name, price, image });
    await food.save();
    res.status(201).json(food);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllFood = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch food items' });
  }
};