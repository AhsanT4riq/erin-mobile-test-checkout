import { addressSchema, AddressFormData } from '../schema/addressSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DeliveryMethod } from '../graphql/types';

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
      country: 'Australia',
      deliveryInstructions: '',
      deliveryMethod: DeliveryMethod.STANDARD,
    },
  });
}
