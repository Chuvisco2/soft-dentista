const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionController');
const authenticate = require('../middleware/authenticate');
const { validateTransaction } = require('../middleware/validation');

router.post('/', authenticate, validateTransaction, TransactionController.create);
router.get('/', authenticate, TransactionController.getAll);
router.get('/:id', authenticate, TransactionController.getById);
router.put('/:id', authenticate, validateTransaction, TransactionController.update);
router.delete('/:id', authenticate, TransactionController.delete);

module.exports = router;
