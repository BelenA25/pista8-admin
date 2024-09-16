import { z } from "zod";

export const mentorSchema = z.object({
    name: z.string()
        .min(1, { message: "El nombre es requerido." })
        .max(50, { message: "El nombre no puede exceder los 50 caracteres." })
        .regex(/^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/, { message: "El nombre solo debe contener letras y espacios." }),

    title: z.string()
        .min(1, { message: "El título es requerido." })
        .max(50, { message: "El título no puede exceder los 50 caracteres." })
        .regex(/^[A-Za-z\s]+$/, { message: "El título solo debe contener letras y espacios." }),

    city: z.string()
        .min(1, { message: "El país es requerido." })
        .max(50, { message: "El país no puede exceder los 50 caracteres." })
        .regex(/^[A-Za-z\s]+$/, { message: "El país solo debe contener letras y espacios." }),

    linkedin: z.string()
        .url({ message: "El enlace de LinkedIn debe ser una URL válida." })
        .optional(),
});

export type MentorFormValues = z.infer<typeof mentorSchema>;
