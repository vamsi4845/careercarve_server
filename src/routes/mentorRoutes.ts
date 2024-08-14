import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Get all mentors
router.get('/', async (req, res) => {
  try {
    const mentors = await prisma.mentor.findMany();
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new mentor
router.post('/', async (req, res) => {
  const { name, yoe, areasOfExpertise, companies, availabilities } = req.body;
  try {
    const mentor = await prisma.mentor.create({
      data: {
        name,
        yoe,
        areasOfExpertise,
        companies,
        availabilities,
      },
    });
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get mentor by ID
router.get('/:mentorId', async (req, res) => {
  const { mentorId } = req.params;
  try {
    const mentor = await prisma.mentor.findUnique({
      where: { id: mentorId },
    });
    if (mentor) {
      res.json(mentor);
    } else {
      res.status(404).json({ error: 'Mentor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update mentor details
router.put('/:mentorId', async (req, res) => {
  const { mentorId } = req.params;
  const { name, yoe, areasOfExpertise, companies, availabilities } = req.body;
  try {
    const mentor = await prisma.mentor.update({
      where: { id: mentorId },
      data: {
        name,
        yoe,
        areasOfExpertise,
        companies,
        availabilities,
      },
    });
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a mentor by ID
router.delete('/:mentorId', async (req, res) => {
  const { mentorId } = req.params;
  try {
    await prisma.mentor.delete({
      where: { id: mentorId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;