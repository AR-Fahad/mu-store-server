import { ObjectId } from 'mongoose';
import TProduct from '../product/product.interface';

type TCart = {
  _id: string;
  ownerId: ObjectId;
  storeId: ObjectId;
  products: {
    productId: ObjectId | TProduct;
    quantity: number;
  }[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
};

export default TCart;
