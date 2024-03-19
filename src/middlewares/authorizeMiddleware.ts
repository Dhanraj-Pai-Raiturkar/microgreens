import { NextFunction, Request, Response } from 'express';
import { verify } from '../lib/verifyJwt';

const authorizeJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (token) {
      const response: any = await verify(token);
      console.log("=========>", response)
      if (response?.email === req?.body?.email) next();
      else res.status(401).json({ status: false, message: 'unauthorized' });
    } else res.status(401).json({ status: false, message: 'unauthorized' });
  } catch (error) {
    console.log('error', error);
    res.status(401).json({ status: false, message: 'unauthorized' });
  }
};

export { authorizeJwt };
