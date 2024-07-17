import { Request, Response } from 'express';
import UserRepository from '../repository/UserRepository';
import { CognitoService } from '../services/cognitoService';
import { constructQuery } from '../lib/repositoryLib';

class UserController {
  userRepository;
  cognitoService;
  constructor() {
    this.userRepository = new UserRepository();
    this.cognitoService = new CognitoService();
  }

  async read(req: Request, res: Response) {
    try {
      const query = constructQuery(req, ['firstName', 'lastName', 'email']);
      const response = await this.userRepository.read(query);
      res.status(200).send({
        status: true,
        message: 'success',
        count: response?.length,
        data: response
      });
    } catch (error: any) {
      console.error(
        'UserController read error',
        error,
        JSON.stringify(error),
        error?.message
      );
      res.status(400).send({ error: error?.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const email = req?.query?.email?.toString();
      const body = req?.body;
      if (!email || !body) throw new Error('missing required parameters');
      const response = await this.userRepository.update(email, body);
      res.status(200).send({
        status: true,
        message: 'success',
        data: response
      });
    } catch (error: any) {
      console.error(
        'UserController update error',
        error,
        JSON.stringify(error),
        error?.message
      );
      res.status(400).send({ error: error?.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const sub = req?.query?.sub?.toString();
      if (!sub) throw new Error('missing required parameter sub');
      const deleteMongoDbUser = this.userRepository.delete(sub);
      const deleteCognitoUser = this.cognitoService.deleteCognitoUser(sub);
      await Promise.all([deleteMongoDbUser, deleteCognitoUser]);
      res.status(200).send({ status: true, message: 'success' });
    } catch (error: any) {
      console.error(
        'UserController delete error',
        error,
        JSON.stringify(error),
        error?.message
      );
      res.status(400).send({ error: error?.message });
    }
  }
}

export default UserController;
