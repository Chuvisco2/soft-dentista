// src/routes/index.js
const express = require('express');
const router = express.Router();
const patientRoutes = require('./patient');
const authRoutes = require('./auth');
const appointmentRoutes = require('./appointment');
const transactionRoutes = require('./transaction');

router.use('/patients', patientRoutes);
router.use('/auth', authRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;
