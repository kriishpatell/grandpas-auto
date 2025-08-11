import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import vehiclesRouter from './routes/vehicles.js'; // Import your router here

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());

// Use vehicle routes (all starting with /api/vehicles)
app.use('/api/vehicles', vehiclesRouter);

// Test backend running
app.get('/api/', (_, res) => {
  res.json({ status: 'OK', message: 'Backend running' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
