"use client"

import MentorsForm from "@/components/MentorForm";
import Typography from "@/components/Typography/typography";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditMentorForm() {
    const { editId } = useParams();
    const [mentorId, setMentorId] = useState<string | null>(null);

    useEffect(() => {
        if (editId) {
            setMentorId(editId as string);
        }
    }, [editId]);

    if (!mentorId) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Typography tag="h1">Editar Mentor</Typography>
            <MentorsForm mentorId={mentorId}></MentorsForm>
        </>
    );
}