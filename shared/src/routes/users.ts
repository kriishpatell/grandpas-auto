import { Router } from 'express';
import { User } from '../models/User.ts';

const router = Router();

// Get all users (excluding passwordHash)
router.get('/', async (req, res) => {
  const users = await User.find({}, '-passwordHash');
  res.json(users);
});

// Get user by ID (excluding passwordHash)
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id, '-passwordHash');
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

// Create user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body); // Add password hashing in real life
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(400).json({ error });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(400).json({ error });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
});

export default router;
