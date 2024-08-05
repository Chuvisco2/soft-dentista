const { check, validationResult } = require('express-validator');

module.exports = {
  validatePatient: [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('phone').not().isEmpty().withMessage('Phone is required'),
    check('address').not().isEmpty().withMessage('Address is required'),
    check('birthDate').isDate().withMessage('Invalid birth date'),
    check('type').isIn(['particular', 'convenio']).withMessage('Invalid type'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  validateAppointment: [
    check('date').isDate().withMessage('Invalid date'),
    check('description').not().isEmpty().withMessage('Description is required'),
    check('patientId').isInt().withMessage('Invalid patient ID'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
};
