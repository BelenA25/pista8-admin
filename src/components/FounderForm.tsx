import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import { useForm } from "react-hook-form";


import { Form } from "./ui/form";
import { Input } from "./ui/input"; 
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { TextField } from "./TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { FounderFormValues, foundersValidation } from "@/shared/api/validation/foundersValidation";
import { createItem, getItemById, updateItem , uploadImage} from "@/shared/api/services/itemService";



const TYPE = "founders";

type FounderFormProps = { 
  founderId?: string;
};

export default function FounderForm({ founderId }: FounderFormProps) {

  const [founderImage, setFounderImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const router = useRouter();
  const form = useForm<FounderFormValues>({
    resolver: zodResolver(foundersValidation),
    defaultValues: {
      name: "",
      imageUrl: "",
      link: "",
     
    },
  });

 

  useEffect(() => {
    if (founderId) {
        getItemById(TYPE, founderId).then((founderData) => {
        if (founderData) {
          form.reset({
            name: founderData.name,
            imageUrl: founderData.imageUrl,
            link: founderData.link,
          });
          setImagePreviewUrl(founderData.imageUrl);
        }
      });
    }
  }, [founderId, form, setImagePreviewUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFounderImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    }
  };

  const onSubmit = async (values: FounderFormValues) => {
    setIsUploading(true);
    let imageUrl = imagePreviewUrl || "";

    if (founderImage) {
      imageUrl = await uploadImage(founderImage);
    }

    const founderData = {
      name: values.name,
      link: values.link, 
      imageUrl,
      iconSize: "1"//is value for defect in the form
    };

    try {
      if (founderId) {
        await updateItem(TYPE, founderId, founderData);
        toast.success("Fundador actualizado");
      } else {
        await createItem(TYPE, founderData);
        toast.success("Fundador creado");
      }
      form.reset();
      router.push("/founders");
    } catch (error) {
      console.error("Error al guardar el fundador:", error);
    }
  };

  const handleCancel = () => {
    form.reset();
    toast.info("Ningún cambio realizado");
    router.push("/founders");
};

  return (
    <div className="m-9 p-9 border border-black rounded-lg custom-shadow overflow-hidden max-w-6xl mx-auto flex flex-col gap-6 min-h-3.5">
      <Form {...form}>
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="w-80">
            <TextField
              control={form.control}
              fieldName="name"
              label="Nombre"
              placeholder="Nombre del fundador"
            />
            <TextField
              control={form.control}
              fieldName="link"
              label="Link"
              placeholder="https://"
            />
            <Label className="block text-start mb-2 mt-4" htmlFor="image">
              Icono del fundador
            </Label>
            {imagePreviewUrl && (
              <div className="flex justify-center mb-4">
                <img
                  src={imagePreviewUrl}
                  alt="Vista previa de la imagen"
                  className="w-32 h-32 object-cover border border-gray-500"
                />
              </div>
            )}
            <Input
              className="w-64 p-2 text-sm border border-gray-500"
              type="file"
              id="image"
              onChange={handleFileChange}
              accept="image/*"
            />
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
                                    {founderId ? 'Actualizando...' : 'Creando...'}
                                </>
                            ) : (
                                <>{founderId ? 'Actualizar' : 'Crear'}</>
                            )}
                        </Button>
                    </div>
        </div>
      </Form>
    </div>
  );
}
