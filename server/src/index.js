const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'VitaTrack API is running' });
});

const authRoutes = require('./routes/auth');
const activitiesRoutes = require('./routes/activities');
const habitsRoutes = require('./routes/habits');
const providersRoutes = require('./routes/providers');
const bookingsRoutes = require('./routes/bookings');

app.use('/api/auth', authRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/habits', habitsRoutes);
app.use('/api/providers', providersRoutes);
app.use('/api/bookings', bookingsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
