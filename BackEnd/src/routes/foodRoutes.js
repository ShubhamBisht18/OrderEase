import express from 'express';
import { addFood, getAllFood } from '../controllers/foodControllers.js';
import { AuthMiddleware, AdminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', AuthMiddleware, AdminMiddleware, addFood);  // Admin only
router.get('/', getAllFood); // Public

export default router;