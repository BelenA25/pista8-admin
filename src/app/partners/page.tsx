
'use client'

import AuthHandler from "@/components/AuthHandler";
import EditButton from "@/components/EditButton";
import PaginationSection from "@/components/PaginationSection";
import SearchCard from "@/components/SearchCard"; 
import TableSection from "@/components/TableSection";
import TitleSection from "@/components/TitleSection";
import WebButton from "@/components/WebButton";
import useAuth from "@/hooks/useAuth";
import {
  estimateTotalItems,
  fetchAllKeys,
  fetchData,
  handleResize,
} from "@/lib/utils";

import { useCallback, useEffect, useState } from "react";

const TYPE = "partners";

export default function Partners() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [lastKeys, setLastKeys] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allKeys, setAllKeys] = useState<string[]>([]);
  const { user, loading} = useAuth();

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

  const handleDelete = () => {
    fetchDataCallback();
  };
  const mapPartnersToRowDataProps = (item: any) => ({
    itemId: item.id,
    itemName: item.name,
    imageUrl: item.imageUrl,
    genericButton: item.link ? (
        <WebButton link={item.link} />
    ) : undefined,   
    detailButton: <EditButton itemId={item.id} itemType={TYPE} />
});
  return (
    <AuthHandler user={user} loading={loading}>
      <TitleSection text="Lista de Partners" typeName={TYPE} />
      <SearchCard onSearchClick={setSearchTerm} entityName="Partner" />
      <TableSection
        data={data}
        searchTerm={searchTerm}
        handleDelete={handleDelete}
        itemType="partners"
        mapItemToRowDataProps={mapPartnersToRowDataProps}
      />
      {!searchTerm && (
        <PaginationSection
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          onPageChange={handlePageChange}
        ></PaginationSection>
      )}
    </AuthHandler>
  );
}