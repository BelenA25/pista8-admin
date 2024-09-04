import { useState } from "react";
import { Button } from "./ui/button";
import { TrashIcon } from '@radix-ui/react-icons';
import { get, ref, remove, set, update } from "firebase/database";
import { database } from "@/app/firebaseConfig";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

interface DeleteButtonProps {
    startupId: string;
    onDelete: () => void; 
}

export default function DeleteButton({ startupId, onDelete }: DeleteButtonProps) {
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        const startupRef = ref(database, `startups/${startupId}`);
        const deletedStartupsRef = ref(database, `deleted_startups/${startupId}`);

        try {
            const snapshot = await get(startupRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const timestamp = new Date().toISOString();
                const dataWithTimestamp = { ...data, deletedAt: timestamp };
                await set(deletedStartupsRef, dataWithTimestamp);
                await remove(startupRef);
                onDelete(); 
            }
        } catch (error) {
            console.error("Error deleting startup:", error);
        } finally {
            setOpen(false);
        }
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