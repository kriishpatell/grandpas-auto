import { Router } from 'express';
import { Inventory } from '../models/Inventory.ts';

const router = Router();

router.get('/', async (req, res) => {
  const items = await Inventory.find();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Inventory.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

router.post('/', async (req, res) => {
  try {
    const item = await Inventory.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(400).json({ error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(400).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  await Inventory.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
});

export default router;
