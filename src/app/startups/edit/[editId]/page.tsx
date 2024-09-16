"use client"

import Typography from "@/components/Typography/typography";
import StartupForm from "@/components/StartupForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import AuthHandler from "@/components/AuthHandler";

export default function EditStartupForm() {
    const { editId } = useParams();
    const [startupId, setStartupId] = useState<string | null>(null);
    const { user, loading} = useAuth();


    useEffect(() => {
        if (editId) {
            setStartupId(editId as string);
        }
    }, [editId]);

    if (!startupId) {
        return <div>Cargando...</div>;
    }

    return (
        <AuthHandler user={user} loading={loading}>
            <Typography tag="h1">Editar Startup</Typography>
            <StartupForm startupId={startupId}></StartupForm>
        </AuthHandler>
    );
}