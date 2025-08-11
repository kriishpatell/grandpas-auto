import { Router } from 'express';
import { Inspection } from '../models/Inspection.ts';

const router = Router();

router.get('/', async (req, res) => {
  const inspections = await Inspection.find();
  res.json(inspections);
});

router.get('/:id', async (req, res) => {
  const inspection = await Inspection.findById(req.params.id);
  if (!inspection) return res.status(404).json({ error: 'Not found' });
  res.json(inspection);
});

router.post('/', async (req, res) => {
  try {
    const inspection = await Inspection.create(req.body);
    res.status(201).json(inspection);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(400).json({ error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const inspection = await Inspection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inspection) return res.status(404).json({ error: 'Not found' });
    res.json(inspection);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(400).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  await Inspection.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
});

export default router;
