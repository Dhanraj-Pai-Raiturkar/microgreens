import { Request, Response } from 'express';
import ProductRepository from '../repository/ProductRepository';
import { constructQuery } from '../lib/repositoryLib';

class ProductController {
  productRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async create(req: Request, res: Response) {
    try {
      const body = req.body;
      const response = await this.productRepository.create(body);
      res
        .status(200)
        .send({ status: true, message: 'success', data: response });
    } catch (error: any) {
      console.error('ProductController add error', error);
      res.status(400).send({ error: error?.message });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const query = constructQuery(req, ['title', 'description']);
      const response = await this.productRepository.read(query);
      res.status(200).send({
        status: true,
        message: 'success',
        count: response?.length,
        data: response
      });
    } catch (error: any) {
      console.error('ProductController get error', error);
      res.status(400).send({ error: error?.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const body = req.body;
      const id = req?.query?.id?.toString() ?? body?.id;
      const response = await this.productRepository.update(id, body);
      res.status(200).send({
        status: true,
        message: 'success',
        data: response
      });
    } catch (error: any) {
      console.error('ProductController get error', error);
      res.status(400).send({ error: error?.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const body = req.body;
      const id = req?.query?.id?.toString() ?? body?.id;
      const response = await this.productRepository.delete(id);
      res.status(200).send({
        status: true,
        message: 'success',
        data: response
      });
    } catch (error: any) {
      console.error('ProductController get error', error);
      res.status(400).send({ error: error?.message });
    }
  }
}

export default ProductController;
