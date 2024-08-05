const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');
const authenticate = require('../middleware/authenticate');
const tenant = require('../middleware/tenant');
const { validateAppointment } = require('../middleware/validation');

router.post('/', authenticate, tenant, validateAppointment, AppointmentController.create);
router.get('/', authenticate, tenant, AppointmentController.getAll);
router.get('/:id', authenticate, tenant, AppointmentController.getById);
router.put('/:id', authenticate, tenant, validateAppointment, AppointmentController.update);
router.delete('/:id', authenticate, tenant, AppointmentController.delete);

module.exports = router;
