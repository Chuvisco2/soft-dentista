const express = require('express');
const router = express.Router();
const QuoteController = require('../controllers/QuoteController');
const authenticate = require('../middleware/authenticate');
const tenant = require('../middleware/tenant');

router.post('/', authenticate, tenant, QuoteController.create);
router.get('/:patientId', authenticate, tenant, QuoteController.getByPatient);

module.exports = router;
