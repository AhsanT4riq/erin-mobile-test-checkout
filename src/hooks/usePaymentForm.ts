import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { paymentSchema, PaymentFormData } from '../schema/paymentSchema';

export function usePaymentForm() {
  const methods = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: 'onBlur',
    defaultValues: {
      cardNumber: '4000000000000069',
      cardholderName: 'Ahsan Tariq',
      expiryMonth: '12',
      expiryYear: '25',
      cvv: '123',
      billingAddressSameAsShipping: true,
      billingStreetAddress: '',
      billingCity: '',
      billingZipPostalCode: '',
    },
  });

  return methods;
}
