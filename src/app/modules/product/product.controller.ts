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

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProducts(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products retrieved successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getSingleProduct(req.params.productId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductService.deleteProduct(
    req.user as JwtPayload,
    req.params.productId,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const ProductController = {
  addProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getSingleProduct,
};
