const prisma = require('../prisma');

const getActivities = async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      where: { userId: req.userId },
      orderBy: { date: 'desc' }
    });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};

const createActivity = async (req, res) => {
  try {
    const { title, type, duration, date } = req.body;
    const activity = await prisma.activity.create({
      data: {
        userId: req.userId,
        title,
        type,
        duration: parseInt(duration),
        date: new Date(date)
      }
    });
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    // ensure the activity belongs to the user
    const activity = await prisma.activity.findUnique({ where: { id } });
    if (!activity || activity.userId !== req.userId) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    
    await prisma.activity.delete({ where: { id } });
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
};

module.exports = { getActivities, createActivity, deleteActivity };
