const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true, index: true },
  amount: { type: Number, required: true, min: 0 },
  paymentDate: { type: Date, required: true, default: Date.now },
  validFrom: { type: Date, required: true },
  validTill: { type: Date, required: true },
  status: { type: String, enum: ['PAID', 'PARTIAL', 'REFUNDED', 'CANCELLED'], default: 'PAID' },
  paymentMode: { type: String, enum: ['CASH', 'UPI', 'BANK_TRANSFER', 'CHEQUE'], default: 'CASH' },
  notes: { type: String }
}, { timestamps: true });

paymentSchema.index({ member: 1, paymentDate: -1 });

module.exports = mongoose.model('Payment', paymentSchema);