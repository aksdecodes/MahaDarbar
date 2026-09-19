const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  memberId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, trim: true, index: true },
  mobile: {
    type: String, required: true, trim: true, index: true,
    validate: { validator: v => /^[6-9]\d{9}$/.test(v), message: '{VALUE} is not a valid mobile number!' }
  },
  email: { type: String, lowercase: true, trim: true },
  address: { type: String, trim: true },
  joiningDate: { type: Date, required: true, default: Date.now },
  monthlyFee: { type: Number, required: true, min: 0 },
  membershipType: { type: String, enum: ['Regular', 'Special', 'Premium'], default: 'Regular' },
  isActive: { type: Boolean, default: true, index: true }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);