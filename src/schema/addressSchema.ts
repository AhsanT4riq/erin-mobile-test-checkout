import { z } from 'zod';
import { DeliveryMethod } from '../graphql/types';

export const addressSchema = z.object({
  streetAddress: z
    .string()
    .min(1, 'Street address is required')
    .max(100, 'Address is too long'),
  apartmentSuite: z.string().max(50, 'Apartment/Suite is too long').optional(),
  city: z.string().min(1, 'City is required').max(50, 'City name is too long'),
  stateProvince: z
    .string()
    .min(1, 'State/Province is required')
    .max(50, 'State/Province is too long'),
  zipPostalCode: z
    .string()
    .min(1, 'ZIP/Postal code is required')
    .max(20, 'ZIP/Postal code is too long'),
  country: z
    .string()
    .min(1, 'Country is required')
    .max(50, 'Country name is too long'),
  deliveryInstructions: z
    .string()
    .max(500, 'Delivery instructions are too long')
    .optional(),
  deliveryMethod: z.enum(DeliveryMethod, {
    error: 'Please select a delivery method',
  }),
});

export type AddressFormData = z.infer<typeof addressSchema>;
