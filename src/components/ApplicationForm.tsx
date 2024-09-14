import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createItem } from "@/service/applicationsService";
import { toast } from "sonner";
import { Form } from "./ui/form";
import { TextField } from "./TextField";
import { Button } from "./ui/button";
import { ApplicationFormValues, applicationSchema } from "@/shared/api/validation/applicationValidation";
import { useState } from "react";

const TYPE = "applications";

export default function ApplicationsForm() {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      startup_name: "",
      full_name: "",
      email: "",
      phone: "",
      city: "",
      startup_description: "",
      startup_stage: "",
    },
  });

  const onSubmit = async (values: ApplicationFormValues) => {
    setIsUploading(true);
    const applicationData = {
      startup_name: values.startup_name,
      full_name: values.full_name,
      email: values.email,
      phone: values.phone,
      city: values.city,
      startup_description: values.startup_description,
      startup_stage: values.startup_stage,
    };
    try {
      await createItem(TYPE, applicationData);
      toast.success("Aplicación enviada correctamente");
      form.reset();
      router.push("/startups/applications");
    } catch (error) {
      toast.error("Error al enviar la aplicación");
    }
  };
  const handleCancel = () => {
    form.reset();
    toast.info("Ningún cambio realizado");
    router.push("/startups/applications");
};
  return (
    <div className="m-9 p-9 border border-black rounded-lg custom-shadow overflow-hidden max-w-6xl mx-auto flex flex-col gap-6 min-h-3.5">
      <Form {...form}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-6">
            <TextField
              control={form.control}
              fieldName="startup_name"
              label="Nombre de la Statup"
              placeholder="Nombre de la startup"
            />
            <TextField
              control={form.control}
              fieldName="full_name"
              label="Nombre Completo"
              placeholder="Nombre completo"
            />
            <TextField
              control={form.control}
              fieldName="email"
              label="Correo electronico"
              placeholder="ejemplo@gmail.com"
            />
            <TextField
              control={form.control}
              fieldName="phone"
              label="Teléfono"
              placeholder="00000000"
            />
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <TextField
              control={form.control}
              fieldName="city"
              label="Ciudad"
              placeholder="Cochabamba"
            />
            <TextField
              control={form.control}
              fieldName="startup_description"
              label="escripción de la Startup"
              placeholder="Descripcion de la statup"
            />
            <TextField
              control={form.control}
              fieldName="startup_stage"
              label="Nombre de la Statup"
              placeholder="Etapa de la startup 1 o 2"
            />
          </div>
        </div>

         <div className="flex justify-center mt-4 space-x-8">
                        <Button
                            type="button"
                            className="bg-black text-white"
                            onClick={handleCancel}
                            disabled={isUploading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            className="bg-custom-orange text-white"
                            onClick={form.handleSubmit(onSubmit)}
                            disabled={isUploading}
                        >
                            {isUploading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        >
                                        </circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 0116 0H4z"
                                        >
                                        </path>
                                    </svg>
                                    Creando ....
                                </>
                            ) : (
                                <>  Crear
                                </>
                            )}
                        </Button>
                    </div>
      </Form>
    </div>
  );
}
