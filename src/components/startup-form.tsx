"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form} from "@/components/ui/form";
import { database } from "@/app/firebaseConfig";
import { ref as dbRef, get, push, set } from "firebase/database";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { StartupFormValues, startupSchema } from "@/shared/api/validations/startupSchema";
import { TextField } from "./text-field";

type StartupFormProps = {
    startupId?: string;
};

export default function StartupForm({ startupId }: StartupFormProps) {
    const router = useRouter();

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
            const startupRef = dbRef(database, `startups/${startupId}`);
            get(startupRef).then((snapshot) => {
                const startupData = snapshot.val();
                if (startupData) {
                    form.reset({
                        year: startupData.year,
                        name: startupData.name,
                        sector: startupData.sector,
                        description: startupData.description,
                        quote: startupData.quote || "",
                        author: startupData.author,
                    });
                }
            });
        }
    }, [startupId, form]);
    const onSubmit = async (values: StartupFormValues) => {
        try {
            const startupData = {
                year: values.year,
                name: values.name,
                sector: values.sector,
                description: values.description,
                quote: values.quote || "",
                author: values.author,
            };

            if (startupId) {
                const startupRef = dbRef(database, `startups/${startupId}`);
                await set(startupRef, startupData);
                toast.success("Startup actualizado satisfactoriamente!");
            } else {
                const newStartupRef = push(dbRef(database, "startups"));
                await set(newStartupRef, startupData);
                toast.success("Startup creado satisfactoriamente!");
            }

            form.reset();
            router.push("/startups");

        } catch (error) {
            toast.error("Error al enviar el formulario");
        }
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
                    <div className="flex justify-center mt-4">
                        <Button type="button" className="bg-custom-orange text-white" onClick={form.handleSubmit(onSubmit)}> Crear </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}