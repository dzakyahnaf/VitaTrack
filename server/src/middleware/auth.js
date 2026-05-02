const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  // Token usually comes as "Bearer <token>"
  const tokenBody = token.split(' ')[1] || token;

  jwt.verify(tokenBody, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized!' });
    req.userId = decoded.id;
    next();
  });
};

const verifyAdmin = async (req, res, next) => {
  const prisma = require('../prisma');
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Requires Admin Role!' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify admin status' });
  }
};

module.exports = { verifyToken, verifyAdmin };
