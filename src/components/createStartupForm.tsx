import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
const formSchema = z.object({
    year: z.string().min(1, { message: "El año es requerido." }),
    name: z.string().min(1, { message: "El nombre es requerido." }),
    description: z.string().min(1, { message: "La descripción es requerida." }),
    section: z.string().min(1, { message: "La sección es requerida." }),
    quote: z.string().optional(),
    author: z.string().min(1, { message: "El autor es requerido." }),
})
type FormValues = z.infer<typeof formSchema>
export default function CreateStartupForm(){
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            year: "",
            name: "",
            description: "",
            section: "",
            quote: "",
            author: "",
        },
    })

    function onSubmit(values: FormValues) {
        console.log(values)
    }
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Año</FormLabel>
                            <FormControl>
                                <Input placeholder="2024" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre del startup" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Input placeholder="Descripción del startup" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sección</FormLabel>
                            <FormControl>
                                <Input placeholder="Sección del startup" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quote"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cita</FormLabel>
                            <FormControl>
                                <Input placeholder="Cita inspiradora" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Autor</FormLabel>
                            <FormControl>
                                <Input placeholder="Autor de la cita" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-custom-orange text-white">CREAR</Button>
            </form>
        </Form>
    )
}