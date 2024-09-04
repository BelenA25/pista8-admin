import { useState } from "react";
import { Button } from "./ui/button";
import { TrashIcon } from '@radix-ui/react-icons';
import { ref, update } from "firebase/database";
import { database } from "@/app/firebaseConfig";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

interface DeleteButtonProps {
    startupId: string;
}

export default function DeleteButton({ startupId }: DeleteButtonProps) {
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        const startupRef = ref(database, `startups/${startupId}`);
        await update(startupRef, { deleted: true });
        setOpen(false);
    };
    
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button className="w-10 h-10 p-2 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-[#FE420A]">
                    <TrashIcon className="w-11 h-11" />
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
    );
}