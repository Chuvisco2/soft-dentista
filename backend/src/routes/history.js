const express = require('express');
const router = express.Router();
const HistoryController = require('../controllers/HistoryController');
const authenticate = require('../middleware/authenticate');
const tenant = require('../middleware/tenant');

router.post('/', authenticate, tenant, HistoryController.create);
router.get('/:patientId', authenticate, tenant, HistoryController.getByPatient);

module.exports = router;
