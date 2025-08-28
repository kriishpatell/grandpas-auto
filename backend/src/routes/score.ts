import { Router } from 'express';
import { Score } from '../models/Score.ts';

const router = Router();

router.get('/', async (req, res) => {
  const scores = await Score.find();
  res.json(scores);
});

router.get('/:id', async (req, res) => {
  const score = await Score.findById(req.params.id);
  if (!score) return res.status(404).json({ error: 'Not found' });
  res.json(score);
});

router.post('/', async (req, res) => {
  try {
    const score = await Score.create(req.body);
    res.status(201).json(score);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(400).json({ error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const score = await Score.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!score) return res.status(404).json({ error: 'Not found' });
    res.json(score);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(400).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  await Score.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
});

export default router;
