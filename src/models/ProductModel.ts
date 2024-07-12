import mongoose from 'mongoose';
import { v4 as uuid, validate } from 'uuid';

export const ProductModelSchema = new mongoose.Schema({
  id: {
    type: String,
    index: true,
    unique: true,
    required: true,
    default: uuid()
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
  discount: Number
});

export default mongoose.model('Product', ProductModelSchema);
