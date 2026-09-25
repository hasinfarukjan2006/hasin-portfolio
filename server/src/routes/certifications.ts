import { Router } from 'express';
import { getCertifications, createCertification, updateCertification, deleteCertification } from '../controllers/certificationController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getCertifications);
router.post('/', protectAdmin, createCertification);
router.put('/:id', protectAdmin, updateCertification);
router.delete('/:id', protectAdmin, deleteCertification);

export default router;
