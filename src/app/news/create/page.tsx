'use client';
import AuthHandler from "@/components/AuthHandler";
import FormNews from "@/components/FormNews";
import Typography from "@/components/Typography/typography";
import useAuth from "@/hooks/useAuth";

export default function CreateNewsPage() {
  const { user, loading} = useAuth();

    return(
        <AuthHandler user={user} loading={loading}>
        <Typography tag="h1">Crear Noticia</Typography>
        <FormNews/>
        </AuthHandler>
    )
}