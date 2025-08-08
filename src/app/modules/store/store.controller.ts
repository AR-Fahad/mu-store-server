import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import { StoreService } from './store.service';
import { sendResponse } from '../../utils/sendResponse';

const createStore = catchAsync(async (req, res) => {
  const result = await StoreService.createStore(
    req.user as JwtPayload,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Store created successfully',
    data: result,
  });
});

const updateStore = catchAsync(async (req, res) => {
  const result = await StoreService.updateStore(
    req.user as JwtPayload,
    req.params.storeId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Store updated successfully',
    data: result,
  });
});

const getAllStores = catchAsync(async (req, res) => {
  const result = await StoreService.getAllStores();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Stores retrieved successfully',
    data: result,
  });
});

const getStoreById = catchAsync(async (req, res) => {
  const result = await StoreService.getStoreById(req.params.storeId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Store retrieved successfully',
    data: result,
  });
});

const getStoreByUserId = catchAsync(async (req, res) => {
  const result = await StoreService.getStoreByUserId(req.user as JwtPayload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Your store retrieved successfully',
    data: result,
  });
});

export const StoreController = {
  createStore,
  updateStore,
  getAllStores,
  getStoreById,
  getStoreByUserId,
};
