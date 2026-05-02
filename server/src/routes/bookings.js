const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);
router.get('/', bookingsController.getBookings);
router.post('/', bookingsController.createBooking);
router.patch('/:id/cancel', bookingsController.cancelBooking);

module.exports = router;
