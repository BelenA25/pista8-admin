import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { createItem, getNewsById, updateItem } from "@/service/newsService";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useImageUpload } from "@/hooks/useImageUpload";
import { toast } from "sonner";
import { TextField } from "./TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NewsFormValidation,
  newsValidation,
} from "@/components/shared/api/newsValidation";

const TYPE = "news";

type NewsFormProps = {
  newsId?: string;
};

export default function FormNews({ newsId }: NewsFormProps) {
  const router = useRouter();
  const form = useForm<NewsFormValidation>({
    resolver: zodResolver(newsValidation),
    defaultValues: {
      name: "",
      imageUrl: "",
      link: "",
      description: "",
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
    if (newsId) {
      getNewsById(TYPE, newsId).then((newsData) => {
        if (newsData) {
          form.reset({
            name: newsData.name,
            imageUrl: newsData.imageUrl,
            link: newsData.link,
            description: newsData.description,
          });
          setImagePreviewUrl(newsData.imageUrl);
        }
      });
    }
  }, [newsId, form, setImagePreviewUrl]);

  const onSubmit = async (values: NewsFormValidation) => {
    let imageUrl = form.getValues("imageUrl");

    if (imagePreviewUrl) {
      imageUrl = await uploadImage();
    }

    const newsData = {
      name: values.name,
      imageUrl,
      link: values.link,
      description: values.description,
    };

    try {
      if (newsId) {
        await updateItem(TYPE, newsId, newsData);
        toast.success("Noticia actualizada");
      } else {
        await createItem(TYPE, newsData);
        toast.success("Noticia creada");
      }
      form.reset();
      router.push("/news");
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
              label="Nombre:"
              placeholder="Nombre "
            />
            <TextField
              control={form.control}
              fieldName="description"
              label="Descripción:"
              placeholder="Descripción "
            />
            <TextField
              control={form.control}
              fieldName="link"
              label="Link:"
              placeholder="https://"
            />
            <Label className="block text-start mb-2 mt-4" htmlFor="image">
              Imagen de la Noticia:
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
