import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { CartService } from './cart.service';

const addToCart = catchAsync(async (req, res) => {
  const result = await CartService.addToCart(req.user as JwtPayload, req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Product added to cart successfully',
    data: result,
  });
});

export const CartController = {
  addToCart,
};
