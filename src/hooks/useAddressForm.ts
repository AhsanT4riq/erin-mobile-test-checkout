import { addressSchema, AddressFormData } from '../schema/addressSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DeliveryMethod } from '../graphql/types';

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
