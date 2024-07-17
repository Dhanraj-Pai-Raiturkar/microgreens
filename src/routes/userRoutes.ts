import express from 'express';
import { authenticateJwt } from '../middlewares/authenticateMiddleware';
import type { Request, Response } from 'express';
import UserController from '../controllers/userController';
import { authorizeJwt } from '../middlewares/authorizeMiddleware';
import config from '../config/index';

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.get(
  '/',
  authenticateJwt,
  authorizeJwt(config.adminGroup),
  async (req, res) => {
    await userController.read(req, res);
  }
);

userRoutes.put(
  '/',
  authenticateJwt,
  authorizeJwt(config.adminGroup),
  async (req, res) => {
    await userController.update(req, res);
  }
);

userRoutes.delete(
  '/',
  authenticateJwt,
  authorizeJwt(config.adminGroup),
  async (req, res) => {
    await userController.delete(req, res);
  }
);

export default userRoutes;
