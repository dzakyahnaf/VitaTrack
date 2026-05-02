const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activities');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);
router.get('/', activitiesController.getActivities);
router.post('/', activitiesController.createActivity);
router.delete('/:id', activitiesController.deleteActivity);

module.exports = router;
