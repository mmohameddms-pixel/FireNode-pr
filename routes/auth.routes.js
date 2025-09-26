import { Router } from 'express';
import { register, login, verifyEmail } from '../controllers/auth.controller.js';
import { body, query } from 'express-validator';
import { upload } from '../config/upload.js';




const router = Router();

router.post('/register', body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
    ,
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    upload.single('image')
    , register);
router.get('/verify-email', query('token').exists().withMessage('Token is required'), verifyEmail)
router.post('/login', body('email').isEmail().withMessage('Invalid email'), login);

export default router;