import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        student: true,
        mentor: true,
      },
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new payment
router.post('/', async (req, res) => {
  const { amount, duration, studentId, mentorId } = req.body;
  try {
    const payment = await prisma.payment.create({
      data: {
        amount,
        duration,
        student: { connect: { id: studentId } },
        mentor: { connect: { id: mentorId } },
      },
    });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get payment by ID
router.get('/:paymentId', async (req, res) => {
  const { paymentId } = req.params;
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        student: true,
        mentor: true,
      },
    });
    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a payment
router.put('/:paymentId', async (req, res) => {
  const { paymentId } = req.params;
  const { amount, duration, studentId, mentorId } = req.body;
  try {
    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        amount,
        duration,
        student: { connect: { id: studentId } },
        mentor: { connect: { id: mentorId } },
      },
    });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a payment
router.delete('/:paymentId', async (req, res) => {
  const { paymentId } = req.params;
  try {
    await prisma.payment.delete({
      where: { id: paymentId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;