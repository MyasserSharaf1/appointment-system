const Appointment = require('../models/Appointment');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res, next) => {
  try {
    let query;
    if (req.user.role === 'patient') {
      query = { patient: req.user.id };
    } else if (req.user.role === 'doctor') {
      query = { doctor: req.user.id };
    } else {
      query = {};
    }

    const appointments = await Appointment.find(query)
      .populate('patient', 'name email')
      .populate('doctor', 'name specialization');

    res.status(200).json({ success: true, data: appointments });
  } catch (err) {
    next(err);
  }
};

// @desc    Create appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res, next) => {
  try {
    req.body.patient = req.user.role === 'patient' ? req.user.id : req.body.patient;
    const appointment = await Appointment.create(req.body);
    res.status(201).json({ success: true, data: appointment });
  } catch (err) {
    next(err);
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res, next) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return next(new ErrorResponse('Appointment not found', 404));
    }

    // Verify user owns the appointment or is admin
    if (appointment.patient.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse('Not authorized to update this appointment', 401));
    }

    appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: appointment });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return next(new ErrorResponse('Appointment not found', 404));
    }

    // Verify user owns the appointment or is admin
    if (appointment.patient.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse('Not authorized to delete this appointment', 401));
    }

    await appointment.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
};