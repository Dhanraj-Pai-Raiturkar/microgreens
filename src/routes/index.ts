import express from 'express';
import authRoutes from './authRoutes';
import productRoutes from './productRoutes';
import ProductRepository from '../repository/ProductRepository';
import ProductModel from '../models/ProductModel';
import {
  constructFilter,
  constructQuery,
  constructSearch
} from '../lib/repositoryLib';

const router = express.Router();

router.get('/test', async (req, res) => {
  try {
    // const filterString = req?.query?.filter;
    // const searchString = req?.query?.search;
    // const filter = constructFilter(filterString);
    // const search = constructSearch(searchString, ['title', 'description']);
    // const query = { ...filter, ...search };
    const query = constructQuery(req, ['title', 'description']);
    // const query = {
    //   $or: [{ title: /^kit/i }, { description: /^kit/i }]
    // };
    const response = await ProductModel.find(query);
    res.send({ count: response?.length, response });
  } catch (error: any) {
    console.error('test error', error);
    res.status(401).send({ error: error?.message });
  }
});
router.use('/auth', authRoutes);
router.use('/product', productRoutes);

export default router;
