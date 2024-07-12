import ProductModel, { ProductModelSchema } from '../models/ProductModel';

class ProductRepository {
  constructor() {}

  async create(data: typeof ProductModelSchema) {
    try {
      const product = new ProductModel(data);
      const response = await product.save();
      console.log('ProductRepository create response', response);
      return response;
    } catch (error) {
      console.error('ProductRepository create error', error);
      throw error;
    }
  }

  async read(id: string | undefined) {
    try {
      let filter = id ? { id } : {};
      console.log('ProductRepository read filter', filter);
      const response = await ProductModel.find(filter);
      console.log('ProductRepository read response size', response?.length);
      return response;
    } catch (error) {
      console.error('ProductRepository read error', error);
      throw error;
    }
  }

  async update(id: string, data: typeof ProductModelSchema) {
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
