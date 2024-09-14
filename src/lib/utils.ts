import { database } from "@/shared/firebaseConfig";
import { type ClassValue, clsx } from "clsx"
import { DataSnapshot, get, limitToFirst, onValue, orderByChild, orderByKey, query, ref, startAt } from "firebase/database";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const buildQuery = (dataReference: any, searchTerm: string, currentPage: number, startKey: string, itemsPerPage: number) => {
  if (searchTerm) {
    return query(dataReference, orderByChild('name'));
  } else if (currentPage === 1) {
    return query(dataReference, limitToFirst(itemsPerPage));
  } else {
    return query(dataReference, orderByKey(), startAt(startKey), limitToFirst(itemsPerPage));
  }
};

const processSnapshot = (snapshot: DataSnapshot, searchTerm: string, itemsPerPage: number, searchField: string) => {
  const data = snapshot.val();
  let resultData = data
    ? Object.entries(data).map(([id, item]) => ({ id, ...(item as Record<string, any>) }))
    : [];

  if (searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    resultData = resultData.filter((item: any) =>
      item[searchField]?.toLowerCase().includes(lowerSearchTerm)
    ).slice(0, itemsPerPage);
  }
  return resultData;
}

export const fetchData = async (nodeName: string, searchTerm: string, currentPage: number, itemsPerPage: number, searchField: string, allKeys: string[], setData: React.Dispatch<React.SetStateAction<any[]>>, setLastKeys: React.Dispatch<React.SetStateAction<string[]>>) => {
  const startKey = allKeys[(currentPage - 1) * itemsPerPage];
  const dataReference = ref(database, nodeName);
  const queryData = buildQuery(dataReference, searchTerm, currentPage, startKey, itemsPerPage);

  onValue(queryData, (snapshot) => {
    try {
      const resultData = processSnapshot(snapshot, searchTerm, itemsPerPage, searchField);

      if (resultData.length > 0) {
        setLastKeys(prevKeys => {
          const newKeys = [...prevKeys];
          if (!newKeys[currentPage - 1]) {
            newKeys[currentPage - 1] = resultData[resultData.length - 1].id;
          }
          return newKeys;
        });
      }

      setData(resultData);
    } catch (error) {
      console.error("Error processing snapshot:", error);
    }
  });
}

export const fetchAllKeys = async (nodeName: string, setAllKeys: React.Dispatch<React.SetStateAction<string[]>>, setTotalItems: React.Dispatch<React.SetStateAction<number>>) => {
  const dataReference = ref(database, nodeName);
  const queryKeys = query(dataReference, orderByKey());
  onValue(queryKeys, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const keys = Object.keys(data);
      setAllKeys(keys);
      setTotalItems(keys.length);
    }
  });
}

export const estimateTotalItems = async (nodeName: string, setTotalItems: React.Dispatch<React.SetStateAction<number>>) => {
  const dataRef = ref(database, nodeName);
  const queryData = query(dataRef, orderByKey(), limitToFirst(1));

  const snapshot = await get(queryData);
  const data = snapshot.val();

  if (data) {
    const keys = Object.keys(data);
    return keys.length;
  } else {
    return 0;
  }
}

export const handleResize = (setItemsPerPage: React.Dispatch<React.SetStateAction<number>>) => {
  const tableHeight = window.innerHeight - 200;
  const itemHeight = 80;
  const newItemsPerPage = Math.floor(tableHeight / itemHeight);
  setItemsPerPage(newItemsPerPage);
}