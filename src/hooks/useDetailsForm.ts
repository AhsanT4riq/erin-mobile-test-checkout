import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { detailsSchema, DetailsFormData } from '../schema/detailsSchema';

export function useDetailsForm() {
  return useForm<DetailsFormData>({
    resolver: zodResolver(detailsSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      firstName: 'Ahsan',
      lastName: 'Tariq',
      email: 'ahsan.tariq@erin.com',
      phone: '1234567890',
      company: 'Erin',
      specialInstructions: 'No instructions',
    },
  });
}
