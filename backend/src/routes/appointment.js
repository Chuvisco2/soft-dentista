const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, AppointmentController.create);
router.get('/', authenticate, AppointmentController.getAll);
router.get('/:id', authenticate, AppointmentController.getById);
router.put('/:id', authenticate, AppointmentController.update);
router.delete('/:id', authenticate, AppointmentController.delete);

module.exports = router;
