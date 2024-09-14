import { database } from "@/shared/firebaseConfig";
import { ref, push, set, get } from "@firebase/database";

export const getItemById = async (tableName: string, itemId: string) => {
  const itemRef = ref(database, `${tableName}/${itemId}`);
  const snapshot = await get(itemRef);
  return snapshot.exists() ? snapshot.val() : null;
};

export const createItem = async (tableName: string, itemData: any) => {
  const newItemRef = push(ref(database, tableName));
  return await set(newItemRef, itemData);
};