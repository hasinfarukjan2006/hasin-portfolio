import { Router } from 'express';
import { getProjects, getProjectByIdOrSlug, createProject, updateProject, deleteProject } from '../controllers/projectController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProjectByIdOrSlug);
router.post('/', protectAdmin, createProject);
router.put('/:id', protectAdmin, updateProject);
router.delete('/:id', protectAdmin, deleteProject);

export default router;
