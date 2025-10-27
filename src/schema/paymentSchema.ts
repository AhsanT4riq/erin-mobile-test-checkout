import { z } from 'zod';

export const paymentSchema = z
  .object({
    cardNumber: z
      .string()
      .min(1, 'Card number is required')
      .regex(/^\d{13,19}$/, 'Card number must be 13-19 digits')
      .transform(val => val.replace(/\s/g, '')), // Remove spaces
    cardholderName: z
      .string()
      .min(1, 'Cardholder name is required')
      .max(100, 'Name is too long')
      .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    expiryMonth: z
      .string()
      .regex(/^(0[1-9]|1[0-2])$/, 'Invalid month (01-12)')
      .min(1, 'Expiry month is required'),
    expiryYear: z
      .string()
      .regex(/^\d{2}$/, 'Year must be 2 digits')
      .min(1, 'Expiry year is required')
      .refine(year => {
        const currentYear = new Date().getFullYear() % 100;
        return parseInt(year, 10) >= currentYear;
      }, 'Card has expired'),
    cvv: z
      .string()
      .regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
      .min(1, 'CVV is required'),
    billingAddressSameAsShipping: z.boolean().default(true),
    billingStreetAddress: z.string().optional(),
    billingCity: z.string().optional(),
    billingZipPostalCode: z.string().optional(),
  })
  .refine(
    data => {
      if (!data.billingAddressSameAsShipping) {
        return (
          data.billingStreetAddress &&
          data.billingStreetAddress.length > 0 &&
          data.billingCity &&
          data.billingCity.length > 0 &&
          data.billingZipPostalCode &&
          data.billingZipPostalCode.length > 0
        );
      }
      return true;
    },
    {
      message: 'Billing address is required when not using shipping address',
      path: ['billingStreetAddress'],
    },
  );

export type PaymentFormData = z.infer<typeof paymentSchema>;
