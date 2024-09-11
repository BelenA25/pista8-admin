import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { createItem, getItemById, updateItem } from "@/service/partnersService";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useImageUpload } from "@/hook/useImageUpload";
import { toast } from "sonner";
import { TextField } from "./text-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartnerFormValidation, partnersValidation } from "./shared/api/partnersValidation";


const TYPE = "partners";

type FounderFormProps = {
  founderId?: string;
};

export default function PartnerForm({ founderId }: FounderFormProps) {
  const router = useRouter();
  const form = useForm<PartnerFormValidation>({
    resolver: zodResolver(partnersValidation),
    defaultValues: {
      name: "",
      imageUrl: "",
      link: "",
     
    },
  });

  const {
    imagePreviewUrl,
    handleFileChange,
    uploadImage,
    isUploading,
    setImagePreviewUrl,
  } = useImageUpload();

  useEffect(() => {
    if (founderId) {
      getItemById(TYPE, founderId).then((partnerData) => {
        if (partnerData) {
          form.reset({
            name: partnerData.name,
            imageUrl: partnerData.imageUrl,
            link: partnerData.link,
          });
          setImagePreviewUrl(partnerData.imageUrl);
        }
      });
    }
  }, [founderId, form, setImagePreviewUrl]);

  const onSubmit = async (values: PartnerFormValidation) => {
    let imageUrl = form.getValues("imageUrl");

    if (imagePreviewUrl) {
      imageUrl = await uploadImage();
    }

    const partnerData = {
      name: values.name,
      imageUrl,
      link: values.link,
      iconSize: "1"//is value for defect in the form
    };

    try {
      if (founderId) {
        await updateItem(TYPE, founderId, partnerData);
        toast.success("Fundador actualizado");
      } else {
        await createItem(TYPE, partnerData);
        toast.success("Fundador creado");
      }
      form.reset();
      router.push("/partners");
    } catch (error) {
      console.error("Error al guardar el fundador:", error);
    }
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
              placeholder="La Papelera"
            />
            <TextField
              control={form.control}
              fieldName="link"
              label="Link"
              placeholder="https://"
            />
            <Label className="block text-start mb-2 mt-4" htmlFor="image">
              Icono del partner
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
          
          <div className="flex justify-center">
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              className="w-32 bg-orange-500 hover:bg-orange-400"
              disabled={isUploading}
            >
              ACEPTAR
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
