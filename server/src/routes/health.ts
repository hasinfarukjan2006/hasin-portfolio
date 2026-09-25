import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'HASIN F Portfolio Backend API',
    environment: process.env.NODE_ENV || 'development',
    database: dbStatusMap[dbState] || 'unknown',
  });
});

export default router;
