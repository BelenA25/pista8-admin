import { useRouter } from "next/navigation";
import {
  ApplicationFormValues,
  applicationSchema,
} from "./shared/api/validation/applicationValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createItem } from "@/service/applicationsService";
import { toast } from "sonner";
import { Form } from "./ui/form";
import { TextField } from "./text-field";
import { Button } from "./ui/button";

const TYPE = "applications";

export default function ApplicationsForm() {
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
              type="email"
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
              type="number"
              fieldName="startup_stage"
              label="Nombre de la Statup"
              placeholder="Etapa de la startup 1 o 2"
            />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            className="bg-orange-500 text-white hover:bg-orange-400"
            onClick={form.handleSubmit(onSubmit)}
          >
            ACEPTAR
          </Button>
        </div>
      </Form>
    </div>
  );
}
