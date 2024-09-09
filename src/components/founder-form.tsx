import { useState, FormEvent, ChangeEvent } from 'react';
import { Input } from "./ui/input";
import { Label } from './ui/label';
import { Button } from './ui/button';
import { foundersValidation } from './shared/api/validation/foundersValidation';
import { z, ZodError, ZodIssue} from 'zod';
import { storage } from '@/app/firebaseConfig'; // Importa la configuración de Firebase
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface FounderFormProps {
  onSubmit: (founders: {
    name: string;
    imageUrl: string;
    link: string;
    iconSize: string;
  }) => void;
}

export default function FounderForm({ onSubmit }: FounderFormProps) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState<File | null>(null); // Almacena el archivo de imagen
  const [link, setLink] = useState('');
  const [errors, setErrors] = useState<z.ZodError | null>(null);
  const [uploading, setUploading] = useState(false); // Estado para mostrar si está subiendo

  // Manejador de cambios en el input de archivo
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageUrl(e.target.files[0]); // Guarda el archivo seleccionado
    }
  };

  // Limpiar el formulario
  const clearForm = () => {
    setName('');
    setImageUrl(null);
    setLink('');
    setErrors(null);
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (!imageUrl) {
      const imageIssue: ZodIssue = {
        code: z.ZodIssueCode.custom, // Error personalizado para la imagen
        path: ['imageUrl'],
        message: 'Se requiere una imagen',
      };
      setErrors(new ZodError([imageIssue]));
      return;
    }
  
    const newFounder = {
      name,
      imageUrl: "", // Placeholder, se actualizará con la URL de Firebase
      link,
      iconSize: "1",
    };
  
    // Validar los datos con Zod
    const result = foundersValidation.safeParse(newFounder);
  
    if (!result.success) {
      setErrors(result.error);
      return;
    }
  
    setErrors(null);
    setUploading(true); // Inicia el estado de subida
  
    try {
      // Subir el archivo de imagen a Firebase Storage
      const imageRef = ref(storage, `founders/${imageUrl.name}-${Date.now()}`);
      await uploadBytes(imageRef, imageUrl);
      const downloadURL = await getDownloadURL(imageRef); // Obtener la URL pública de la imagen
  
      // Actualiza la URL de la imagen en el objeto del fundador
      newFounder.imageUrl = downloadURL;
  
      onSubmit(newFounder); // Envía el formulario con los datos
      clearForm(); // Limpia el formulario después del envío
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    } finally {
      setUploading(false); // Finaliza el estado de subida
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border border-gray-600 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4 w-full max-w-md mx-auto"
    >
      <div className="w-full">
        <Label className="block text-start mb-2">Nombre</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 text-sm border border-gray-500"
          required
        />
        {errors?.formErrors?.fieldErrors?.name && (
          <p className="text-red-600 text-center">
            {errors.formErrors.fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div className="w-full">
        <Label className="block text-start mb-2">Link</Label>
        <Input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 text-sm border border-gray-500"
          required
        />
      </div>

      <div className="w-full">
        <Label className="block text-start mb-2">Icono del Fundador</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 text-sm border border-gray-500"
        />
        {errors?.formErrors?.fieldErrors?.imageUrl && (
          <p className="text-red-600 text-center">
            {errors.formErrors.fieldErrors.imageUrl[0]}
          </p>
        )}
      </div>

      <div className="flex justify-center">
        <Button
          type="submit"
          className="w-36 bg-orange-600 text-white hover:bg-orange-400"
          disabled={uploading}
        >
          {uploading ? 'Subiendo...' : 'ACEPTAR'}
        </Button>
      </div>
    </form>
  );
}
