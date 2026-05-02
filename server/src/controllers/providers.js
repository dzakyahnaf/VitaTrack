const prisma = require('../prisma');

const getProviders = async (req, res) => {
  try {
    const { specialty } = req.query;
    
    const whereClause = specialty ? { specialty: { contains: specialty, mode: 'insensitive' } } : {};
    
    const providers = await prisma.provider.findMany({
      where: whereClause
    });
    
    res.json(providers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
};

const createProvider = async (req, res) => {
  try {
    const { name, specialty, location, rating } = req.body;
    const provider = await prisma.provider.create({
      data: { name, specialty, location, rating: parseFloat(rating) }
    });
    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create provider' });
  }
};

const updateProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialty, location, rating } = req.body;
    const provider = await prisma.provider.update({
      where: { id },
      data: { name, specialty, location, rating: parseFloat(rating) }
    });
    res.json(provider);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update provider' });
  }
};

const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;
    // Note: Deleting a provider might fail if there are bookings tied to it unless cascading deletes are configured
    await prisma.provider.delete({
      where: { id }
    });
    res.json({ message: 'Provider deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete provider' });
  }
};

module.exports = { getProviders, createProvider, updateProvider, deleteProvider };
