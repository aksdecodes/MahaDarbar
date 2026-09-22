const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[6-9]\d{9}$/
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    select: false
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  },
  role: {
    type: String,
    enum: ['MEMBER'],
    default: 'MEMBER'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
