import { useState } from "react";
import { get, ref, remove, set } from "firebase/database";
import { database } from "@/app/firebaseConfig";
import {toast} from 'sonner'

export const useDeleteItem = () => {
    const [loading, setLoading] = useState(false);

    const deleteItem = async (itemId: string, itemType: string, onDelete: () => void) => {
        const itemRef = ref(database, `${itemType}/${itemId}`);
        const deletedItemsRef = ref(database, `deleted_${itemType}/${itemId}`);

        setLoading(true);
        try {
            const snapshot = await get(itemRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const timestamp = new Date().toISOString();
                const dataWithTimestamp = { ...data, deletedAt: timestamp };
                await set(deletedItemsRef, dataWithTimestamp);
                await remove(itemRef);
                onDelete();
                toast.success("Item borrado correctamente!");
            } else {
                toast.error("Item no encontrado.");
            }
        } catch (error) {
            toast.error("Error borrando item.");
        } finally {
            setLoading(false);
        }
    };

    return { deleteItem, loading };
};