import { Router } from 'express';
import { loginAdmin, getMe } from '../controllers/authController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', loginAdmin);
router.get('/me', protectAdmin, getMe);

export default router;
