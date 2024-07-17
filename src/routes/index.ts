import express from 'express';
import authRoutes from './authRoutes';
import productRoutes from './productRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/user', userRoutes);

export default router;
