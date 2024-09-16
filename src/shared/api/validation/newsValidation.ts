import { z } from 'zod';

export const newsValidation = z.object({
  name: z.string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(100, { message: 'El nombre debe tener como máximo 100 caracteres' }),
  imageUrl: z.string().optional(),
  link: z.string()
    .url({ message: 'La url del link no es válida' })
    .optional()
    .or(z.literal('')),
  description: z.string()
    .min(10, { message: 'La descripción debe tener al menos 10 caracteres' })
    .max(500, { message: 'La descripción debe tener como máximo 500 caracteres' }),
});

export type NewsFormValidation = z.infer<typeof newsValidation>;