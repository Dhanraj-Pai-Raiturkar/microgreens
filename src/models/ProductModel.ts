import mongoose from 'mongoose';
import { v4 as uuid, validate } from 'uuid';

export type ProductModelType = {
  id: string;
  title: string;
  description: string;
  category: string;
  contents: Array<string>;
  images: Array<string>;
  thumbnail: string;
  price: number;
  discount: number;
  stock: number;
};

export const ProductModelSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      index: true,
      unique: true,
      required: true
    },
    title: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          if (!value) {
            return false;
          }
        },
        message: 'title cannot be empty'
      }
    },
    description: {
      type: String,
      required: true
    },
    category: String,
    contents: Array<String>,
    images: Array<String>,
    thumbnail: String,
    price: Number,
    discount: Number,
    stock: Number
  },
  { timestamps: true }
);

export default mongoose.model<ProductModelType>('Product', ProductModelSchema);
