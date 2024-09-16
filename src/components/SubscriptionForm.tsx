"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkEmailExists, createItem, getItemById, updateItem } from "@/shared/api/services/itemService";
import { TextField } from "./TextField";
import { SubscriptionFormValues, SubscriptionSchema } from "@/shared/api/validation/subscriptionSchema";

const TYPE = 'subscriptions';

type SubscriptionFormProps = {
    subscriptionId?: string;
};

export default function SubscriptionsForm({ subscriptionId }: SubscriptionFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<SubscriptionFormValues>({
        resolver: zodResolver(SubscriptionSchema),
        defaultValues: {
            email: "",
        },
    });

    useEffect(() => {
        if (subscriptionId) {
            getItemById(TYPE, subscriptionId).then((subscriptionData) => {
                if (subscriptionData) {
                    form.reset({
                        email: subscriptionData.email,
                    });
                }
            });
        }
    }, [subscriptionId, form]);

    const onSubmit = async (values: SubscriptionFormValues) => {
        setIsSubmitting(true);
        try {
            const emailExists = await checkEmailExists(values.email);

            if (emailExists) {
                toast.error("No puede registrar un correo electrónico que ya está registrado.");
                return;
            }

            if (subscriptionId) {
                await updateItem(TYPE, subscriptionId, { email: values.email });
                toast.success("Suscriptor actualizado satisfactoriamente!");
            } else {
                await createItem(TYPE, { email: values.email });
                toast.success("Suscriptor creado satisfactoriamente!");
            }

            form.reset();
            router.push("/subscriptions");
        } catch (error) {
            toast.error("Error al enviar el formulario");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        form.reset();
        toast.info("Ningún cambio realizado");
        router.push("/subscriptions");
    };

    return (
        <div className="m-9 p-9 border border-black rounded-lg custom-shadow overflow-hidden max-w-6xl mx-auto flex flex-col gap-6 min-h-3.5">
            <Form {...form}>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-6">
                        <TextField
                            control={form.control}
                            fieldName="email"
                            label="Email"
                            placeholder="Dirección de correo electrónico del suscriptor"
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-4 space-x-8">
                    <Button
                        type="button"
                        className="bg-black text-white"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className="bg-custom-orange text-white"
                    >
                        {isSubmitting ? (
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
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 0116 0H4z"
                                    ></path>
                                </svg>
                                {subscriptionId ? "Actualizando..." : "Creando..."}
                            </>
                        ) : (
                            <>{subscriptionId ? "Actualizar" : "Crear"}</>
                        )}
                    </Button>
                </div>
            </Form>
        </div>
    );
}