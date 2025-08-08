import { ObjectId } from 'mongoose';
import { TUser } from '../auth/user.interface';

type TStore = {
  _id?: string;
  ownerId: ObjectId | TUser;
  name: string;
  description: string;
  image?: string;
  isActive: boolean;
};

export default TStore;
