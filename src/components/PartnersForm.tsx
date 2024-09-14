import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import {
  createItem,
  getItemById,
  updateItem,
  uploadImage,
} from "@/shared/api/services/itemService";

import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { TextField } from "./TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PartnerFormValidation,
  partnersValidation,
} from "@/shared/api/validation/partnersValidation";

const TYPE = "partners";

type PartnersFormProps = {
  partnerId?: string;
};

export default function PartnerForm({ partnerId }: PartnersFormProps) {
  const [partnerImage, setPartnerImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const form = useForm<PartnerFormValidation>({
    resolver: zodResolver(partnersValidation),
    defaultValues: {
      name: "",
      imageUrl: "",
      link: "",
    },
  });

  useEffect(() => {
    if (partnerId) {
      getItemById(TYPE, partnerId).then((partnerData) => {
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
  }, [partnerId, form, setImagePreviewUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPartnerImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    }
  };

  const onSubmit = async (values: PartnerFormValidation) => {
    let imageUrl = imagePreviewUrl || "";

    if (partnerImage) {
      imageUrl = await uploadImage(partnerImage);
    }

    const partnerData = {
      name: values.name,
      imageUrl,
      link: values.link,
      iconSize: "1", //is value for defect in the form
    };

    try {
      if (partnerId) {
        await updateItem(TYPE, partnerId, partnerData);
        toast.success("Partner actualizado");
      } else {
        await createItem(TYPE, partnerData);
        toast.success("Partner creado");
      }
      form.reset();
      router.push("/partners");
    } catch (error) {
      console.error("Error al guardar el partner:", error);
    }
  };
  const handleCancel = () => {
    form.reset();
    toast.info("Ningún cambio realizado");
    router.push("/partners");
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
              placeholder="Nombre partner"
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
                  {partnerId ? "Actualizando..." : "Creando..."}
                </>
              ) : (
                <>{partnerId ? "Actualizar" : "Crear"}</>
              )}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
