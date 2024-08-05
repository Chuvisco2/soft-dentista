const express = require('express');
const router = express.Router();
const PrescriptionController = require('../controllers/PrescriptionController');
const authenticate = require('../middleware/authenticate');
const tenant = require('../middleware/tenant');

router.post('/', authenticate, tenant, PrescriptionController.create);
router.get('/:patientId', authenticate, tenant, PrescriptionController.getByPatient);

module.exports = router;
