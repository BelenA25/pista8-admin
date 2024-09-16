'use client';
import Typography from "@/components/Typography/typography";
import StartupForm from "@/components/StartupForm";
import useAuth from "@/hooks/useAuth";
import AuthHandler from "@/components/AuthHandler";

export default function CreateStartupForm() {
  const { user, loading} = useAuth();

    return (
        <AuthHandler user={user} loading={loading}>
            <Typography tag="h1">Crear Startup</Typography>
            <StartupForm></StartupForm>
        </AuthHandler>
    );
}