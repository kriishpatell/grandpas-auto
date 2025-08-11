import { Router } from 'express';
import vehiclesRouter from './vehicles.ts';
import usersRouter from './users.ts';
import inspectionsRouter from './inspections.ts';
import photosRouter from './photos.ts';
import salesRouter from './sales.ts';

const router = Router();

router.use('/vehicles', vehiclesRouter);
router.use('/users', usersRouter);
router.use('/inspections', inspectionsRouter);
router.use('/photos', photosRouter);
router.use('/sales', salesRouter);

export default router;
