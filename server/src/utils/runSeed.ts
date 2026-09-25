import dotenv from 'dotenv';
import { connectDB } from '../config/db';
import { seedDatabase } from '../services/seedService';
import { logger } from './logger';

dotenv.config();

const run = async () => {
  await connectDB();
  await seedDatabase();
  logger.info('Seed runner finished.');
  process.exit(0);
};

run().catch((err) => {
  logger.error('Seed script failed:', err);
  process.exit(1);
});
