'use client'

import PaginationSection from "@/components/PaginationSection";
import SearchCard from "@/components/SearchCard";
import TableSection from "@/components/TableSection";
import Title from "@/components/Title";
import { estimateTotalItems, fetchAllKeys, fetchData, handleResize } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

export default function NewsPage() {
  const TYPE = "news";
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [lastKeys, setLastKeys] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allKeys, setAllKeys] = useState<string[]>([]);

  // Manejar el redimensionamiento de la ventana
  useEffect(() => {
    const onResize = () => {
      handleResize(setItemsPerPage);
      console.log("Elementos por página después de redimensionar:", itemsPerPage); // Verificar ítems por página
    };
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, [itemsPerPage]);

  // Callback para traer los datos
  const fetchDataCallback = useCallback(() => {
    fetchData(
      TYPE,
      searchTerm,
      currentPage,
      itemsPerPage,
      allKeys,
      (fetchedData) => {
        setData(fetchedData);
        console.log("Total de datos antes de paginar:", fetchedData.length);
        console.log("Datos recibidos:", fetchedData); // Verificar datos recibidos
      },
      setLastKeys
    );
  }, [searchTerm, currentPage, itemsPerPage, allKeys]);

  // Cargar todas las claves de los datos
  useEffect(() => {
    fetchAllKeys(TYPE, setAllKeys, setTotalItems);
    console.log("Claves obtenidas (allKeys):", allKeys); // Verificar claves obtenidas
  }, []);

  // Efecto que estima el total de ítems y trae los datos
  useEffect(() => {
    estimateTotalItems(TYPE, setTotalItems);
    fetchDataCallback();
    console.log("Total de ítems:", totalItems); // Verificar el total de ítems
    console.log("Total de páginas:", Math.ceil(totalItems / itemsPerPage)); // Verificar total de páginas
  }, [currentPage, itemsPerPage, searchTerm, fetchDataCallback]);

  // Manejar el cambio de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Manejar la eliminación de ítems y refrescar los datos
  const handleDelete = () => {
    fetchDataCallback();
  };

  return (
    <>
      <Title title="Noticias" href="news/create" />
      <SearchCard text="Buscar Noticias" />
      <TableSection news={data} handleDelete={handleDelete} itemType="news" />
      <PaginationSection 
        currentPage={currentPage} 
        totalPages={Math.ceil(totalItems / itemsPerPage)} 
        onPageChange={handlePageChange} 
      />
    </>
  );
}
