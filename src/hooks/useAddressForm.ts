import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { DeliveryMethod } from '../graphql/types';
import { addressSchema, AddressFormData } from '../schema/addressSchema';

export function useAddressForm() {
  return useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    mode: 'onBlur',
    defaultValues: {
      streetAddress: '123 Main St',
      apartmentSuite: 'Apt 1',
      city: 'Sydney',
      stateProvince: 'NSW',
      zipPostalCode: '2000',
      country: 'Australia',
      deliveryInstructions: 'No instructions',
      deliveryMethod: DeliveryMethod.STANDARD,
    },
  });
}
