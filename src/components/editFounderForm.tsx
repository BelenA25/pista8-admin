'use client';

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FounderFormValues, foundersValidation } from "./shared/api/validation/foundersValidation";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createItem, getItemById, updateItem } from "@/service/foundersService";
import { storage } from "@/app/firebaseConfig";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { toast } from "sonner";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const TYPE = "founders";

type FounderFormProps = {
  founderId: string;
};

export default function EditFounderForm({ founderId }: FounderFormProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

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
          setImagePreviewUrl(founderData.imageUrl); // Set image preview URL
        }
      });
    }
  }, [founderId, form]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);

      // Preview new selected file
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string); // Set preview URL for the new image
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: FounderFormValues) => {
    setIsUploading(true);
    let imageUrl = form.getValues("imageUrl");

    if (selectedFile) {
      const storageRef = ref(storage, `founders/${selectedFile.name}-${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          () => {},
          (error) => {
            toast.error("Error al subir la imagen");
            reject(error);
          },
          async () => {
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(true);
          }
        );
      });
    }

    const founderData = {
      name: values.name,
      imageUrl, // Use new image URL or existing one
      link: values.link,
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
      router.push("/fundadores");
    } catch (error) {
      console.error("Error al guardar el fundador:", error);
    }
  };

  return (
    <>
      <div className="p-6 border border-gray-600 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4 w-full max-w-md mx-auto">
        <Form {...form}>
          <div className="flex flex-col gap-6 w-full">
            <div>
              <Label className="block text-start mb-2" htmlFor="name">
                Nombre
              </Label>
              <Input
                className="w-64 p-2 text-sm border border-gray-500 mt-4"
                type="text"
                id="name"
                {...form.register("name")}
                placeholder="Nombre del fundador"
              />
            </div>
            <div>
              <Label className="block text-start mb-2" htmlFor="link">
                Link
              </Label>
              <Input
                className="w-64 p-2 text-sm border border-gray-500"
                type="text"
                id="link"
                {...form.register("link")}
                placeholder="https://"
              />
            </div>
            <div>
              <Label className="block text-start mb-2" htmlFor="image">
                Imagen
              </Label>
              {imagePreviewUrl && (
                <div className=" flex justify-center mb-4">
                  <img
                    src={imagePreviewUrl}
                    alt="Vista previa de la imagen"
                    className="w-32 h-32 object-cover border  border-gray-500"
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
              <Button type="submit" onClick={form.handleSubmit(onSubmit)} className="w-32 bg-orange-500 hover:bg-orange-400">
                ACEPTAR
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
