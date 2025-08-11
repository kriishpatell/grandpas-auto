import { Router } from 'express';
import { Vehicle } from '../models/Vehicle.js';

// Create router
const router = Router();

// Example: GET /api/vehicles
router.get('/', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

// Example: POST /api/vehicles
router.post('/', async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: String(error) });
    }
  }
});

export default router;
