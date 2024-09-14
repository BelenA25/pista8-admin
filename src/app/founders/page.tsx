"use client";

import PaginationSection from "@/components/PaginationSection";
import SearchCard from "@/components/SearchCard";
import TableSection from "@/components/TableSection";
import { useCallback, useEffect, useState } from "react";
import {
  estimateTotalItems,
  fetchAllKeys,
  fetchData,
  handleResize,
} from "@/lib/utils";
import TitleSection from "@/components/TitleSection";
import WebButton from "@/components/WebButton";
import EditButton from "@/components/EditButton";

const TYPE = "founders";

export default function Founders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [lastKeys, setLastKeys] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allKeys, setAllKeys] = useState<string[]>([]);

  useEffect(() => {
    const onResize = () => handleResize(setItemsPerPage);
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const fetchDataCallback = useCallback(() => {
    fetchData(
      TYPE,
      searchTerm,
      currentPage,
      itemsPerPage,
      "name",
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
  const mapFoundersToRowDataProps = (item: any) => ({
    itemId: item.id,
    itemName: item.name,
    imageUrl: item.imageUrl,
    genericButton: item.link ? (
        <WebButton link={item.link} />
    ) : undefined,   
    detailButton: <EditButton itemId={item.id} itemType={TYPE} />
});

  return (
    <>
      <TitleSection text="Lista De Fundadores" typeName={TYPE} />
      <SearchCard
        onSearchClick={handleSearchClick}
        entityName="fundador"   
      ></SearchCard>
      <TableSection
        data={data}
        searchTerm={searchTerm}
        handleDelete={handleDelete}
        itemType={"founders"}
        mapItemToRowDataProps={mapFoundersToRowDataProps}
      ></TableSection>

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