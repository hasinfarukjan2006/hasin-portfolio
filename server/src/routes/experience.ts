import { Router } from 'express';
import { getExperience, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getExperience);
router.post('/', protectAdmin, createExperience);
router.put('/:id', protectAdmin, updateExperience);
router.delete('/:id', protectAdmin, deleteExperience);

export default router;
