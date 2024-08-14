import { PrismaClient } from '@prisma/client';
import e, { Router } from 'express';

const prisma = new PrismaClient();

const router = Router();

// / Get all students
router.get('/', async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new student
router.post('/', async (req, res) => {
  const { name, areaOfInterest } = req.body;
  try {
    const student = await prisma.student.create({
      data: {
        name,
        areaOfInterest,
      },
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get student by ID
router.get('/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update student details
router.put('/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const { name, areaOfInterest } = req.body;
  try {
    const student = await prisma.student.update({
      where: { id: studentId },
      data: {
        name,
        areaOfInterest,
      },
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a student by ID
router.delete('/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    await prisma.student.delete({
      where: { id: studentId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
