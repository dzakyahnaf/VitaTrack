const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);
router.get('/', habitsController.getHabits);
router.post('/', habitsController.createHabit);
router.patch('/:id/toggle', habitsController.toggleHabit);
router.delete('/:id', habitsController.deleteHabit);

module.exports = router;
