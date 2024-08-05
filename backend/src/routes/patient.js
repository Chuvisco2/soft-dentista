const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');
const authenticate = require('../middleware/authenticate');
const { validatePatient } = require('../middleware/validation');

router.post('/', authenticate, validatePatient, PatientController.create);
router.get('/', authenticate, PatientController.getAll);
router.get('/:id', authenticate, PatientController.getById);
router.put('/:id', authenticate, validatePatient, PatientController.update);
router.delete('/:id', authenticate, PatientController.delete);

module.exports = router;
