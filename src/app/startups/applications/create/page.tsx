"use client";

import ApplicationsForm from "@/components/ApplicationForm";
import AuthHandler from "@/components/AuthHandler";
import Typography from "@/components/Typography/typography";
import useAuth from "@/hooks/useAuth";

export default function Create() {
  const { user, loading} = useAuth();
  return (
   
    <AuthHandler user={user} loading={loading}>
      <Typography tag="h1">Agregar Postulaciones</Typography>
      <ApplicationsForm />
    </AuthHandler>
  );
}
