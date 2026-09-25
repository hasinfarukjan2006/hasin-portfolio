import { Router } from 'express';
import { submitContactForm, getContactMessages } from '../controllers/contactController';
import { contactRateLimiter } from '../middleware/rateLimiter';
import { protectAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/', contactRateLimiter, submitContactForm);
router.get('/', protectAdmin, getContactMessages);

export default router;
