import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { CartService } from './cart.service';

const addToCart = catchAsync(async (req, res) => {
  const result = await CartService.addToCart(
    req.user as JwtPayload,
    req.body.productId,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Product added to cart successfully',
    data: result,
  });
});

const removeFromCart = catchAsync(async (req, res) => {
  const result = await CartService.removeFromCart(
    req.user as JwtPayload,
    req.body.productId,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product removed from cart successfully',
    data: result,
  });
});

const getMyCart = catchAsync(async (req, res) => {
  const result = await CartService.getMyCart(req.user as JwtPayload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart retrieved successfully',
    data: result,
  });
});

export const CartController = {
  addToCart,
  removeFromCart,
  getMyCart,
};
