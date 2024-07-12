import express from 'express';
import { authenticateJwt } from '../middlewares/authenticateMiddleware';
import type { Request, Response } from 'express';
import ProductController from '../controllers/productController';

const productRoutes = express.Router();
const productController = new ProductController();

productRoutes.post('/', authenticateJwt, async (req, res) => {
  await productController.create(req, res);
});

productRoutes.get('/', authenticateJwt, async (req, res) => {
  await productController.read(req, res);
});

productRoutes.put('/', authenticateJwt, async (req, res) => {
  await productController.update(req, res);
});

productRoutes.delete('/', authenticateJwt, async (req, res) => {
  await productController.delete(req, res);
});

export default productRoutes;
