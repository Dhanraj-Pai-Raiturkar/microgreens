import { constructQuery } from '../lib/repositoryLib';
import ProductModel, { ProductModelType } from '../models/ProductModel';
import { v4 as uuid } from 'uuid';

class ProductRepository {
  constructor() {}

  async create(data: ProductModelType) {
    try {
      data.id = uuid();
      const product = new ProductModel(data);
      const response = await product.save();
      console.log('ProductRepository create response', response);
      return response;
    } catch (error) {
      console.error('ProductRepository create error', error);
      throw error;
    }
  }

  async read(query: any) {
    try {
      const response = await ProductModel.find(query);
      console.log('ProductRepository read response size', response?.length);
      return response;
    } catch (error) {
      console.error('ProductRepository read error', error);
      throw error;
    }
  }

  async update(id: string, data: ProductModelType) {
    try {
      const response = await ProductModel.findOneAndUpdate({ id }, data);
      console.log('ProductRepository update response', response);
      return response;
    } catch (error) {
      console.error('ProductRepository update error', error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      if (!id) throw new Error('missing required parameter id');
      const response = await ProductModel.deleteOne({ id });
      console.log('ProductRepository delete response', response);
      return response;
    } catch (error) {
      console.error('ProductRepository delete error', error);
      throw error;
    }
  }
}

export default ProductRepository;
