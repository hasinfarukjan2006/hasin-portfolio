import { Router } from 'express';
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from '../controllers/achievementController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getAchievements);
router.post('/', protectAdmin, createAchievement);
router.put('/:id', protectAdmin, updateAchievement);
router.delete('/:id', protectAdmin, deleteAchievement);

export default router;
