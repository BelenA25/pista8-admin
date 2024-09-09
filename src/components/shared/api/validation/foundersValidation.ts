import FounderForm from '@/components/founder-form';
import {z} from 'zod';

export const foundersValidation = z.object({
    name: z.string()
      .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
      .max(50, { message: 'El nombre debe tener como máximo 50 caracteres' }),
    imageUrl: z.string().optional(),
    link: z.string().url({ message: 'La url del link no es válida' }),
 });
 
 export type FounderFormValues = z.infer<typeof foundersValidation>;