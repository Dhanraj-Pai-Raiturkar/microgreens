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

authRoutes.post('/confirm', async (req: Request, res: Response) => {
  try {
    const { email, confirmationCode } = req.body;
    const response = await cognitoService.confirmSignUp({
      email,
      confirmationCode
    });
    if (response.status) res.status(200).json(response);
    else res.status(500).json(response);
  } catch (error) {
    console.log('/confirm error', error);
    res.status(500).json({ error });
  }
});

authRoutes.post('/sign-in', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await cognitoService.signIn({
      email,
      password
    });
    if (response.status) res.status(200).json(response);
    else res.status(200).json(response);
  } catch (error) {
    console.log('/sign-in error', error);
    res.status(500).json({ error });
  }
});

export default authRoutes;
