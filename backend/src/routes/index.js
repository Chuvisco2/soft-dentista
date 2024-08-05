// src/routes/index.js

const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const patientRoutes = require('./patient');
const appointmentRoutes = require('./appointment');
const financialRoutes = require('./financial');
const prescriptionRoutes = require('./prescription');
const quoteRoutes = require('./quote');

// Inclui os jobs
require('../jobs/alignmentReminderJob');
require('../jobs/returnReminderJob');

router.use('/auth', authRoutes);
router.use('/patients', patientRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/financial', financialRoutes);
router.use('/prescriptions', prescriptionRoutes);
router.use('/quotes', quoteRoutes);

module.exports = router;
