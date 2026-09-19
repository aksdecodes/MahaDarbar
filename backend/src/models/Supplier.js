const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  contact: { type: String, trim: true },
  email: { type: String, lowercase: true, trim: true },
  address: { type: String, trim: true },
  notes: { type: String, trim: true },
  isActive: { type: Boolean, default: true, index: true }
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
