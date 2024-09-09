import {z} from 'zod';

export const foundersValidation = z.object({
   name : z.string()
   .min(3,{message: 'El nombre debe tener al menos 3 caracteres'})
    .max(30,{message: 'El nombre debe tener como máximo 50 caracteres'}),
    imageUrl : z.string()
    .url({message: 'La url de la imagen no es válida'}),
    link : z.string()
    .url({message: 'La url del link no es válida'}) 
})