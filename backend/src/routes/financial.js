// src/routes/financial.js
const express = require('express');
const router = express.Router();
const FinancialController = require('../controllers/FinancialController');
const authenticate = require('../middleware/authenticate');
const tenant = require('../middleware/tenant');

router.post('/charge', authenticate, tenant, FinancialController.createCharge);
router.get('/report', authenticate, tenant, FinancialController.getFinancialReport);

module.exports = router;
