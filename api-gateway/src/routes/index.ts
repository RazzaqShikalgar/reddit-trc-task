import { Router } from 'express';
import { authRoutes } from '../app';

const router = Router();

router.use('/auth', authRoutes);

export default router;