const mongoose = require('mongoose');

const attendanceSessionSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    index: true // Formatted YYYY-MM-DD
  },
  mealType: {
    type: String,
    enum: ['LUNCH', 'DINNER'],
    required: true,
    index: true
  },
  token: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'EXPIRED'],
    default: 'ACTIVE',
    index: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

// Index for fast lookup of date + mealType active session
attendanceSessionSchema.index({ date: 1, mealType: 1, status: 1 });

module.exports = mongoose.model('AttendanceSession', attendanceSessionSchema);
