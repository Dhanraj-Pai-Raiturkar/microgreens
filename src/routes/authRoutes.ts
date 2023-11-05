import express from 'express';
import type { Request, Response } from 'express';
import { CognitoService } from '../services/cognito/cognitoService';

const authRoutes = express.Router();
const cognitoService = new CognitoService();

authRoutes.post('/sign-up', async (req: Request, res: Response) => {
  try {
    const { name, email, password, gender } = req.body;
    const response = await cognitoService.signUp({
      name,
      email,
      password,
      gender
    });
    if (response.status) res.status(201).json(response);
    else res.status(500).json(response);
  } catch (error) {
    console.error('/sign-up error', error);
    res.status(500).json({ error });
  }
});

authRoutes.post('/sign-in', (req: Request, res: Response) => {
  res.status(200).json(req?.path);
});

export default authRoutes;
