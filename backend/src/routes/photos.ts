import { Router } from 'express';
import { Photo } from '../models/Photo.ts';

const router = Router();

// Get all photos
router.get('/', async (req, res) => {
  const photos = await Photo.find();
  res.json(photos);
});

// Get photo by ID
router.get('/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  if (!photo) return res.status(404).json({ error: 'Not found' });
  res.json(photo);
});

// Create photo
router.post('/', async (req, res) => {
  try {
    const photo = await Photo.create(req.body);
    res.status(201).json(photo);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(400).json({ error });
  }
});

// Update photo
router.put('/:id', async (req, res) => {
  try {
    const photo = await Photo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!photo) return res.status(404).json({ error: 'Not found' });
    res.json(photo);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(400).json({ error });
  }
});

// Delete photo
router.delete('/:id', async (req, res) => {
  await Photo.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
});

export default router;
