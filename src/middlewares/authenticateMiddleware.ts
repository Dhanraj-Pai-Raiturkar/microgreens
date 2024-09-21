import { NextFunction, Request, Response } from 'express';
import { verify } from '../lib/verifyJwt';
const authenticateJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req?.headers?.cookie?.split('=')?.[1];
    if (token) {
      const response = await verify(token);
      console.log('resposne: ', response);
      next();
    } else res.status(401).json({ status: false, message: 'unauthorized' });
  } catch (error) {
    console.log('error', error);
    res.status(401).json({ status: false, message: 'unauthorized' });
  }
};

export { authenticateJwt };
