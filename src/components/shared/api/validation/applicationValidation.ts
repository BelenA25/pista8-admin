import {z} from "zod";

export const applicationSchema = z.object({
  startup_name: z
    .string()
    .min(3, {
      message: "El nombre de la startup es obligatorio o debe tener al menos 3 caracteres",
    }),
  full_name: z
    .string()
    .min(3, {
      message: "El nombre completo es obligatorio o debe tener al menos 3 caracteres",
    }),
  email: z.string().email({ message: "Debe ser un correo electrónico válido" }),
  phone: z
    .string()
    .min(7, {
      message: "El teléfono es obligatorio y debe tener mínimo 8 dígitos",
    })
    .regex(/^[\d\+\-\(\) ]+$/, {
      message: "El teléfono solo debe contener números",
    }),
  city: z.string().min(1, { message: "La ciudad es obligatoria" }),
  startup_description: z
    .string()
    .min(1, { message: "La descripción es obligatoria" }),
  startup_stage: z
    .string()
    .regex(/^[12]$/, { message: "La etapa de la startup debe ser 1 o 2" }),
});
