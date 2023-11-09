import express from 'express';
import type { Request, Response } from 'express';
import { CognitoController } from '../controllers/cognitoController';

const authRoutes = express.Router();
const cognitoController = new CognitoController();

authRoutes.post('/sign-up', async (req: Request, res: Response) => {
  await cognitoController.signUp(req, res);
});

authRoutes.post('/confirm-sign-up', async (req: Request, res: Response) => {
  await cognitoController.confirmSignUp(req, res);
});

authRoutes.post('/sign-in', async (req: Request, res: Response) => {
  await cognitoController.signIn(req, res);
});

export default authRoutes;
