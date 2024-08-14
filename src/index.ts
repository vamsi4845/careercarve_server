import express from 'express';
import studentRoutes from './routes/studentRoutes';
import mentorRoutes from './routes/mentorRoutes';
import scheduleRoutes from './routes/scheduleRoutes';
import paymentRoutes from './routes/paymentRoutes';
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.use('/students', studentRoutes);
app.use('/mentors', mentorRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
