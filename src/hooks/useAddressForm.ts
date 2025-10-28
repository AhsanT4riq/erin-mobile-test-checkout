import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { DeliveryMethod } from '../graphql/types';
import { addressSchema, AddressFormData } from '../schema/addressSchema';

export function useAddressForm() {
  return useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    mode: 'onBlur',
    defaultValues: {
      streetAddress: '',
      apartmentSuite: '',
      city: '',
      stateProvince: '',
      zipPostalCode: '',
      country: '',
      deliveryInstructions: '',
      deliveryMethod: DeliveryMethod.STANDARD,
    },
  });
}
