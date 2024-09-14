"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { createItem, getItemById, updateItem, uploadImage } from "@/shared/api/services/itemService";
import { MentorFormValues, mentorSchema } from "@/shared/api/validations/mentorSchema";
import { TextField } from "./TextField";

const TYPE = 'mentors'

type MentorFormProps = {
    mentorId?: string;
};

export default function MentorsForm({ mentorId }: MentorFormProps) {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [mentorImage, setMentorImage] = useState<File | null>(null);
    const [flagImage, setFlagImage] = useState<File | null>(null);
    const [mentorImageUrl, setMentorImageUrl] = useState<string | null>(null);
    const [flagImageUrl, setFlagImageUrl] = useState<string | null>(null);

    const form = useForm<MentorFormValues>({
        resolver: zodResolver(mentorSchema),
        defaultValues: {
            name: "",
            title: "",
            linkedin: "",
            city: "",
        },
    });
    useEffect(() => {
        if (mentorId) {
            getItemById(TYPE, mentorId).then((mentorData) => {
                if (mentorData) {
                    form.reset({
                        name: mentorData.name,
                        title: mentorData.title,
                        linkedin: mentorData.linkedin_link || "",
                        city: mentorData.city,
                    });
                    setMentorImageUrl(mentorData.imageUrl || "");
                    setFlagImageUrl(mentorData.flagUrl || "");
                }
            });
        }
    }, [mentorId, form]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'mentor' | 'flag') => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (type === 'mentor') {
                setMentorImage(file);
            } else if (type === 'flag') {
                setFlagImage(file);
            }
        }
    };
    const onSubmit = async (values: MentorFormValues) => {
        setIsUploading(true);
        let imageUrl = mentorImageUrl || "";
        let flagUrl = flagImageUrl || "";

        if (mentorImage) {
            imageUrl = await uploadImage(mentorImage);
        }

        if (flagImage) {
            flagUrl = await uploadImage(flagImage);
        }

        const mentorData = {
            name: values.name,
            title: values.title,
            linkedin_link: values.linkedin || "",
            city: values.city,
            imageUrl,
            flagUrl,
        };
        try {
            if (mentorId) {
                await updateItem(TYPE, mentorId, mentorData);
                toast.success("Mentor  actualizado satisfactoriamente!");
            } else {
                await createItem(TYPE, mentorData);
                toast.success("Mentor  creado satisfactoriamente!");
            }

            form.reset();
            router.push("/mentors");

        } catch (error) {
            toast.error("Error al enviar el formulario");
        } finally {
            setIsUploading(false);
        }
    };
    const handleCancel = () => {
        form.reset();
        toast.info("Ningún cambio realizado");
        router.push("/mentors");
    };
    return (
        <>
            <div className="m-9 p-9 border border-black rounded-lg custom-shadow overflow-hidden max-w-6xl mx-auto flex flex-col gap-6 min-h-3.5">
                <Form {...form}>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 flex flex-col gap-6">
                            <TextField control={form.control} fieldName="name" label="Nombre" placeholder="Nombre del mentor" />
                            <TextField control={form.control} fieldName="title" label="Título" placeholder="Título del mentor" />
                            <TextField control={form.control} fieldName="linkedin" label="Linkedin (link)" placeholder="Enlace del perfil de linkedin" />
                        </div>
                        <div className="flex-1 flex flex-col gap-6">
                            <TextField control={form.control} fieldName="city" label="País" placeholder="País del mentor" />
                            <FormLabel>Imagen del mentor</FormLabel>
                            {mentorImageUrl && (
                                <div className="mb-4">
                                    <img src={mentorImageUrl} alt="Mentor" className="w-32 h-32 object-cover border rounded-lg" />
                                    <input type="file" onChange={(e) => handleFileChange(e, 'mentor')} accept="image/*" />
                                </div>
                            )}
                            {!mentorImageUrl && <input type="file" onChange={(e) => handleFileChange(e, 'mentor')} accept="image/*" />}

                            <FormLabel>Imagen bandera</FormLabel>
                            {flagImageUrl && (
                                <div className="mb-4">
                                    <img src={flagImageUrl} alt="Bandera" className="w-32 h-32 object-cover border rounded-lg" />
                                    <input type="file" onChange={(e) => handleFileChange(e, 'flag')} accept="image/*" />
                                </div>
                            )}
                            {!flagImageUrl && <input type="file" onChange={(e) => handleFileChange(e, 'flag')} accept="image/*" />}
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
                                    {mentorId ? 'Actualizando...' : 'Creando...'}
                                </>
                            ) : (
                                <>{mentorId ? 'Actualizar' : 'Crear'}</>
                            )}
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}