const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  getMyPayments
} = require('../controllers/userAuthController');
const { protectUser } = require('../middleware/userAuth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protectUser, getProfile);
router.get('/my-payments', protectUser, getMyPayments);

module.exports = router;
