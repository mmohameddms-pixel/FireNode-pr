import { Router } from 'express';
import { body, query } from 'express-validator';
import { upload } from '../config/upload.js';
import { validate } from '../middleware/validationMiddleware.js';
import { login, register, verifyEmail } from '../controllers/authController.js';

const router = Router();

router.post('/register',
    upload.single('image'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters'),
    body('name').isAlpha().withMessage('Name must contain only letters')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    validate,
    register
);

router.post('/login',
    upload.none(),
    body('email').isEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters'),
    validate,
    login
);

router.get('/verify-email',
    query('token').exists(),
    validate,
    verifyEmail
);

export default router;
