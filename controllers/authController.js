import { registerUser, loginUser, verifyUserEmail } from '../services/authService.js';
import { sendVerificationEmail } from '../services/emailService.js';
import { generateSessionToken, generateVerificationToken } from '../utils/tokenUtils.js';
import { handleError } from '../utils/errorHandler.js';
import { uploadFileToImgBB } from '../config/upload.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getUserById } from '../repositories/userRepository.js';
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
            const fileBuffer = req.file.buffer;
    const imageUrl = fileBuffer ? await uploadFileToImgBB(fileBuffer) : null;

    const user = await registerUser(email, password, name, imageUrl?.url ?? null);

    const token = generateVerificationToken(user.uid);

    // Send email verification
    await sendVerificationEmail(name, email, token);

    res.status(201).json({ message: 'User created. Please verify your email, a verification link has been sent to your email: ' + user.email + '.' });
  } catch (err) {
    handleError(res, err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    const token = generateSessionToken(user.uid, user.role);

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    handleError(res, err);
  }
};

export const verifyEmail = async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  try {
    const { token } = req.query;
    await verifyUserEmail(token);

    // Serve the success HTML page after email verification
    const successHtmlPath = path.join(__dirname, '..', 'templates', 'verificationSuccess.html');
    const successHtml = fs.readFileSync(successHtmlPath, 'utf8');
    res.status(200).send(successHtml);  // Send the success response page

  } catch (err) {
    // Serve the error HTML page if verification failed
    const errorHtmlPath = path.join(__dirname, '..', 'templates', 'verificationError.html');
    const errorHtml = fs.readFileSync(errorHtmlPath, 'utf8');
    res.status(400).send(errorHtml);
  }
};

export const resendVerificationEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Verification token is required' });
    }

    const decoded = jwt.decode(token);

    if (!decoded || !decoded.uid) {
      return res.status(400).json({ message: 'Invalid or corrupted token' });
    }

    const user = await getUserById(decoded.uid);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: 'Your email is already verified' });
    }

    const newToken = generateVerificationToken(user.uid);
    await sendVerificationEmail(user.name, user.email, newToken);

    res.status(200).json({
      message: 'A new verification email has been sent to your email address.',
    });
  } catch (err) {
    handleError(res, err);
  }
};
