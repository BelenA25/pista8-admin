"use client"

import Typography from "@/components/Typography/typography";
import StartupForm from "@/components/startup-form";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditStartupForm() {
    const { editId } = useParams();
    const [startupId, setStartupId] = useState<string | null>(null);

    useEffect(() => {
        if (editId) {
            setStartupId(editId as string);
        }
    }, [editId]);

    if (!startupId) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Typography tag="h1">Editar Startup</Typography>
            <StartupForm startupId={startupId}></StartupForm>
        </>
    );
}