import { Router } from 'express';
import { sampleController } from '@/controllers/testController';

const router = Router();
router.get('/', sampleController);

export default router;
