import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Authentication required' });

  jwt.verify(token, config.jwt.secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid or expired token' });

    req.user = decoded;
    next();
  });
};
