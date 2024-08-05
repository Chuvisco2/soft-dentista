const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');
const authenticate = require('../middleware/authenticate');
const tenant = require('../middleware/tenant');
const { validatePatient } = require('../middleware/validation');

router.post('/', authenticate, tenant, validatePatient, PatientController.create);
router.get('/', authenticate, tenant, PatientController.getAll);
router.get('/:id', authenticate, tenant, PatientController.getById);
router.put('/:id', authenticate, tenant, validatePatient, PatientController.update);
router.delete('/:id', authenticate, tenant, PatientController.delete);
router.post('/import', authenticate, tenant, PatientController.importPatients);

module.exports = router;
