"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { database } from "@/app/firebaseConfig";
import { ref as dbRef, get, push, set } from "firebase/database";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
    year: z.string()
        .length(4, { message: "El año debe tener 4 dígitos." })
        .regex(/^\d{4}$/, { message: "El año debe ser un valor numérico de 4 dígitos." }),
    name: z.string()
        .min(1, { message: "El nombre es requerido." })
        .max(50, { message: "El nombre no puede exceder los 50 caracteres." })
        .regex(/^[A-Za-z\s]+$/, { message: "El nombre solo debe contener letras y espacios." }),
    sector: z.string()
        .min(1, { message: "El sector es requerido." })
        .max(50, { message: "El sector no puede exceder los 50 caracteres." })
        .regex(/^[A-Za-z\s]+$/, { message: "El sector solo debe contener letras y espacios." }),
    description: z.string()
        .min(1, { message: "La descripción es requerida." })
        .max(100, { message: "La descripción no puede exceder los 100 caracteres." })
        .regex(/^[A-Za-z0-9\s.,!?'"()_-]*$/, { message: "La descripción solo debe contener letras, números y caracteres especiales comunes." }),
    quote: z.string()
        .max(100, { message: "La cita no puede exceder los 100 caracteres." })
        .regex(/^[A-Za-z0-9\s.,!?'"()_-]*$/, { message: "La cita solo debe contener letras, números y caracteres especiales comunes." })
        .optional(),
    author: z.string()
        .min(1, { message: "El autor es requerido." })
        .max(100, { message: "El autor no puede exceder los 100 caracteres." })
        .regex(/^[A-Za-z0-9\s.,!?'"()_-]*$/, { message: "El autor solo debe contener letras, números y caracteres especiales comunes." }),
});

type FormValues = z.infer<typeof formSchema>;

type StartupFormProps = {
    startupId?: string;
};

export default function StartupForm({ startupId }: StartupFormProps) {
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
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
    const onSubmit = async (values: FormValues) => {
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
    return(
        <>
            <div className="m-9 p-9 border border-black rounded-lg custom-shadow overflow-hidden max-w-6xl mx-auto flex flex-col gap-6 min-h-3.5">
                <Form {...form}>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 flex flex-col gap-6">
                            <FormField control={form.control} name="year" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Año</FormLabel>
                                    <FormControl>
                                        <Input placeholder="2024" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre del startup" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField control={form.control} name="sector" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sector</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Sector de desempeño del startup" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-6">
                            <FormField control={form.control} name="description" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Descripción del startup" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField control={form.control} name="quote" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cita</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Cita inspiradora" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField control={form.control} name="author" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Autor</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Autor de la cita" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
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