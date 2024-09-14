"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { StartupFormValues, startupSchema } from "@/shared/api/validations/startupSchema";
import { TextField } from "./TextField";
import { createItem, getItemById, updateItem, uploadImage } from "@/shared/api/services/itemService";
import { Input } from "./ui/input";

const TYPE = 'startups'

type StartupFormProps = {
    startupId?: string;
};

export default function StartupForm({ startupId }: StartupFormProps) {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [startupImage, setStartupImage] = useState<File | null>(null);
    const [startupImageUrl, setStartupImageUrl] = useState<string | null>(null);

    const form = useForm<StartupFormValues>({
        resolver: zodResolver(startupSchema),
        defaultValues: {
            year: "",
            name: "",
            description: "",
            sector: "",
            quote: "",
            author: "",
        },
    });
    useEffect(() => {
        if (startupId) {
            getItemById(TYPE, startupId).then((startupData) => {
                if (startupData) {
                    form.reset({
                        year: startupData.year,
                        name: startupData.name,
                        sector: startupData.sector,
                        description: startupData.description,
                        quote: startupData.quote || "",
                        author: startupData.author,
                    });
                    setStartupImageUrl(startupData.imageUrl);
                }
            });
        }
    }, [startupId, form]);
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };
    const onSubmit = async (values: StartupFormValues) => {
        setIsUploading(true);
        let imageUrl = startupImageUrl || "";

        if (selectedFile) {
            imageUrl = await uploadImage(selectedFile);

        }

        const startupData = {
            year: values.year,
            name: values.name,
            sector: values.sector,
            description: values.description,
            quote: values.quote || "",
            author: values.author,
            imageUrl,
        };
        try {
            if (startupId) {
                await updateItem(TYPE, startupId, startupData);
                toast.success("Startup actualizado satisfactoriamente!");
            } else {
                await createItem(TYPE, startupData);
                toast.success("Startup creado satisfactoriamente!");
            }

            form.reset();
            router.push("/startups");

        } catch (error) {
            toast.error("Error al enviar el formulario");
        } finally {
            setIsUploading(false);
        }
    };
    const handleCancel = () => {
        form.reset();
        toast.info("Ningún cambio realizado");
        router.push("/startups");
    };
    return (
        <>
            <div className="m-9 p-9 border border-black rounded-lg custom-shadow overflow-hidden max-w-6xl mx-auto flex flex-col gap-6 min-h-3.5">
                <Form {...form}>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 flex flex-col gap-6">
                            <TextField control={form.control} fieldName="year" label="Año" placeholder="2024" />
                            <TextField control={form.control} fieldName="name" label="Nombre" placeholder="Nombre del startup" />
                            <TextField control={form.control} fieldName="sector" label="Sector" placeholder="Sector de desempeño del startup" />
                        </div>
                        <div className="flex-1 flex flex-col gap-6">
                            <TextField control={form.control} fieldName="description" label="Descripción" placeholder="Descripción del startup" />
                            <TextField control={form.control} fieldName="quote" label="Cita" placeholder="Cita inspiradora" />
                            <TextField control={form.control} fieldName="author" label="Autor" placeholder="Autor de la cita" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-4 flex-col">
                        <FormLabel className="mb-2 text-center">Imagen del Startup</FormLabel>
                        {startupImageUrl ? (
                            <div className="mb-4">
                                <img
                                    src={startupImageUrl}
                                    alt="Imagen del Startup"
                                    className="w-32 h-32 object-cover border rounded-lg mx-auto" />
                                <Input type="file" onChange={handleFileChange} accept="image/*" />
                            </div>
                        ) : (
                            <Input type="file" onChange={handleFileChange} accept="image/*" />
                        )}
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
                            onClick={form.handleSubmit(onSubmit)}
                            disabled={isUploading}
                            className="bg-custom-orange text-white">
                            {isUploading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
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
                                    {startupId ? 'Actualizando...' : 'Creando...'}
                                </>
                            ) : (
                                <>{startupId ? 'Actualizar' : 'Crear'}</>
                            )}
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}