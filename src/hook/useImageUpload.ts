import { useState, ChangeEvent } from "react";
import { storage } from "@/app/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const useImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) return imagePreviewUrl;

    setIsUploading(true);
    const storageRef = ref(storage, `founders/${selectedFile.name}-${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    try {
      const snapshot = await new Promise<any>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => resolve(uploadTask.snapshot)
        );
      });

      const url = await getDownloadURL(snapshot.ref);
      setIsUploading(false);
      return url;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setIsUploading(false);
      return "";
    }
  };

  return { imagePreviewUrl, handleFileChange, uploadImage, isUploading, setImagePreviewUrl };
};
