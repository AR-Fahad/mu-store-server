import { JwtPayload } from 'jsonwebtoken';
import Cart from './cart.model';
import Product from '../product/product.model';
import { Types } from 'mongoose';
import { AppError } from '../../errors/AppError';

const addToCart = async (user: JwtPayload, cartInfo: { productId: string }) => {
  const product = await Product.findOne({
    _id: cartInfo.productId,
    isAvailable: true,
  }).lean();

  if (!product) {
    throw new AppError(404, 'Product', 'Product is not available.');
  }

  const cart = await Cart.findOne({ ownerId: user.userId }).lean();

  if (cart && cart.storeId.toString() !== product.storeId.toString()) {
    throw new AppError(
      400,
      'cart',
      'You can add products from only one store at a time.',
    );
  }

  if (!cart) {
    return await Cart.create({
      ownerId: user.userId,
      storeId: product.storeId,
      products: [{ productId: product._id, quantity: 1 }],
      totalAmount: Number(product.price.toFixed(2)),
    });
  }

  const existingProduct = cart.products.find(
    (p) => p.productId.toString() === cartInfo.productId,
  );

  if (existingProduct) {
    return await Cart.findOneAndUpdate(
      {
        _id: cart._id,
        'products.productId': new Types.ObjectId(cartInfo.productId),
      },
      {
        $inc: {
          'products.$.quantity': 1,
          totalAmount: Number(product.price.toFixed(2)),
        },
      },
      { new: true },
    );
  }

  return await Cart.findOneAndUpdate(
    { _id: cart._id },
    {
      $push: { products: { productId: product._id, quantity: 1 } },
      $inc: { totalAmount: Number(product.price.toFixed(2)) },
    },
    { new: true },
  );
};

export const CartService = {
  addToCart,
};
