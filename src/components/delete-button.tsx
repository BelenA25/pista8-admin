import { Button } from "./ui/button";
import { Cross2Icon } from '@radix-ui/react-icons';
import { useState } from "react";
import { useDeleteItem } from "@/hook/useDeleteItem";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

interface DeleteButtonProps {
    itemId: string;
    itemType: string;   
    onDelete: () => void;
}

export default function DeleteButton({itemId, itemType, onDelete}: DeleteButtonProps) {
    const [open, setOpen] = useState(false);
   const {deleteItem} = useDeleteItem();

   const handleDelete = async ()=>{
    await deleteItem(itemType, itemId, onDelete);
    setOpen(false);
   }
   
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
            <Button className="w-10 h-10 p-2 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-[#FE420A]">
                <Cross2Icon className="w-11 h-11" />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Eliminación</AlertDialogTitle>
                <AlertDialogDescription>
                    ¿Está seguro de que desea eliminar este elemento? Esta acción no se puede deshacer.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex justify-end space-x-2">
                <AlertDialogCancel asChild>
                    <button>Cancelar</button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                    <button onClick={handleDelete}>Eliminar</button>
                </AlertDialogAction>
            </div>
        </AlertDialogContent>
    </AlertDialog>
    )
}