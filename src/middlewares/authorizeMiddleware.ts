import { NextFunction, Request, Response } from 'express';
import { verify } from '../lib/verifyJwt';

const authorizeJwt = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.headers?.authorization?.split(' ')[1];
      if (token) {
        const response: any = await verify(token);
        console.log('response', response);
        if (role.includes(response?.['cognito:groups']?.[0])) next();
        else res.status(401).json({ status: false, message: 'unauthorized' });
      } else res.status(401).json({ status: false, message: 'unauthorized' });
    } catch (error) {
      console.log('error', error);
      res.status(401).json({ status: false, message: 'unauthorized' });
    }
  };
};

export { authorizeJwt };
