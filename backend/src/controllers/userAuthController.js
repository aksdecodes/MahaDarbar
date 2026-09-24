const User = require('../models/User');
const Member = require('../models/Member');
const Payment = require('../models/Payment');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id, role: 'MEMBER' }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

/**
 * MEMBER SIGNUP
 * - Phone number = username (no separate name input)
 * - Phone MUST be in admin's Members list
 * - Phone must not already have a User account
 */
exports.register = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({ success: false, message: 'Mobile number and password are required' });
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: 'Invalid mobile number. Enter a valid 10-digit Indian mobile number.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    // Step 1: Check if this mobile is in admin's Members list
    const memberRecord = await Member.findOne({ mobile, isActive: true });
    if (!memberRecord) {
      return res.status(400).json({
        success: false,
        message: 'This mobile number is not registered as a mess member. Please contact the admin to get registered first.'
      });
    }

    // Step 2: Check if User account already exists for this mobile
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'This mobile number is already registered. Please sign in instead.'
      });
    }

    // Step 3: Create User — name auto-filled from Member record
    const user = await User.create({
      name: memberRecord.name,
      mobile,
      password,
      member: memberRecord._id,
      role: 'MEMBER',
      isActive: true
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        role: user.role,
        member: user.member || null
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * MEMBER SIGNIN
 * - Mobile + Password
 */
exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({ success: false, message: 'Mobile number and password are required' });
    }

    const user = await User.findOne({ mobile }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'No account found for this mobile number. Please sign up first.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password. Please try again.' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        role: user.role,
        member: user.member || null
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('member');

    let memberStatus = null;
    let latestPayment = null;

    if (user.member) {
      latestPayment = await Payment.findOne({
        member: user.member._id,
        status: 'PAID'
      }).sort({ paymentDate: -1 });

      if (latestPayment && latestPayment.validTill >= new Date()) {
        memberStatus = 'ACTIVE';
      } else {
        memberStatus = 'DUE';
      }
    }

    res.status(200).json({
      success: true,
      data: {
        user,
        memberStatus,
        latestPayment
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMyPayments = async (req, res) => {
  try {
    if (!req.user.member) {
      return res.status(200).json({ success: true, data: [] });
    }
    const payments = await Payment.find({ member: req.user.member }).sort({ paymentDate: -1 });
    res.status(200).json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
