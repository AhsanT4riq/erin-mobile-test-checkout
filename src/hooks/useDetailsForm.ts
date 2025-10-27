import { detailsSchema, DetailsFormData } from '../schema/detailsSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function useDetailsForm() {
  return useForm<DetailsFormData>({
    resolver: zodResolver(detailsSchema),
    mode: 'onBlur',
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
