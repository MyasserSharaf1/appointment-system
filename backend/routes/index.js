const express = require('express');
const router = express.Router();

// Import all route files
const authRoutes = require('./authRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const adminRoutes = require('./adminRoutes');
const doctorRoutes = require('./doctorRoutes');


// Mount routes
router.use('/auth', authRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/admin', adminRoutes);
router.use('/doctor', doctorRoutes);

module.exports = router;