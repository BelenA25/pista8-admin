import { database } from "@/app/firebaseConfig";
import { type ClassValue, clsx } from "clsx";
import {
  DataSnapshot,
  limitToFirst,
  onValue,
  orderByChild,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";


export function combineClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buildQuery = (
  dataReference: any,
  searchTerm: string,
  currentPage: number,
  startKey: string,
  itemsPerPage: number
) => {
  if (searchTerm) {
    return query(dataReference, orderByChild("name"));
  } else if (currentPage === 1) {
    return query(dataReference, limitToFirst(itemsPerPage));
  } else {
    return query(
      dataReference,
      orderByKey(),
      startAt(startKey),
      limitToFirst(itemsPerPage)
    );
  }
};

const processSnapshot = (
  snapshot: DataSnapshot,
  searchTerm: string,
  itemsPerPage: number
) => {
  const data = snapshot.val();
  let resultData = data
    ? Object.entries(data).map(([id, item]) => ({
        id,
        ...(item as Record<string, any>),
      }))
    : [];

  if (searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    resultData = resultData
      .filter((item: any) => item.name.toLowerCase().includes(lowerSearchTerm))
      .slice(0, itemsPerPage);
  }
  return resultData;
};

export const fetchData = async (
  nodeName: string,
  searchTerm: string,
  currentPage: number,
  itemsPerPage: number,
  allKeys: string[],
  setData: Dispatch<SetStateAction<any[]>>,
  setLastKeys: Dispatch<SetStateAction<string[]>>
) => {
  const startKey = allKeys[(currentPage - 1) * itemsPerPage];
  const dataReference = ref(database, nodeName);
  const queryData = buildQuery(
    dataReference,
    searchTerm,
    currentPage,
    startKey,
    itemsPerPage
  );

  onValue(queryData, (snapshot) => {
    try {
      const resultData = processSnapshot(snapshot, searchTerm, itemsPerPage);

      if (resultData.length > 0) {
        setLastKeys((prevKeys) => {
          const newKeys = [...prevKeys];
          if (!newKeys[currentPage - 1]) {
            newKeys[currentPage - 1] = resultData[resultData.length - 1].id;
          }
          return newKeys;
        });
      }

      setData(resultData);
    } catch (error) {
    }
  });
};

export const fetchAllKeys = async (
  nodeName: string,
  setAllKeys: Dispatch<SetStateAction<string[]>>,
  setTotalItems: Dispatch<SetStateAction<number>>
) => {
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
};
export const fetchDataNews = async (
  nodeName: string,
  searchTerm: string,
  currentPage: number,
  allKeys: string[],
  setData: Dispatch<SetStateAction<any[]>>,
  setLastKeys: Dispatch<SetStateAction<string[]>>
) => {
  const itemsPerPage = 4;
  const startKey = allKeys[(currentPage - 1) * itemsPerPage];
  const dataReference = ref(database, nodeName);
  const queryData = buildQuery(
    dataReference,
    searchTerm,
    currentPage,
    startKey,
    itemsPerPage
  );

  onValue(queryData, (snapshot) => {
    try {
      const resultData = processSnapshot(snapshot, searchTerm, itemsPerPage);

      if (resultData.length > 0) {
        setLastKeys((prevKeys) => {
          const newKeys = [...prevKeys];
          if (!newKeys[currentPage - 1]) {
            newKeys[currentPage - 1] = resultData[resultData.length - 1].id;
          }
          return newKeys;
        });
      }

      setData(resultData);
    } catch (error) {
    }
  });
};

export const fetchAllKeysNews = async (
  nodeName: string,
  setAllKeys: Dispatch<SetStateAction<string[]>>,
  setTotalItems: Dispatch<SetStateAction<number>>
) => {
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
};

export const estimateTotalItems = async (
  nodeName: string,
  setTotalItems: Dispatch<SetStateAction<number>>
) => {
  const dataReference = ref(database, nodeName);
  const queryData = query(dataReference, orderByKey(), limitToFirst(100));
  onValue(queryData, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const keys = Object.keys(data);
      setTotalItems(keys.length);
    }
  });
};

export const handleResize = (
  setItemsPerPage: Dispatch<SetStateAction<number>>
) => {
  const tableHeight = window.innerHeight - 200;
  const itemHeight = 80;
  const newItemsPerPage = Math.floor(tableHeight / itemHeight);
  setItemsPerPage(newItemsPerPage);
};