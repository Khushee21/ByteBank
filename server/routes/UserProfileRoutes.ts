import express from 'express';
import { getUserProfile } from '../controllers/UserProfileController';
import { authMiddleware } from '../middlewares/authMiddlewar';

const router = express.Router();

// Add authMiddleware if required
router.get('/getProfile', authMiddleware, getUserProfile);

export default router;
