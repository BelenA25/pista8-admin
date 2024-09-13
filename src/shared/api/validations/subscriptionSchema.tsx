import { z } from "zod";

export const SubscriptionSchema = z.object({
    email: z.string()
        .min(1, { message: "El correo electrónico es requerido." })
        .email({ message: "El correo electrónico debe ser válido." })
});

export type SubscriptionFormValues = z.infer<typeof SubscriptionSchema>;