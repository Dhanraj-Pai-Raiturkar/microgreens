import { Request, Response } from 'express';
import { CognitoService } from '../services/cognitoService';
import validateRequest from '../lib/validateRequest';
import CognitoServiceV2 from '../services/cognitoServiceV2';

export class CognitoController {
  cognitoService: CognitoService;
  cognitoServiceV2: CognitoServiceV2;
  constructor() {
    this.cognitoService = new CognitoService();
    this.cognitoServiceV2 = new CognitoServiceV2();
  }
  signUp = async (req: Request, res: Response) => {
    try {
      const requiredFields = ['name', 'email', 'password', 'gender'];
      const { name, email, password, gender } = req.body;
      if (validateRequest(req, res, 'body', requiredFields)) {
        const response = await this.cognitoServiceV2.signUp({
          name,
          email,
          password,
          gender
        });
        // const response = await this.cognitoService.signUp({
        //   name,
        //   email,
        //   password,
        //   gender
        // });
        if (response?.status) res.status(201).json(response);
        else res.status(400).json(response);
      }
    } catch (error) {
      console.error('/sign-up error', error);
      res.status(400).json({ error });
    }
  };

  confirmSignUp = async (req: Request, res: Response) => {
    try {
      const requiredFields = ['email', 'confirmationCode'];
      const { email, confirmationCode } = req.body;
      if (validateRequest(req, res, 'body', requiredFields)) {
        const response = await this.cognitoServiceV2.confirmSignUp({
          email,
          confirmationCode
        });
        // const response = await this.cognitoService.confirmSignUp({
        //   email,
        //   confirmationCode
        // });
        if (response?.status) res.status(200).json(response);
        else res.status(400).json(response);
      }
    } catch (error) {
      console.log('/confirm error', error);
      res.status(400).json({ error });
    }
  };

  signIn = async (req: Request, res: Response) => {
    try {
      const requiredFeilds = ['email', 'password'];
      const { email, password } = req.body;
      if (validateRequest(req, res, 'body', requiredFeilds)) {
        let response = await this.cognitoServiceV2.signIn({
          email,
          password
        });
        const cognitoUserData =
          await this.cognitoServiceV2.getCognitoUser(email);
        response = { ...response, ...cognitoUserData };
        // const response = await this.cognitoService.signIn({
        //   email,
        //   password
        // });
        if (response?.status) res.status(200).json(response);
        else res.status(400).json(response);
      }
    } catch (error) {
      console.log('/sign-in error', error);
      res.status(400).json({ error });
    }
  };

  resendConfirmationCode = async (req: Request, res: Response) => {
    try {
      const requiredFeilds = ['email'];
      const email = req?.query?.email?.toString();
      if (validateRequest(req, res, 'query', requiredFeilds)) {
        const response = await this.cognitoServiceV2.resendConfirmationCode(
          email!
        );
        // const response = await this.cognitoService.resendConfirmationCode(
        //   email!
        // );
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
      const requiredFeilds = ['email'];
      const email: string = req?.body?.email?.toString();
      if (validateRequest(req, res, 'body', requiredFeilds)) {
        const response = await this.cognitoService.forgotPassword(email!);
        res.status(200).json(response);
      }
    } catch (error) {
      console.log('CognitoController forgotPassword error', error);
    }
  };

  confirmPassword = async (req: Request, res: Response) => {
    try {
      const requiredFields = ['email', 'newPassword', 'verificationCode'];
      const { email, newPassword, verificationCode } = req?.body;
      if (validateRequest(req, res, 'body', requiredFields)) {
        const response = await this.cognitoService.confirmPassword({
          email,
          newPassword,
          verificationCode
        });
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(400).json(error);
      console.log('CognitoController changePassword error', error);
    }
  };

  changePassword = async (req: Request, res: Response) => {
    try {
      const requiredFields = ['email', 'oldPassword', 'newPassword'];
      const { email, oldPassword, newPassword } = req?.body;
      if (validateRequest(req, res, 'body', requiredFields)) {
        const response = await this.cognitoService.changePassword({
          email,
          oldPassword,
          newPassword
        });
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(400).json(error);
      console.log('CognitoController changePassword error', error);
    }
  };
}
