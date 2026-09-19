const mongoose = require('mongoose');

const groceryItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true, trim: true, index: true },
  category: { type: String, required: true, trim: true, index: true },
  currentStock: { type: Number, required: true, default: 0, min: 0 },
  unit: { type: String, required: true, trim: true },
  minimumStock: { type: Number, required: true, default: 0, min: 0 },
  averagePrice: { type: Number, default: 0, min: 0 },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', default: null },
  description: { type: String, trim: true },
  isActive: { type: Boolean, default: true, index: true }
}, { timestamps: true });

// Virtual to derive stock status dynamically
groceryItemSchema.virtual('status').get(function() {
  if (this.currentStock === 0) return 'OUT_OF_STOCK';
  if (this.currentStock <= this.minimumStock) return 'LOW_STOCK';
  return 'IN_STOCK';
});

// Ensure virtuals are included when converting document to JSON or object
groceryItemSchema.set('toJSON', { virtuals: true });
groceryItemSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('GroceryItem', groceryItemSchema);
