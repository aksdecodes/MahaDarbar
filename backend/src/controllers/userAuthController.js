const User = require('../models/User');
const Member = require('../models/Member');
const Payment = require('../models/Payment');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id, role: 'MEMBER' }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

exports.register = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    if (!name || !mobile || !password) {
      return res.status(400).json({ success: false, message: 'Name, mobile and password are required' });
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: 'Invalid mobile format' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Mobile number already registered' });
    }

    // Check if there is an existing member with this mobile
    const existingMember = await Member.findOne({ mobile, isActive: true });
    
    const user = await User.create({
      name,
      mobile,
      email,
      password,
      member: existingMember ? existingMember._id : undefined
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        role: user.role,
        member: user.member || null
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({ success: false, message: 'Mobile and password are required' });
    }

    const user = await User.findOne({ mobile }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
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
