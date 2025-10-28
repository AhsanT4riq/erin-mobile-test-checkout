import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { paymentSchema, PaymentFormData } from '../schema/paymentSchema';

export function usePaymentForm() {
  const methods = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: 'onBlur',
    defaultValues: {
      cardNumber: '',
      cardholderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      billingAddressSameAsShipping: true,
      billingStreetAddress: '',
      billingCity: '',
      billingZipPostalCode: '',
    },
  });

  return methods;
}
