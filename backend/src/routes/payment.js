const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');
const authenticate = require('../middleware/authenticate');
const tenant = require('../middleware/tenant');

router.post('/create-payment-intent', authenticate, tenant, PaymentController.createPaymentIntent);
router.post('/create-customer', authenticate, tenant, PaymentController.createCustomer);
router.post('/create-charge', authenticate, tenant, PaymentController.createCharge);

module.exports = router;
