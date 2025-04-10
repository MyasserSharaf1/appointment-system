const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  getDoctorAppointments
} = require('../controllers/doctorController');

router.use(protect, authorize('doctor'));

router.route('/profile')
  .get(getProfile)
  .put(updateProfile);

router.route('/appointments')
  .get(getDoctorAppointments);

module.exports = router;