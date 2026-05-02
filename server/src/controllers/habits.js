const prisma = require('../prisma');

const getHabits = async (req, res) => {
  try {
    const habits = await prisma.habit.findMany({
      where: { userId: req.userId }
    });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch habits' });
  }
};

const createHabit = async (req, res) => {
  try {
    const { title } = req.body;
    const habit = await prisma.habit.create({
      data: {
        userId: req.userId,
        title,
        streak: 0,
        isCompletedToday: false
      }
    });
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create habit' });
  }
};

const toggleHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const habit = await prisma.habit.findUnique({ where: { id } });
    
    if (!habit || habit.userId !== req.userId) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    
    const updatedHabit = await prisma.habit.update({
      where: { id },
      data: {
        isCompletedToday: !habit.isCompletedToday,
        streak: !habit.isCompletedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1)
      }
    });
    
    res.json(updatedHabit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update habit' });
  }
};

const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const habit = await prisma.habit.findUnique({ where: { id } });
    
    if (!habit || habit.userId !== req.userId) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    
    await prisma.habit.delete({ where: { id } });
    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete habit' });
  }
};

module.exports = { getHabits, createHabit, toggleHabit, deleteHabit };
