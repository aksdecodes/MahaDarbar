const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['info', 'warning', 'festival', 'general'],
    default: 'general'
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  priority: {
    type: Number,
    default: 0
  },
  expiresAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Announcement', announcementSchema);
