import app from './app';
import { connectDB } from './config/db';
import { seedDatabase } from './services/seedService';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await seedDatabase();

  app.listen(PORT, () => {
    logger.info(`[Server] Portfolio backend running on port ${PORT}`);
    logger.info(`[Server] Health check available at http://localhost:${PORT}/api/health`);
  });
};

startServer();
