import { database, storage } from '@/shared/firebaseConfig';
import { ref as dbRef, get, set, push, remove, query, orderByChild, equalTo } from "firebase/database";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "sonner";

export const getItemById = async (tableName: string, itemId: string) => {
    const itemRef = dbRef(database, `${tableName}/${itemId}`);
    const snapshot = await get(itemRef);
    return snapshot.exists() ? snapshot.val() : null;
};

export const updateItem = async (tableName: string, itemId: string, itemData: any) => {
    const itemRef = dbRef(database, `${tableName}/${itemId}`);
    return await set(itemRef, itemData);
}; 

export const createItem = async (tableName: string, itemData: any) => {
    const newItemRef = push(dbRef(database, tableName));
    return await set(newItemRef, itemData);
};

export const deleteItem = async (tableName: string, itemId: string) => {
    const itemRef = dbRef(database, `${tableName}/${itemId}`);
    const deletedItemsRef = dbRef(database, `deleted_${tableName}/${itemId}`);

    const snapshot = await get(itemRef);
    if (snapshot.exists()) {
        const data = snapshot.val();
        const timestamp = new Date().toISOString();
        const dataWithTimestamp = { ...data, deletedAt: timestamp };
        await set(deletedItemsRef, dataWithTimestamp);
        await remove(itemRef);
    }
};

export const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            () => {},
            (error) => {
                toast.error("Error al subir la imagen");
                reject(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadURL);
            }
        );
    });
};

export async function checkEmailExists(email: string): Promise<boolean> {
    try {
        const subscriptionsRef = dbRef(database, "subscriptions");
        const emailQuery = query(subscriptionsRef, orderByChild("email"), equalTo(email));
        const snapshot = await get(emailQuery);

        return snapshot.exists();
    } catch (error) {
        toast.error("Error checking email existence.");
        throw error;
    }
}