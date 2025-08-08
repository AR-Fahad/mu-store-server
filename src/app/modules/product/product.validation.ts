import z from 'zod';

export const addProductValidation = z.object({
  storeId: z.string('Store ID is required'),
  name: z.string('Name is required').min(1, 'Product name is required'),
  description: z
    .string('description is required')
    .min(1, 'Product description is required'),
  price: z
    .number('Price is required')
    .positive('Price must be a positive number'),
  image: z.string('Image is required').url('Image must be a valid URL'),
  isAvailable: z.boolean().optional(),
});

export const updateProductValidation = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive('Price must be a positive number').optional(),
  image: z.string().url('Image must be a valid URL').optional(),
  isAvailable: z.boolean().optional(),
});
