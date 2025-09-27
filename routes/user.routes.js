import { Router } from 'express';
import { authenticate } from '../middleware/authenticationMiddleware.js';
import { upload } from '../config/upload.js';
import { getProfile, updateProfile } from '../controllers/userController.js';

const router = Router();

router.get('/me', authenticate, getProfile); // Get user profile
router.put('/me', upload.single('profileImage'), authenticate, updateProfile); // Update user profile

export default router;
