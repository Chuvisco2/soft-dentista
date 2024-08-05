const { body, validationResult } = require('express-validator');

// Patient validation
const validatePatient = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('birthDate').isDate().withMessage('Valid birth date is required'),
  body('type').isIn(['particular', 'convenio']).withMessage('Type must be either particular or convenio'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Transaction validation
const validateTransaction = [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('type').isIn(['income', 'expense']).withMessage('Type must be either income or expense'),
  body('description').isString().withMessage('Description must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validatePatient,
  validateTransaction,
};
