const mongoose = require('mongoose');

const groceryUsageSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'GroceryItem', required: true, index: true },
  quantity: { type: Number, required: true, min: 0.01 },
  reason: { type: String, trim: true, default: 'Daily Mess Use' },
  usageDate: { type: Date, required: true, default: Date.now }
}, { timestamps: true });

groceryUsageSchema.index({ usageDate: -1 });

module.exports = mongoose.model('GroceryUsage', groceryUsageSchema);
