import { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import Store from '../store/store.model.';
import TProduct from './product.interface';
import Product from './product.model';
import { QueryOptions } from 'mongoose';
import { QueryBuilder } from '../../builders/QueryBuilders';

const addProduct = async (user: JwtPayload, product: Partial<TProduct>) => {
  const isStoreExist = await Store.findOne({
    _id: product?.storeId,
    isActive: true,
  });

  if (!isStoreExist) {
    throw new AppError(404, 'Store', 'Store not found or inactive.');
  }

  if (isStoreExist.ownerId !== user.userId) {
    throw new AppError(
      403,
      'User',
      'You are not authorized to add products to this store.',
    );
  }

  const result = await Product.create(product);

  return result;
};

const updateProduct = async (
  user: JwtPayload,
  productId: string,
  product: Partial<TProduct>,
) => {
  const isProductExist = await Product.findById(productId);

  if (!isProductExist) {
    throw new AppError(404, 'Product', 'Product not found.');
  }

  const store = await Store.findOne({ ownerId: user.userId });

  if (!store || store._id.toString() !== isProductExist.storeId.toString()) {
    throw new AppError(
      403,
      'User',
      'You are not authorized to update this product.',
    );
  }

  const { storeId, ...updateData } = product;

  const result = await Product.findByIdAndUpdate(productId, updateData, {
    new: true,
  });

  return result;
};

const getAllProducts = async (query: QueryOptions) => {
  const product = new QueryBuilder(Product.find(), query)
    .search(['name', 'description'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const result = await product.modelQuery.populate({
    path: 'storeId',
    populate: {
      path: 'ownerId',
      model: 'User',
      select: 'name email phone',
    },
  });

  return result;
};

const getSingleProduct = async (productId: string) => {
  const result = await Product.findById(productId).populate({
    path: 'storeId',
    populate: {
      path: 'ownerId',
      model: 'User',
      select: 'name email phone',
    },
  });
  if (!result) {
    throw new AppError(404, 'Product', 'Product not found.');
  }
  return result;
};

const deleteProduct = async (user: JwtPayload, productId: string) => {
  const isProductExist = await Product.findById(productId);
  if (!isProductExist) {
    throw new AppError(404, 'Product', 'Product not found.');
  }
  const store = await Store.findOne({ ownerId: user.userId });
  if (!store || store._id.toString() !== isProductExist.storeId.toString()) {
    throw new AppError(
      403,
      'User',
      'You are not authorized to delete this product.',
    );
  }

  const result = await Product.findByIdAndDelete(productId);
  return result;
};

export const ProductService = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
};
