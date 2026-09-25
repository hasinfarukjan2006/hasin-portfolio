import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import projectsRouter from './routes/projects';
import experienceRouter from './routes/experience';
import skillsRouter from './routes/skills';
import certificationsRouter from './routes/certifications';
import achievementsRouter from './routes/achievements';
import contactRouter from './routes/contact';
import authRouter from './routes/auth';
import healthRouter from './routes/health';
import { errorHandler } from './middleware/errorHandler';
import { apiRateLimiter } from './middleware/rateLimiter';

dotenv.config();

const app: Application = express();

app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRateLimiter);

// Routes
app.use('/api/projects', projectsRouter);
app.use('/api/experience', experienceRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/certifications', certificationsRouter);
app.use('/api/achievements', achievementsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);
app.use('/api/health', healthRouter);

app.use(errorHandler);

export default app;
