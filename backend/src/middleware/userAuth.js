const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protectUser = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      code: 'UNAUTHORIZED',
      message: 'Please sign in as a member to continue'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Make sure it's a MEMBER token, not admin
    if (decoded.role !== 'MEMBER') {
      return res.status(401).json({
        success: false,
        code: 'UNAUTHORIZED',
        message: 'Please sign in as a member to mark attendance'
      });
    }

    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({
        success: false,
        code: 'UNAUTHORIZED',
        message: 'Member session not found. Please sign in again.'
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      code: 'UNAUTHORIZED',
      message: 'Session expired. Please sign in again.'
    });
  }
};

module.exports = { protectUser };
