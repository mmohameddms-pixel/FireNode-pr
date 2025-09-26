import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/token.js";
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "Authentication required" });
  } else {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid or expired token" });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
}