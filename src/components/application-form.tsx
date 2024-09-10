import { FormEvent, useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { applicationSchema } from "./shared/api/validation/applicationValidation";

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
  const clearForm = () => {
    setStartupName("");
    setFullName("");
    setEmail("");
    setPhone("");
    setCity("");
    setStartupDescription("");
    setStartupStage("");
    setErrors(null);
  };
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
    clearForm();
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
            placeholder="Nombre de la startup"
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
            placeholder="Nombre completo"
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
            placeholder="Correo electrónico"
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
            placeholder="Teléfono"
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
            placeholder="Ciudad"
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
            placeholder="Descripción de la startup"
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
            placeholder="Etapa de la startup 1 o 2"
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
