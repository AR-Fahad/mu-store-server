import { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import Store from '../store/store.model.';
import TProduct from './product.interface';
import Product from './product.model';

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

export const ProductService = {
  addProduct,
  updateProduct,
};
