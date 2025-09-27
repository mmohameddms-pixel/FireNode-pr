import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const generateToken = (uid) => {
  return jwt.sign({ uid }, config.jwt.secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.jwt.secretKey);
};

export const generateVerificationToken = (uid) => {
  return jwt.sign({ uid }, config.jwt.secretKey, { expiresIn: '1h' });
};