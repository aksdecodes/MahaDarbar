const mongoose = require('mongoose');

const groceryPurchaseSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'GroceryItem', required: true, index: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true, index: true },
  quantity: { type: Number, required: true, min: 0.01 },
  unitPrice: { type: Number, required: true, min: 0 },
  totalAmount: { type: Number, required: true, min: 0 },
  purchaseDate: { type: Date, required: true, default: Date.now },
  paymentMode: { 
    type: String, 
    enum: ['CASH', 'UPI', 'BANK_TRANSFER', 'CHEQUE', 'OTHER'], 
    default: 'CASH' 
  },
  notes: { type: String, trim: true }
}, { timestamps: true });

groceryPurchaseSchema.index({ purchaseDate: -1 });

module.exports = mongoose.model('GroceryPurchase', groceryPurchaseSchema);
