import { z } from 'zod';

export const detailsSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long'),
  email: z.email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  company: z.string().optional(),
  specialInstructions: z
    .string()
    .max(500, 'Special instructions are too long')
    .optional(),
});

export type DetailsFormData = z.infer<typeof detailsSchema>;
