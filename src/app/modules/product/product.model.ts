import { model, Schema } from 'mongoose';
import TProduct from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      trim: true,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Product = model<TProduct>('Product', productSchema);

export default Product;
