import { Router } from 'express';
import { User } from '../models/User.ts';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Signup (owner can add users)
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, role, passwordHash });
    res.status(201).json({ id: user._id, email: user.email, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : error });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid email or password" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: "Invalid email or password" });

  // Create token with user id and role
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "12h" });
  res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
});

export default router;
