import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { date, timeSlot, email, mentorId, name, duration } = req.body;

    // Validate inputs
    if (!date || !timeSlot || !email || !mentorId || !name || !duration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate date and timeSlot format
    if (!isValidDate(date) || !isValidTimeSlot(timeSlot)) {
      console.log(`Invalid date or time slot format: ${date} ${timeSlot}`);
      return res.status(400).json({ error: 'Invalid date or time slot format' });
    }

    const startTime = new Date(`${date}T${timeSlot}`);
    const endTime = new Date(startTime.getTime() + duration * 60000);

    const newSchedule = await prisma.schedule.create({
      data: {
        startTime,
        endTime,
        studentName: name,
        studentEmail: email,
        mentorId,
        duration,
      },
    });

    res.status(201).json(newSchedule);
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ error: 'Failed to create schedule' });
  }
});

// Helper functions for validation
function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString) && !isNaN(Date.parse(dateString));
}

function isValidTimeSlot(timeSlot: string): boolean {
  const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  return regex.test(timeSlot);
}

// Get all schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await prisma.schedule.findMany({
      include: { mentor: true },
    });
    res.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get schedule by ID
router.get('/:scheduleId', async (req, res) => {
  const { scheduleId } = req.params;
  try {
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
      include: { mentor: true },
    });
    if (schedule) {
      res.json(schedule);
    } else {
      res.status(404).json({ error: 'Schedule not found' });
    }
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update schedule
router.put('/:scheduleId', async (req, res) => {
  const { scheduleId } = req.params;
  const { date, timeSlot, email, mentorId, name, duration } = req.body;
  try {
    const startTime = new Date(`${date}T${timeSlot}`);
    const endTime = new Date(startTime.getTime() + duration * 60000);

    const updatedSchedule = await prisma.schedule.update({
      where: { id: scheduleId },
      data: {
        startTime,
        endTime,
        studentName: name,
        studentEmail: email,
        mentorId,
        duration,
      },
    });
    res.json(updatedSchedule);
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a schedule by ID
router.delete('/schedule/:scheduleId', async (req, res) => {
  const { scheduleId } = req.params;
  try {
    await prisma.schedule.delete({
      where: { id: scheduleId },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;