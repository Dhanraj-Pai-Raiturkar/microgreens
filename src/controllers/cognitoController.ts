import { Request, Response } from 'express';
import { CognitoService } from '../services/cognitoService';

export class CognitoController {
  cognitoService: CognitoService;
  constructor() {
    this.cognitoService = new CognitoService();
  }
  signUp = async (req: Request, res: Response) => {
    try {
      const { name, email, password, gender } = req.body;
      const response = await this.cognitoService.signUp({
        name,
        email,
        password,
        gender
      });
      if (response?.status) res.status(201).json(response);
      else res.status(400).json(response);
    } catch (error) {
      console.error('/sign-up error', error);
      res.status(400).json({ error });
    }
  };

  confirmSignUp = async (req: Request, res: Response) => {
    try {
      const { email, confirmationCode } = req.body;
      const response = await this.cognitoService.confirmSignUp({
        email,
        confirmationCode
      });
      if (response?.status) res.status(200).json(response);
      else res.status(400).json(response);
    } catch (error) {
      console.log('/confirm error', error);
      res.status(400).json({ error });
    }
  };

  signIn = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const response = await this.cognitoService.signIn({
        email,
        password
      });
      if (response?.status) res.status(200).json(response);
      else res.status(400).json(response);
    } catch (error) {
      console.log('/sign-in error', error);
      res.status(400).json({ error });
    }
  };

  resendConfirmationCode = async (req: Request, res: Response) => {
    try {
      const email: string | undefined = req?.query?.email?.toString();
      if (!email)
        res.status(400).json({
          status: false,
          error: `missing required query param(s): ${['email'].join(',')}`
        });
      else {
        const response =
          await this.cognitoService.resendConfirmationCode(email);
        if (response?.status) res.status(200).json(response);
        else res.status(400).json(response);
      }
    } catch (error) {
      console.log('/resendConfirmationCode error', error);
      res.status(400).json({ error });
    }
  };

  forgotPassword = async (req: Request, res: Response) => {
    try {
      const email: string | undefined = req?.body?.email?.toString();
      if (!email)
        res.status(400).json({
          status: false,
          error: `missing required field(s): ${['email'].join(',')}`
        });
      else {
        const response = await this.cognitoService.forgotPassword(email);
        res.status(200).json(response);
      }
    } catch (error) {
      console.log('CognitoController forgotPassword error', error);
    }
  };

  confirmPassword = async (req: Request, res: Response) => {
    try {
      const { email, newPassword, verificationCode } = req?.body;
      if (!email || !newPassword || !verificationCode)
        res.status(400).json({
          status: false,
          error: `missing required field(s): ${[
            'email',
            'newPassword',
            'verificationCode'
          ]
            .filter((field) => !req.body[field])
            .join(', ')}`
        });
      else {
        const response = await this.cognitoService.confirmPassword({
          email,
          newPassword,
          verificationCode
        });
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(400).json(error);
      console.log('CognitoController forgotPassword error', error);
    }
  };
}
