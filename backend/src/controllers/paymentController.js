const Payment = require('../models/Payment');
const Member = require('../models/Member');
const { calculateValidityExtension } = require('../utils/statusCalculator');

exports.createPayment = async (req, res, next) => {
  try {
    const memberId = req.params.id;
    const member = await Member.findOne({ _id: memberId, isActive: true });
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
    
    const { amount, paymentDate, paymentMode, notes, months = 1 } = req.body;
    const latestPayment = await Payment.findOne({ member: memberId, status: 'PAID' }).sort({ validTill: -1 });
    
    const { validFrom, validTill } = calculateValidityExtension(latestPayment?.validTill, paymentDate || new Date(), months);
    
    const payment = await Payment.create({
      member: memberId, amount, paymentDate: paymentDate || new Date(), validFrom, validTill, paymentMode, notes, status: 'PAID'
    });
    res.status(201).json({ success: true, data: payment });
  } catch (error) { next(error); }
};

exports.getMemberPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ member: req.params.id }).sort({ paymentDate: -1 });
    res.json({ success: true, data: payments });
  } catch (error) { next(error); }
};