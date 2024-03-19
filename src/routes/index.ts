import express from 'express';
import authRoutes from './authRoutes';
import productRoutes from './productRoutes';
// import { authorizeJwt } from '../middlewares/authorizeMiddleware';
import { authenticateJwt } from '../middlewares/authenticateMiddleware';

const router = express.Router();

router.use('/auth', authRoutes);
router.use("/products", authenticateJwt, productRoutes);

export default router;
