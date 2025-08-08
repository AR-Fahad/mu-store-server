import z from 'zod';

export const createStoreValidation = z.object({
  ownerId: z.string().min(1, 'Owner ID is required').trim(),
  name: z.string().min(1, 'Store name is required').trim(),
  description: z.string().min(1, 'Store description is required').trim(),
  image: z.string().url('Please provide a valid image URL').optional(),
});

export const updateStoreValidation = z.object({
  name: z.string().min(1, 'Store name is required').trim().optional(),
  description: z
    .string()
    .min(1, 'Store description is required')
    .trim()
    .optional(),
  image: z.string().url('Please provide a valid image URL').optional(),
});
