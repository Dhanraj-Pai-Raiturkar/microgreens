import express from 'express';
import type { Request, Response } from 'express';

const authRoutes = express.Router();

authRoutes.post('/sign-up', (req: Request, res: Response) => {
  res.status(200).json(req.path);
});

authRoutes.post('/sign-in', (req: Request, res: Response) => {
  res.status(200).json(req?.path);
});

export default authRoutes;
