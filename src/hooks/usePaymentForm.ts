import { paymentSchema, PaymentFormData } from '../schema/paymentSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
