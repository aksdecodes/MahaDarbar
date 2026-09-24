const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
    index: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  memberId: {
    type: String,
    required: true,
    index: true
  },
  memberName: {
    type: String,
    required: true
  },
  memberMobile: {
    type: String
  },
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
  status: {
    type: String,
    enum: ['PRESENT', 'ABSENT'],
    default: 'PRESENT'
  },
  markedAt: {
    type: Date,
    default: Date.now
  },
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AttendanceSession'
  }
}, {
  timestamps: true
});

// Enforce rule #11: Unique attendance per member per meal per day
attendanceSchema.index({ member: 1, date: 1, mealType: 1 }, { unique: true });
attendanceSchema.index({ memberId: 1, date: 1, mealType: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
