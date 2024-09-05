import { FormEvent, useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

// Definimos el esquema de validación con Zod
const applicationSchema = z.object({
  startup_name: z
    .string()
    .min(3, {
      message:
        "El nombre de la startup es obligatorio o debe tener almenos 3 caracteres",
    }),
  full_name: z
    .string()
    .min(3, {
      message:
        "El nombre completo es obligatorio o debe tener almenos 3 caracteres",
    }),
  email: z.string().email({ message: "Debe ser un correo electrónico válido" }),
  phone: z
    .string()
    .min(7, {
      message: "El teléfono es obligatorio y debe tener minimo 8 dijitos",
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

interface ApplicationFormProps {
  onSubmit: (application: {
    startup_name: string;
    full_name: string;
    email: string;
    phone: string;
    city: string;
    startup_description: string;
    startup_stage: string;
  }) => void;
}

export default function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const [startupName, setStartupName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [startupDescription, setStartupDescription] = useState("");
  const [startupStage, setStartupStage] = useState("");

  //erros state
  const [errors, setErrors] = useState<z.ZodError | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const applicationData = {
      startup_name: startupName,
      full_name: fullName,
      email: email,
      phone: phone,
      city: city,
      startup_description: startupDescription,
      startup_stage: startupStage,
    };

    // Validate forms data
    const result = applicationSchema.safeParse(applicationData);

    if (!result.success) {
      setErrors(result.error);
      return;
    }

    onSubmit(applicationData);
    setStartupName("");
    setFullName("");
    setEmail("");
    setPhone("");
    setCity("");
    setStartupDescription("");
    setStartupStage("");
    setErrors(null);
  };

  return ( 
    <form
      onSubmit={handleSubmit}
      className="p-4 border border-gray-600 rounded-lg shadow-lg"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <Label htmlFor="startup_name">Nombre de la Startup</Label>
          <Input
            id="startup_name"
            value={startupName}
            onChange={(e) => setStartupName(e.target.value)}
            className="w-64 p-2 text-sm mt-2 border border-gray-500"
            required
          />
          {errors?.formErrors.fieldErrors.startup_name && (
            <p className="text-red-600">
              {errors.formErrors.fieldErrors.startup_name[0]}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="full_name">Nombre Completo</Label>
          <Input
            id="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-64 p-2 text-sm mt-2 border border-gray-500"
            required
          />
          {errors?.formErrors.fieldErrors.full_name && (
            <p className="text-red-600">
              {errors.formErrors.fieldErrors.full_name[0]}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-64 p-2 text-sm mt-2 border border-gray-500"
            required
          />
          {errors?.formErrors.fieldErrors.email && (
            <p className="text-red-600">
              {errors.formErrors.fieldErrors.email[0]}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-64 p-2 text-sm mt-2 border border-gray-500"
            required
          />
          {errors?.formErrors.fieldErrors.phone && (
            <p className="text-red-600">
              {errors.formErrors.fieldErrors.phone[0]}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="city">Ciudad</Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-64 p-2 text-sm mt-2 border border-gray-500"
            required
          />
          {errors?.formErrors.fieldErrors.city && (
            <p className="text-red-600">
              {errors.formErrors.fieldErrors.city[0]}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="startup_description">Descripción de la Startup</Label>
          <Textarea
            id="startup_description"
            value={startupDescription}
            onChange={(e) => setStartupDescription(e.target.value)}
            className="w-64 p-2 text-sm mt-2 border border-gray-500"
            required
          />
          {errors?.formErrors.fieldErrors.startup_description && (
            <p className="text-red-600">
              {errors.formErrors.fieldErrors.startup_description[0]}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="startup_stage">Etapa de la Startup</Label>
          <Input
            id="startup_stage"
            type="number"
            min="1"
            max="2"
            value={startupStage}
            onChange={(e) => setStartupStage(e.target.value)}
            className="w-40 p-2 text-sm mt-2 border border-gray-500"
            required
          />
          {errors?.formErrors.fieldErrors.startup_stage && (
            <p className="text-red-600">
              {errors.formErrors.fieldErrors.startup_stage[0]}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          type="submit"
          className="w-36 bg-orange-600 text-white hover:bg-orange-400"
        >
          ACEPTAR
        </Button>
      </div>
    </form>
  );
}
