import { registerUser, loginUser, verifyUserEmail } from '../services/authService.js';
import { sendVerificationEmail } from '../services/emailService.js';
import { generateSessionToken, generateVerificationToken } from '../utils/tokenUtils.js';
import { handleError } from '../utils/errorHandler.js';
import { uploadFileToImgBB } from '../config/upload.js';

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const imageUrl = req.file?.path ? await uploadFileToImgBB(req.file.path) : null;

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
  try {
    const { token } = req.query;
    await verifyUserEmail(token);
    res.status(200).json({ message: 'Email verified successfully, you can login now.' });
  } catch (err) {
    handleError(res, err);
  }
};
