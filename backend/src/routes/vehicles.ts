import { Router } from 'express';
import { Vehicle } from '../models/Vehicle.ts';

const router = Router();

// Get all vehicles
router.get('/', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

// Get vehicle by ID
router.get('/:id', async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) return res.status(404).json({ error: 'Not found' });
  res.json(vehicle);
});

// Create vehicle
router.post('/', async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(400).json({ error });
  }
});

// Update vehicle
router.put('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) return res.status(404).json({ error: 'Not found' });
    res.json(vehicle);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(400).json({ error });
  }
});

// Delete vehicle
router.delete('/:id', async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
});

export default router;
