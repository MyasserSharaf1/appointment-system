const User = require('../models/User');
const Appointment = require('../models/Appointment');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get doctor's profile
// @route   GET /api/doctor/profile
// @access  Private/Doctor
exports.getProfile = async (req, res, next) => {
  try {
    const doctor = await User.findById(req.user.id).select('-password');
    res.status(200).json({ success: true, data: doctor });
  } catch (err) {
    next(err);
  }
};

// @desc    Update doctor's profile
// @route   PUT /api/doctor/profile
// @access  Private/Doctor
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, specialization } = req.body;
    const doctor = await User.findByIdAndUpdate(
      req.user.id,
      { name, specialization },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.status(200).json({ success: true, data: doctor });
  } catch (err) {
    next(err);
  }
};

// @desc    Get doctor's appointments
// @route   GET /api/doctor/appointments
// @access  Private/Doctor
exports.getDoctorAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user.id })
      .populate('patient', 'name email')
      .sort({ date: 1, timeSlot: 1 });

    res.status(200).json({ success: true, data: appointments });
  } catch (err) {
    next(err);
  }
};