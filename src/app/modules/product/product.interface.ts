import { ObjectId } from 'mongoose';
import TStore from '../store/store.interface';

type TProduct = {
  _id?: string;
  storeId: ObjectId | TStore;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
};

export default TProduct;
