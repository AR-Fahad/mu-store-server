import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import { ProductService } from './product.service';
import { sendResponse } from '../../utils/sendResponse';

const addProduct = catchAsync(async (req, res) => {
  const result = await ProductService.addProduct(
    req.user as JwtPayload,
    req.body,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Product added successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductService.updateProduct(
    req.user as JwtPayload,
    req.params.productId,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

export const ProductController = {
  addProduct,
  updateProduct,
};
