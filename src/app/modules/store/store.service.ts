import { JwtPayload } from 'jsonwebtoken';
import TStore from './store.interface';
import { User } from '../auth/user.model';
import { AppError } from '../../errors/AppError';
import Store from './store.model.';
import { TUser } from '../auth/user.interface';
import { ObjectId } from 'mongoose';

const createStore = async (user: JwtPayload, store: Partial<TStore>) => {
  const isUser = await User.findById(store.ownerId);

  if (!isUser) {
    throw new AppError(404, 'User', 'User not found.');
  }

  if (isUser?.email !== user.email) {
    throw new AppError(
      403,
      'User',
      'You are not authorized to create a store.',
    );
  }

  const isStoreExists = await Store.findOne({ ownerId: store.ownerId });

  if (isStoreExists) {
    throw new AppError(409, 'Store', 'You already created a store.');
  }

  const { isActive, ...storeData } = store;

  const result = await Store.create(storeData);

  return result;
};

const updateStore = async (
  user: JwtPayload,
  storeId: string,
  store: Partial<TStore>,
) => {
  const isStoreExists = await Store.findById(storeId).populate('ownerId');

  if (!isStoreExists) {
    throw new AppError(404, 'Store', 'Store not found.');
  }

  if (user?.email !== (isStoreExists?.ownerId as TUser)?.email) {
    throw new AppError(
      403,
      'User',
      'You are not authorized to update this store.',
    );
  }

  const { isActive, ownerId, ...updateData } = store;

  const result = await Store.findByIdAndUpdate(storeId, updateData, {
    new: true,
  });

  return result;
};

const getAllStores = async () => {
  const result = await Store.find({ isActive: true }).populate(
    'ownerId',
    'name email phone',
  );
  return result;
};

const getStoreById = async (storeId: string) => {
  const result = await Store.findOne({ _id: storeId, isActive: true }).populate(
    'ownerId',
    'name email phone',
  );
  if (!result) {
    throw new AppError(404, 'Store', 'Store not found.');
  }
  return result;
};

const getStoreByUserId = async (user: JwtPayload) => {
  const result = await Store.findOne({ ownerId: user.userId });
  if (!result) {
    throw new AppError(404, 'Store', 'You do not have a store yet.');
  }
  return result;
};

export const StoreService = {
  createStore,
  getAllStores,
  updateStore,
  getStoreById,
  getStoreByUserId,
};
