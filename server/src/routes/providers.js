const express = require('express');
const router = express.Router();
const providersController = require('../controllers/providers');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

router.get('/', verifyToken, providersController.getProviders);
router.post('/', verifyToken, verifyAdmin, providersController.createProvider);
router.put('/:id', verifyToken, verifyAdmin, providersController.updateProvider);
router.delete('/:id', verifyToken, verifyAdmin, providersController.deleteProvider);

module.exports = router;
