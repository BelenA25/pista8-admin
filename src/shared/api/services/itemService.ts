import { database } from "@/shared/firebaseConfig";
import { ref as dbRef, get, set, push, remove } from "firebase/database";

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