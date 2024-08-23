import express from 'express';
import { registerUser, loginUser, authenticateToken, logoutUser, protectedRoute } from '../controllers/authController.mjs';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/protected', authenticateToken, protectedRoute); // Защищенный маршрут

export default router;
