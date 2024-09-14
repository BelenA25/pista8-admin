"use client";

import PaginationSection from "@/components/PaginationSection";
import SearchCard from "@/components/SearchCard";
import SectionNews from "@/components/SectionNews";
import TitleSection from "@/components/TitleSection";
import {
  estimateTotalItems,
  fetchAllKeysNews,
  fetchDataNews,
} from "@/lib/utilsNews";
import { useCallback, useEffect, useState } from "react";

const TYPE = "news";

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [itemsPerPage] = useState(6);
  const [totalItems, setTotalItems] = useState(0);
  const [lastKeys, setLastKeys] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allKeys, setAllKeys] = useState<string[]>([]);

  const fetchDataCallback = useCallback(() => {

    fetchDataNews(
      TYPE, 
      searchTerm, 
      currentPage, 
      allKeys, 
      setData, 
      setLastKeys
    );
  }, [searchTerm, currentPage, itemsPerPage, allKeys]);


  useEffect(() => {
    fetchAllKeysNews(TYPE, setAllKeys, setTotalItems);
  }, []);

  useEffect(() => {
    estimateTotalItems(TYPE, setTotalItems);
    fetchDataCallback();
  }, [currentPage, searchTerm, fetchDataCallback]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = () => {
    fetchDataCallback();
  };

  return (
    <>
      <TitleSection text="Noticias" typeName={TYPE} />

      <SearchCard onSearchClick={setSearchTerm} entityName="Noticias" />
      <SectionNews
        news={data}
        searchTerm={searchTerm}
        handleDelete={handleDelete}
        itemType="news"
      />
      <PaginationSection
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / 4)}
        onPageChange={handlePageChange}
      />
    </>
  );
}