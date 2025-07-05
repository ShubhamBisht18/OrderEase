import express from "express";
import { GetUser, Login, Logout, Register } from '../controllers/authControllers.js'
import { AuthMiddleware, AdminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router()

// Public routes
router.post('/register',Register)
router.post('/login',Login)
router.post('/logout',Logout)

// Protected route (user must be logged in)
router.get('/me',AuthMiddleware,GetUser)

// Admin-only route example
router.get('/admin-data', AuthMiddleware, AdminMiddleware, GetUser);


export default router