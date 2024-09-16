import {z} from 'zod';

export const partnersValidation = z.object({
    name: z.string()
      .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
      .max(100, { message: 'El nombre debe tener como máximo 100 caracteres' }),
    imageUrl: z.string().optional(),
    link: z.string().url({ message: 'La url del link no es válida' }).optional().or(z.literal('')),
 });
 
 export type PartnerFormValidation = z.infer<typeof partnersValidation>;