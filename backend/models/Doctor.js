const mongoose = require('mongoose');
const User = require('./User');

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  specialization: {
    type: String,
    required: [true, 'Please add a specialization'],
    trim: true
  },
  qualifications: {
    type: [String],
    required: true
  },
  availableSlots: {
    type: [String],
    default: ['09:00', '10:00', '11:00', '14:00', '15:00']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Cascade delete appointments when doctor is deleted
doctorSchema.pre('remove', async function(next) {
  await this.model('Appointment').deleteMany({ doctor: this._id });
  next();
});

module.exports = mongoose.model('Doctor', doctorSchema);