import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { detailsSchema, DetailsFormData } from '../schema/detailsSchema';

export function useDetailsForm() {
  return useForm<DetailsFormData>({
    resolver: zodResolver(detailsSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      specialInstructions: '',
    },
  });
}
