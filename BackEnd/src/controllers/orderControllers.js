import Order from '../models/orderModels.js';

export const placeOrder = async (req, res) => {
  try {
    const { seatNumber, items, totalAmount, paymentMethod } = req.body;
    const userId = req.user.id;

    const order = new Order({
      user: userId,
      seatNumber,
      items,
      totalAmount,
      paymentMethod,
      isPaid: paymentMethod === 'Online',
      status: 'Pending'
    });

    await order.save();
    res.status(201).json({ message: 'Order placed', order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email mobile');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};