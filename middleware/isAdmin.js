// // middleware/isAdmin.js
// module.exports = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     return next();
//   }
//   return res.status(403).json({ error: "Access denied. Admins only." });
// };

// // Or, if using ES6 modules
export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    next();
}

