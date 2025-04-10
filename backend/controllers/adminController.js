// backend/controllers/adminController.js
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

// @desc    Create doctor
// @route   POST /api/admin/doctors
// @access  Private/Admin
exports.createDoctor = async (req, res, next) => {
  try {
    const { name, email, password, specialization } = req.body;
    
    const doctor = await User.create({
      name,
      email,
      password,
      role: 'doctor',
      specialization
    });

    res.status(201).json({ success: true, data: doctor });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all appointments
// @route   GET /api/admin/appointments
// @access  Private/Admin
exports.getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name email')
      .populate('doctor', 'name specialization');

    res.status(200).json({ success: true, data: appointments });
  } catch (err) {
    next(err);
  }
};