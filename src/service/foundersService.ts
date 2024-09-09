import { database } from "@/app/firebaseConfig";
import { ref, push, set, update , get} from "@firebase/database";

const FOUNDERS_PATH = "founders";

const foundersService = {
  add: async (founder: {
    name: string;
    imageUrl: string;
    link: string;
    iconSize: string;
  }) => {
    const founderRef = ref(database, FOUNDERS_PATH);
    const newFounderRef = push(founderRef);
    await set(newFounderRef, founder);
    return newFounderRef;
  },
  
  update: async (id: string, updatedFounder: {
      name: string;
      imageUrl: string;
      link: string;
      iconSize: string;
    }) => {
        const founderRef = ref(database, `${FOUNDERS_PATH}/${id}`);
        await update(founderRef, updatedFounder);
    },
};


  export const getItemById = async (tableName: string, itemId: string) => {
    const itemRef = ref(database, `${tableName}/${itemId}`);
    const snapshot = await get(itemRef);
    return snapshot.exists() ? snapshot.val() : null;

};
export const updateItem = async (tableName: string, itemId: string, itemData: any) => {
    const itemRef = ref(database, `${tableName}/${itemId}`);
    return await set(itemRef, itemData);
};

export const createItem = async (tableName: string, itemData: any) => {
    const newItemRef = push(ref(database, tableName));
    return await set(newItemRef, itemData);
};

export default foundersService;
