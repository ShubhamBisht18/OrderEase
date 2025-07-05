import express from 'express';
import { placeOrder, getAllOrders, updateOrderStatus, getUserOrders } from '../controllers/orderControllers.js';
import { AuthMiddleware, AdminMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/place', AuthMiddleware, placeOrder);
router.get('/all', AuthMiddleware, AdminMiddleware, getAllOrders);
router.get('/mine', AuthMiddleware, getUserOrders);
router.put('/:id/status', AuthMiddleware, updateOrderStatus);

export default router;