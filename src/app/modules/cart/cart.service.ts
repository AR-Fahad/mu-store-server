import { JwtPayload } from 'jsonwebtoken';
import Cart from './cart.model';
import Product from '../product/product.model';
import { Types } from 'mongoose';
import { AppError } from '../../errors/AppError';
import TProduct from '../product/product.interface';

const addToCart = async (user: JwtPayload, productId: string) => {
  const product = await Product.findOne({
    _id: productId,
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
    (p) => p.productId.toString() === productId,
  );

  if (existingProduct) {
    return await Cart.findOneAndUpdate(
      {
        _id: cart._id,
        'products.productId': new Types.ObjectId(productId),
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

export const removeFromCart = async (user: JwtPayload, productId: string) => {
  const cart = await Cart.findOne({ ownerId: user.userId });
  if (!cart) {
    throw new AppError(404, 'Cart', 'Cart not found.');
  }

  // Find the product in cart
  const productIndex = cart.products.findIndex(
    (item) => item.productId.toString() === productId.toString(),
  );

  if (productIndex === -1) {
    throw new AppError(404, 'Product', 'Product not found in cart.');
  }

  const product = cart.products[productIndex];
  const cartWithProductDetails = await cart.populate('products.productId');
  const productPrice = (
    cartWithProductDetails.products[productIndex].productId as TProduct
  ).price;

  // Case 1: Delete whole cart
  if (cart.products.length === 1 && product.quantity === 1) {
    return await Cart.deleteOne({ _id: cart._id });
  }

  // Case 2: Decrease quantity
  if (product.quantity > 1) {
    product.quantity -= 1;
    cart.totalAmount = parseFloat((cart.totalAmount - productPrice).toFixed(2));
    await cart.save();
    return cart;
  }

  // Case 3: Remove product completely
  cart.products.splice(productIndex, 1);
  cart.totalAmount = parseFloat((cart.totalAmount - productPrice).toFixed(2));
  await cart.save();
  return cart;
};

const getMyCart = async (user: JwtPayload) => {
  const result = await Cart.findOne({ ownerId: user.userId }).populate(
    'storeId products.productId',
  );
  if (!result) {
    throw new AppError(404, 'Cart', 'Cart not found.');
  }
  return result;
};

export const CartService = {
  addToCart,
  removeFromCart,
  getMyCart,
};
