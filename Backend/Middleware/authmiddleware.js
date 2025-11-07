const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'Muaz_JWT_Secret_2025';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // ✅ Ensure req.user.id is always available, even if token used _id key
    req.user = {
      id: decoded.id || decoded._id,
      email: decoded.email || null
    };

    if (!req.user.id) {
      return res.status(401).json({ message: 'Invalid token payload.' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = verifyToken;
