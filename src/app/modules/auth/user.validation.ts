import { z } from 'zod';

export const userValidation = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  email: z.string().email('Please provide a valid email address.').trim(),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^(?:\+?88)?01[3-9]\d{8}$/,
      'Please enter a valid Bangladeshi phone number.',
    )
    .trim(),
  address: z.string().min(1, 'Address is required').trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must contain an uppercase letter, a lowercase letter, a number, and a special character.',
    ),
  role: z.enum(['customer', 'seller', 'admin']).optional(),
  status: z.enum(['active', 'inactive', 'blocked']).optional(),
});

export const verifyEmailValidation = z.object({
  token: z.string('Verification token is required'),
  otp: z
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d{6}$/, 'OTP must contain only digits'),
});

export const userSigninValidation = z.object({
  email: z.string().email('Please provide a valid email address.').trim(),
  password: z.string('Please provide your password.'),
});

export const forgetPasswordValidation = z.object({
  email: z.string().email('Please provide a valid email address.').trim(),
});

export const resetPasswordValidation = z.object({
  token: z.string('Reset token is required'),
  newPassword: z
    .string()
    .min(8, 'New password must be at least 8 characters.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'New password must contain an uppercase letter, a lowercase letter, a number, and a special character.',
    ),
});
