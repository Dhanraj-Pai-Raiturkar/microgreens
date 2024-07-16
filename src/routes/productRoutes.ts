import express from 'express';
import { authenticateJwt } from '../middlewares/authenticateMiddleware';
import type { Request, Response } from 'express';
import ProductController from '../controllers/productController';
import { authorizeJwt } from '../middlewares/authorizeMiddleware';
import config from '../config/index';

const productRoutes = express.Router();
const productController = new ProductController();

productRoutes.post(
  '/',
  authenticateJwt,
  authorizeJwt(config.adminGroup),
  async (req, res) => {
    await productController.create(req, res);
  }
);

productRoutes.get('/', authenticateJwt, async (req, res) => {
  await productController.read(req, res);
});

productRoutes.put(
  '/',
  authenticateJwt,
  authorizeJwt(config.adminGroup),
  async (req, res) => {
    await productController.update(req, res);
  }
);

productRoutes.delete(
  '/',
  authenticateJwt,
  authorizeJwt(config.adminGroup),
  async (req, res) => {
    await productController.delete(req, res);
  }
);

export default productRoutes;
