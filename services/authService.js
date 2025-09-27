import bcrypt from 'bcryptjs';
import { createUser, getUserByEmail, setUserEmailVerified } from '../repositories/userRepository.js';
import { config } from '../config/config.js';
import jwt from 'jsonwebtoken';
export const registerUser = async (email, password, name, profileImageUrl) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name,
    email,
    password: hashedPassword,
    uid: '',  // Firestore auto-generates ID
    role: 'user',  // Default role
    profileImage: profileImageUrl ?? 'no image uploaded yet.',
    emailVerified: false,
  };

  const userId = await createUser(newUser);
  return { uid: userId, email }; // Return new user details
};

export const loginUser = async (email, password) => {
  const userSnapshot = await getUserByEmail(email);
  if (!userSnapshot) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(password, userSnapshot.password);
  if (!isPasswordValid) throw new Error('Invalid password');

  if (!userSnapshot.emailVerified) throw new Error('User is not verified, please verify your email first');

  return { uid: userSnapshot.uid, role: userSnapshot.role };
};

export const verifyUserEmail = (token) => {
  const decoded = jwt.verify(token, config.jwt.secretKey);
  if (!decoded)
    throw new Error('Invalid or expired token');
  setUserEmailVerified(decoded.uid);
}
