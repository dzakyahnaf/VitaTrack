const prisma = require('../prisma');

const getBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.userId },
      include: { provider: true },
      orderBy: { date: 'asc' }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

const createBooking = async (req, res) => {
  try {
    const { providerId, date, time, reason } = req.body;
    const booking = await prisma.booking.create({
      data: {
        userId: req.userId,
        providerId,
        date,
        time,
        reason,
        status: 'confirmed'
      },
      include: { provider: true }
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await prisma.booking.findUnique({ where: { id } });
    
    if (!booking || booking.userId !== req.userId) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status: 'cancelled' }
    });
    
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
};

module.exports = { getBookings, createBooking, cancelBooking };
