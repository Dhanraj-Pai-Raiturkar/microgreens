import { Request, Response } from 'express';
import { CognitoService } from '../services/cognitoService';
import validateRequest from '../lib/validateRequest';
import UserRepository from '../repository/UserRepository';

export class CognitoController {
  cognitoService: CognitoService;
  userRepository: UserRepository;
  constructor() {
    this.cognitoService = new CognitoService();
    this.userRepository = new UserRepository();
  }
  signUp = async (req: Request, res: Response) => {
    try {
      const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'password',
        'gender'
      ];
      const data = req.body;
      const { firstName, lastName, gender, email, password } = data;
      const name = firstName + lastName;
      if (validateRequest(req, res, 'body', requiredFields)) {
        const response = await this.cognitoService.signUp({
          name,
          email,
          password,
          gender
        });
        data.sub = response?.userSub;
        data.verified = false;
        data.role = 'shopper';
        await this.userRepository.create(data);
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
        const [cognitoResponse, mongoResponse]: [any, any] = await Promise.all([
          await this.cognitoService.confirmSignUp({
            email,
            confirmationCode
          }),
          this.userRepository.update(email, { verified: true })
        ]);
        console.log('mongoResponse', mongoResponse);
        const cognitoSub = mongoResponse.sub;
        await this.cognitoService.assignGroup(cognitoSub);
        if (cognitoResponse?.status) res.status(200).json(cognitoResponse);
        else res.status(400).json(cognitoResponse);
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
        const [cognitoResponse, userResponse] = await Promise.all([
          this.cognitoService.signIn({
            email,
            password
          }),
          this.userRepository.read({ email })
        ]);
        console.log('cognitoResponse', cognitoResponse);
        const response = {
          status: cognitoResponse?.status,
          message: cognitoResponse?.message,
          groups: cognitoResponse?.groups,
          idToken: cognitoResponse?.idToken,
          profile: userResponse
        };
        const responseHeaders = {
          'set-cookie': `session=${response.idToken}; HttpOnly; Path=/; Secure; SameSite=None`
        };
        if (cognitoResponse?.status)
          res.status(200).set(responseHeaders).json(response);
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
        const response = await this.cognitoService.resendConfirmationCode(
          email!
        );
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
