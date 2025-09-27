import { Router } from 'express';
import { authenticate } from '../middleware/authenticationMiddleware.js';
import { promoteToAdmin, demoteToUser, listUsers, deleteUserProfile } from '../controllers/adminController.js';
const router = Router();

// Admin routes for  listing,promoting, demoting and deleting users
router.get('/users', authenticate, listUsers);
router.put('/users/promote', authenticate, promoteToAdmin);
router.put('/users/demote', authenticate, demoteToUser);
router.delete('/users/delete', authenticate, deleteUserProfile);

export default router;
