"use client";

import applicationsService from '@/service/applicationsService'
import ApplicationForm from "@/components/application-form";
import Typography from "@/components/Typography/typography";
import { toast } from "sonner";

export default function AddApplications() {
  const handleSubmit = async (application: {
    startup_name: string;
    full_name: string;
    email: string;
    phone: string;
    city: string;
    startup_description: string;
    startup_stage: string;
  }) => {
    try {
      await applicationsService.add(application);
      alert("Postulación agregada con éxito");
      toast.success("Postulación agregada con éxito");
    } catch (error) {
      toast.error("Error al agregar la postulación");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl">
        <Typography tag="h1">Agregar Postulaciones</Typography>
      </div>
      <br />
      <ApplicationForm onSubmit={handleSubmit} />
    </div>
  );
}
