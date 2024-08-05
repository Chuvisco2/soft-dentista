const express = require('express');
const router = express.Router();
const CommissionController = require('../controllers/CommissionController');
const authenticate = require('../middleware/authenticate');
const tenant = require('../middleware/tenant');

router.post('/', authenticate, tenant, CommissionController.create);
router.get('/', authenticate, tenant, CommissionController.getAll);
router.get('/:id', authenticate, tenant, CommissionController.getById);
router.put('/:id', authenticate, tenant, CommissionController.update);
router.delete('/:id', authenticate, tenant, CommissionController.delete);

module.exports = router;
