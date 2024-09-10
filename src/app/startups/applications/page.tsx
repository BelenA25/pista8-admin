"use client";

import { use, useCallback, useEffect, useState } from "react";
import PaginationSection from "@/components/pagination-section";
import SearchCard from "@/components/search-card";
import TableSection from "@/components/table-section";
import Title from "@/components/title";
import {
  estimateTotalItems,
  fetchAllKeys,
  fetchData,
  handleResize,
} from "@/lib/utils";

const TYPE = "applications";

export default function Applications() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalItems, setTotalItems] = useState(0);
  const [lastKeys, setLastKeys] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allKeys, setAllKeys] = useState<string[]>([]);

  useEffect(() => {
    const onResize = () => handleResize(setItemsPerPage);

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const fetchDataCallback = useCallback(() => {
    fetchData(
      TYPE,
      searchTerm,
      currentPage,
      itemsPerPage,
      allKeys,
      setData,
      setLastKeys
    );
  }, [searchTerm, currentPage, itemsPerPage, allKeys]);

  useEffect(() => {
    fetchAllKeys(TYPE, setAllKeys, setTotalItems);
  }, []);

  useEffect(() => {
    estimateTotalItems(TYPE, setTotalItems);
    fetchDataCallback();
  }, [currentPage, itemsPerPage, searchTerm, fetchDataCallback]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchClick = (term: string) => {
    setSearchTerm(term);
  };

  const handleDelete = () => {
    fetchDataCallback();
  };

  return (
    <>
      <Title
        title="Lista De Postulaciones Startups"
        href="applications/create"

      />
      <SearchCard onSearchClick={handleSearchClick} text="Buscar Startup"></SearchCard>

      <TableSection
        appl={data}
        onDelete={handleDelete}
        itemType={"applications"}
        searchTerm={searchTerm}
      />
      {!searchTerm && (
        <PaginationSection
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          onPageChange={handlePageChange}
        ></PaginationSection>
      )}
      
    </>
  );
}
