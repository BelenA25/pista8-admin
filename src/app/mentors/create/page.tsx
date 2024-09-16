'use client'
import AuthHandler from "@/components/AuthHandler";
import MentorsForm from "@/components/MentorForm";
import Typography from "@/components/Typography/typography";
import useAuth from "@/hooks/useAuth";

export default function CreateMentorForm() {
  const { user, loading} = useAuth();

    return (
        <AuthHandler user={user} loading={loading}>
            <Typography tag="h1">Crear Mentor</Typography>
            <MentorsForm></MentorsForm>
        </AuthHandler>
    );
}