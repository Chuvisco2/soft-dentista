const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionController');
const authenticate = require('../middleware/authenticate');
const tenant = require('../middleware/tenant');

router.post('/', authenticate, tenant, TransactionController.create);
router.get('/', authenticate, tenant, TransactionController.getAll);
router.get('/:id', authenticate, tenant, TransactionController.getById);
router.put('/:id', authenticate, tenant, TransactionController.update);
router.delete('/:id', authenticate, tenant, TransactionController.delete);

module.exports = router;
