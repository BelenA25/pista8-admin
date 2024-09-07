import { database } from "@/app/firebaseConfig";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { get, ref, set, remove } from "@firebase/database";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteButtonProps {
  id: string;
  itemType: string;
  onClick: () => void;
}

export default function DeleteButton({
  id,
  itemType,
  onClick,
}: DeleteButtonProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const itemRef = ref(database, `${itemType}/${id}`);
    const deletedItemsRef = ref(database, `deleted_${itemType}/${id}`);

    try {
      const snapshot = await get(itemRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const timestamp = new Date().toISOString();
        const dataWithTimestamp = { ...data, deletedAt: timestamp };
        await set(deletedItemsRef, dataWithTimestamp);
        await remove(itemRef);
        onClick();
        toast.success("borrado correctamente!");
      }
    } catch (error) {
      toast.error("Error borrando el item");
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button className="w-10 h-10 p-2 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-[#FE420A]">
            <TrashIcon className="w-11 h-11" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 shadow-lg max-w-md w-full">
          <AlertDialogTitle>Confirmar Eliminación</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas eliminar esta startup?
          </AlertDialogDescription>

          <div className="mt-4 flex justify-end space-x-2">
            <AlertDialogCancel asChild>
              <Button className="bg-gray-500 text-white hover:bg-gray-600 hover:text-white">
                Cancelar
              </Button>
            </AlertDialogCancel>

            <AlertDialogAction asChild>
              <Button
                className="bg-red-600 text-white hover:bg-[#FE420A]"
                onClick={handleDelete}
              >
                Eliminar
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
