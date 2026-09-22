const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    index: true,
    enum: ['Unlimited Thali', 'Traditional Thali', 'Non Veg Thali', 'Special Combos', 'Paneer Specialties', 'Dal', 'Rice', 'Veg Curries', 'Non Veg Curries', 'Roti', 'Budget Combos']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: String,
  isVeg: {
    type: Boolean,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true,
    index: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  includes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
