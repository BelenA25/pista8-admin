import { z } from "zod";

export const startupSchema = z.object({
    year: z.string()
        .length(4, { message: "El año debe tener 4 dígitos." })
        .regex(/^\d{4}$/, { message: "El año debe ser un valor numérico de 4 dígitos." }),
    name: z.string()
        .min(1, { message: "El nombre es requerido." })
        .max(50, { message: "El nombre no puede exceder los 50 caracteres." })
        .regex(/^[AA-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, { message: "El nombre solo debe contener letras y espacios." }),
    sector: z.string()
        .min(1, { message: "El sector es requerido." })
        .max(50, { message: "El sector no puede exceder los 50 caracteres." })
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, { message: "El sector solo debe contener letras y espacios." }),
    description: z.string()
        .min(1, { message: "La descripción es requerida." })
        .max(100, { message: "La descripción no puede exceder los 100 caracteres." })
        .regex(/^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s.,!?'"()_-]*$/, { message: "La descripción solo debe contener letras, números y caracteres especiales comunes." }),
    quote: z.string()
        .max(100, { message: "La cita no puede exceder los 100 caracteres." })
        .regex(/^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s.,!?'"()_-]*$/, { message: "La cita solo debe contener letras, números y caracteres especiales comunes." })
        .optional(),
    author: z.string()
        .min(1, { message: "El autor es requerido." })
        .max(100, { message: "El autor no puede exceder los 100 caracteres." })
        .regex(/^[AA-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s.,!?'"()_-]*$/, { message: "El autor solo debe contener letras, números y caracteres especiales comunes." }),
});

export type StartupFormValues = z.infer<typeof startupSchema>;